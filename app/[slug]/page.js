import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { construirEstructuraMenu } from "@/lib/construirEstructuraMenu";
import { MedinaGrillTemplate } from "@/components/templates/medina-grill";
import { BistroChicTemplate } from "@/components/templates/bistro-chic";
import { TicketClasicoTemplate } from "@/components/templates/ticket-clasico";
import { esSlugDemo, getDemoMenuData } from "@/lib/demoPalaisMenu";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Cliente de solo-lectura para renderizar en el servidor.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function getDatosNegocio(slug) {
  let negocio = null;

  try {
    const { data } = await supabase
      .from("negocios")
      .select("*")
      .eq("slug", slug)
      .eq("activo", true)
      .maybeSingle();

    negocio = data;
  } catch (error) {
    console.error("Error al obtener datos del negocio:", error);
  }

  // Si no se encontró el negocio en base de datos y es demo, usamos el demo en memoria
  if (!negocio && esSlugDemo(slug)) {
    return getDemoMenuData(slug, null);
  }

  if (!negocio) return null;

  // Consultar siempre los productos y categorías reales actualizados en Supabase
  const [{ data: productos }, { data: categorias }] = await Promise.all([
    supabase
      .from("productos")
      .select("*")
      .eq("negocio_id", negocio.id)
      .order("categoria", { ascending: true })
      .order("orden", { ascending: true }),
    supabase
      .from("categorias")
      .select("*")
      .eq("negocio_id", negocio.id)
      .order("orden", { ascending: true })
  ]);

  // Si es un demo pero la base de datos aún no tiene ningún producto cargado, usamos el demo por defecto
  if (esSlugDemo(slug) && (!productos || productos.length === 0)) {
    return getDemoMenuData(slug, negocio);
  }

  return {
    negocio,
    productos: productos || [],
    categorias: categorias || []
  };
}

// ---------------------------------------------------------------
// Open Graph dinámico por negocio
// ---------------------------------------------------------------
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getDatosNegocio(slug);

  if (!data) {
    return {
      title: "Menú no encontrado",
      description: "Este negocio no está disponible."
    };
  }

  const { negocio } = data;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nexomenus.netlify.app";
  const menuUrl = `${appUrl}/${slug}`;

  // Descripción enriquecida: usa el campo descripcion si existe, si no genera una genérica
  const description = negocio.descripcion
    ? negocio.descripcion
    : `Explora el menú digital de ${negocio.nombre}. Escanea el QR o abre este enlace para ver precios, platos y hacer tu pedido por WhatsApp.`;

  // Imagen OG: usa imagen_hero_url si es una URL absoluta, si no usa un og:image genérico
  const ogImage =
    negocio.imagen_hero_url && negocio.imagen_hero_url.startsWith("http")
      ? negocio.imagen_hero_url
      : `${appUrl}/og-default.png`;

  return {
    title: negocio.nombre,
    description,
    openGraph: {
      title: `${negocio.nombre} — Menú Digital`,
      description,
      url: menuUrl,
      siteName: "NexoLink Menus",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Menú de ${negocio.nombre}`
        }
      ],
      locale: "es_DO",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${negocio.nombre} — Menú Digital`,
      description,
      images: [ogImage]
    },
    // Canonical URL para evitar duplicados SEO
    alternates: {
      canonical: menuUrl
    }
  };
}

export default async function MenuPage({ params }) {
  const { slug } = await params;
  const data = await getDatosNegocio(slug);
  if (!data) notFound();

  const { negocio, productos, categorias } = data;

  // ------- Plantilla: medina-grill -------
  if (negocio.plantilla === "medina-grill") {
    const categoriasEstructuradas = construirEstructuraMenu(categorias, productos);
    return (
      <MedinaGrillTemplate
        negocio={negocio}
        slug={slug}
        categoriasEstructuradas={categoriasEstructuradas}
      />
    );
  }

  // ------- Plantilla: bistro-chic -------
  if (negocio.plantilla === "bistro-chic") {
    const categoriasEstructuradas = construirEstructuraMenu(categorias, productos);
    return (
      <BistroChicTemplate
        negocio={negocio}
        slug={slug}
        categoriasEstructuradas={categoriasEstructuradas}
      />
    );
  }

  // ------- Plantilla por defecto: ticket-clasico -------
  return <TicketClasicoTemplate negocio={negocio} productos={productos} slug={slug} />;
}
