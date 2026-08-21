export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-ink mb-3">NexoLink Menus</h1>
        <p className="text-ink2">
          Esta es la plataforma multi-tenant de catálogos digitales.
          Cada negocio vive en su propia ruta:
        </p>
        <code className="block mt-4 bg-white/60 border border-line rounded px-3 py-2 text-sm">
          tudominio.com/nombre-del-negocio
        </code>
        <p className="text-ink2 mt-4 text-sm">
          Prueba con <a className="underline" href="/restaurante-demo">/restaurante-demo</a> (datos de ejemplo del schema.sql).
        </p>
      </div>
    </main>
  );
}
