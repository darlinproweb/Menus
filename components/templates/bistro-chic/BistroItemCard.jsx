"use client";

import { formatoPrecioDOP } from "@/lib/formato";
import { getUIText, traducirMenuTexto } from "@/lib/i18n";

export function BistroItemCard({ item, cantidadEnOrden, onAgregar, onRemover, idioma = "es" }) {
  const disponible = item.disponible !== false;
  const precioFormatted = item.precio_texto || formatoPrecioDOP(item.precio);

  const nombreTraducido = traducirMenuTexto(item, idioma, "nombre");
  const descripcionTraducida = traducirMenuTexto(item, idioma, "descripcion");
  const notaTraducida = traducirMenuTexto(item, idioma, "nota");

  return (
    <div
      className={`bistro-card relative flex flex-col justify-between rounded-2xl p-5 transition-all duration-300 ${
        disponible ? "hover:-translate-y-1" : "opacity-55 grayscale-[30%]"
      }`}
    >
      <div>
        {/* Badges / Header Row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            {item.destacado && (
              <span className="mb-1.5 inline-flex items-center gap-1 rounded-md bg-[#F3E3D0] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#B88956]">
                ⭐ {idioma === "en" ? "Specialty" : "Especialidad"}
              </span>
            )}
            <h4 className="font-serif-bistro text-lg font-bold text-[#2D2A26] leading-snug">
              {nombreTraducido}
            </h4>
          </div>
          <span className="shrink-0 font-serif-bistro text-base font-bold text-[#2E3B32] bg-[#F4EFE6] px-3 py-1 rounded-xl border border-[#E2D9CB]">
            {precioFormatted}
          </span>
        </div>

        {/* Note tag if present */}
        {notaTraducida && (
          <p className="text-xs font-semibold text-[#8C7A6B] italic mb-1.5">
            {notaTraducida}
          </p>
        )}

        {/* Description */}
        {descripcionTraducida && (
          <p className="text-xs text-[#6C6356] leading-relaxed mb-4">
            {descripcionTraducida}
          </p>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-2 flex items-center justify-between border-t border-[#E8DEC9]/60 pt-3">
        {!disponible ? (
          <span className="text-xs font-bold uppercase tracking-wider text-[#9E8E81]">
            {getUIText("sold_out", idioma)}
          </span>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] text-[#8C7A6B]">
              {cantidadEnOrden > 0
                ? idioma === "en" ? `${cantidadEnOrden} in your order` : `${cantidadEnOrden} en tu orden`
                : idioma === "en" ? "Available" : "Disponible"}
            </span>

            {cantidadEnOrden > 0 ? (
              <div className="flex items-center gap-2 rounded-full border border-[#D4A373] bg-[#FAF6F0] p-0.5 shadow-xs">
                <button
                  onClick={() => onRemover(item.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAE2D3] text-xs font-bold text-[#2D2A26] hover:bg-[#D4A373] hover:text-white transition-colors cursor-pointer"
                  aria-label="Disminuir cantidad"
                >
                  -
                </button>
                <span className="min-w-[1.25rem] text-center text-xs font-bold text-[#2E3B32]">
                  {cantidadEnOrden}
                </span>
                <button
                  onClick={() => onAgregar(item)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E3B32] text-xs font-bold text-[#FDFBF7] hover:bg-[#3D4F43] transition-colors cursor-pointer"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAgregar(item)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#2E3B32] px-4 py-1.5 text-xs font-semibold text-[#FDFBF7] shadow-xs hover:bg-[#3D4F43] hover:shadow-md transition-all cursor-pointer active:scale-95"
              >
                <span>{idioma === "en" ? "+ Add" : "+ Agregar"}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
