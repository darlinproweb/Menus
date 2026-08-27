import { createClient } from "@supabase/supabase-js";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nexomenus.netlify.app";

  // Rutas estáticas principales
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Rutas dinámicas de menús activos en Supabase
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return staticRoutes;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: negocios, error } = await supabase
      .from("negocios")
      .select("slug, updated_at, created_at")
      .eq("activo", true);

    if (error || !negocios) {
      return staticRoutes;
    }

    const dynamicRoutes = negocios.map((negocio) => ({
      url: `${baseUrl}/${negocio.slug}`,
      lastModified: negocio.updated_at ? new Date(negocio.updated_at) : new Date(negocio.created_at || Date.now()),
      changeFrequency: "daily",
      priority: 0.8,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (e) {
    console.error("Error generando sitemap dinámico:", e);
    return staticRoutes;
  }
}
