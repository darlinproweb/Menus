import { BistroItemCard } from "./BistroItemCard";
import { traducirMenuTexto } from "@/lib/i18n";

export function BistroSection({ categoria, ordenItems, onAgregarItem, onRemoverItem, idioma = "es" }) {
  const nombreCategoria = traducirMenuTexto(categoria, idioma, "nombre");
  const subtituloCategoria = traducirMenuTexto(categoria, idioma, "subtitulo");

  return (
    <section id={`cat-${categoria.id}`} className="mb-14 scroll-mt-24">
      {/* Category Header */}
      <div className="mb-6 border-b border-[#E5DEC6] pb-3">
        <h2 className="font-serif-bistro text-2xl font-bold text-[#2E3B32] md:text-3xl">
          {nombreCategoria}
        </h2>
        {subtituloCategoria && (
          <p className="mt-1 text-xs uppercase tracking-wider text-[#8C7A6B]">
            {subtituloCategoria}
          </p>
        )}
      </div>

      {/* Category Groups */}
      <div className="space-y-8">
        {categoria.grupos.map((grupo, gIdx) => {
          const tituloGrupo = traducirMenuTexto(grupo.titulo, idioma);
          return (
            <div key={gIdx} className="space-y-4">
              {/* Show group title if different from main category name */}
              {grupo.titulo !== categoria.nombre && (
                <h3 className="font-serif-bistro text-lg font-semibold text-[#845D3B] border-l-2 border-[#D4A373] pl-3 py-0.5">
                  {tituloGrupo}
                </h3>
              )}

              {/* Grid of Item Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {grupo.items.map((item) => {
                  const cantidad = ordenItems[item.id]?.cantidad || 0;
                  return (
                    <BistroItemCard
                      key={item.id}
                      item={item}
                      cantidadEnOrden={cantidad}
                      onAgregar={onAgregarItem}
                      onRemover={onRemoverItem}
                      idioma={idioma}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
