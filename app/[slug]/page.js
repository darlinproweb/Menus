import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { construirEstructuraMenu } from "@/lib/construirEstructuraMenu";
import { formatoPrecioDOP } from "@/lib/formato";
import { MedinaGrillTemplate } from "@/components/templates/medina-grill";

// Cliente de solo-lectura para renderizar en el servidor.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function getDatosNegocio(slug) {
  const { data: negocio } = await supabase
    .from("negocios")
    .select("*")
    .eq("slug", slug)
    .eq("activo", true)
    .maybeSingle();

  if (!negocio) return null;

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

  return {
    negocio,
    productos: productos || [],
    categorias: categorias || []
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

  // ------- Plantilla por defecto: ticket-clasico -------
  return <TicketClasico negocio={negocio} productos={productos} slug={slug} />;
}

function agruparPorCategoria(productos) {
  const grupos = {};
  for (const p of productos) {
    const cat = p.categoria || "General";
    if (!grupos[cat]) grupos[cat] = [];
    grupos[cat].push(p);
  }
  return grupos;
}

function TicketClasico({ negocio, productos, slug }) {
  const grupos = agruparPorCategoria(productos);
  const waLink = negocio.whatsapp_numero ? `https://wa.me/${negocio.whatsapp_numero}` : null;

  return (
    <main className="min-h-screen px-5 py-10 max-w-lg mx-auto">
      <header className="text-center mb-10">
        {negocio.logo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={negocio.logo_url}
            alt={negocio.nombre}
            className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
          />
        )}
        <h1
          className="font-display text-3xl"
          style={{ color: negocio.color_acento || "#6B2737" }}
        >
          {negocio.nombre}
        </h1>
      </header>

      {Object.keys(grupos).length === 0 && (
        <p className="text-center text-ink2">
          Este negocio todavía no ha agregado productos a su menú.
        </p>
      )}

      {Object.entries(grupos).map(([categoria, items]) => (
        <section key={categoria} className="mb-9">
          <h2
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: negocio.color_acento || "#6B2737" }}
          >
            {categoria}
          </h2>

          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className={item.disponible ? "" : "opacity-40"}>
                <div className="menu-row">
                  <span className="font-display text-lg">{item.nombre}</span>
                  <span className="leader" aria-hidden="true" />
                  <span className="font-mono tabular text-sm">
                    {item.precio_texto || formatoPrecioDOP(item.precio)}
                  </span>
                </div>
                {item.descripcion && (
                  <p className="text-sm text-ink2 mt-0.5">{item.descripcion}</p>
                )}
                {!item.disponible && (
                  <p className="text-xs font-mono uppercase tracking-wide mt-0.5">Agotado</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}

      {waLink && (
        <div className="text-center mt-10">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-sm border border-ink px-5 py-2.5 rounded-full hover:bg-ink hover:text-paper transition-colors"
          >
            Hacer pedido por WhatsApp
          </a>
        </div>
      )}

      <footer className="text-center mt-14 text-xs text-ink2 font-mono">
        <a href={`/${slug}/admin`} className="underline">
          Panel Admin
        </a>
        {" · "}Menú digital por NexoLink
      </footer>
    </main>
  );
}
