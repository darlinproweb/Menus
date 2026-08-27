"use client";

import { useState } from "react";
import { BistroSection } from "./BistroSection";
import { getUIText } from "@/lib/i18n";

export function BistroSearchableList({ categorias, ordenItems, onAgregarItem, onRemoverItem, idioma = "es" }) {
  const [busqueda, setBusqueda] = useState("");

  const query = busqueda.trim().toLowerCase();

  const filtradas = query === ""
    ? categorias
    : categorias
        .map((categoria) => {
          const gruposFiltrados = categoria.grupos
            .map((grupo) => {
              const items = grupo.items.filter(
                (item) =>
                  item.nombre.toLowerCase().includes(query) ||
                  (item.descripcion && item.descripcion.toLowerCase().includes(query)) ||
                  (item.nota && item.nota.toLowerCase().includes(query)) ||
                  grupo.titulo.toLowerCase().includes(query)
              );
              return { ...grupo, items };
            })
            .filter((grupo) => grupo.items.length > 0);

          return { ...categoria, grupos: gruposFiltrados };
        })
        .filter((categoria) => categoria.grupos.length > 0);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-6 pb-24">
      {/* Search Input Box */}
      <div className="mb-8 relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-[#8C7A6B] pointer-events-none text-sm">🔍</div>
          <input
            type="text"
            placeholder={getUIText("search_placeholder_bistro", idioma)}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-2xl border border-[#E5DEC6] bg-[#FFFFFF]/90 py-3.5 pl-11 pr-10 text-sm text-[#2D2A26] placeholder:text-[#9E8E81] focus:border-[#D4A373] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 shadow-sm transition-all"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda("")}
              className="absolute right-4 text-xs font-bold text-[#8C7A6B] hover:text-[#2D2A26] transition-colors cursor-pointer"
              aria-label={getUIText("clear_search", idioma)}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Sections or Empty State */}
      {filtradas.length > 0 ? (
        filtradas.map((categoria) => (
          <BistroSection
            key={categoria.id}
            categoria={categoria}
            ordenItems={ordenItems}
            onAgregarItem={onAgregarItem}
            onRemoverItem={onRemoverItem}
            idioma={idioma}
          />
        ))
      ) : (
        <div className="my-14 text-center rounded-2xl border border-[#E5DEC6] bg-[#FFFFFF]/80 p-12 shadow-sm">
          <h3 className="font-serif-bistro text-xl font-bold text-[#2D2A26]">
            {getUIText("no_dishes_found_title", idioma, { query: busqueda })}
          </h3>
          <p className="mt-2 text-xs text-[#8C7A6B]">
            {getUIText("try_another_term", idioma)}
          </p>
          <button
            onClick={() => setBusqueda("")}
            className="mt-6 rounded-full bg-[#2E3B32] px-6 py-2 text-xs uppercase tracking-wider font-semibold text-[#FDFBF7] hover:bg-[#3D4F43] transition-colors cursor-pointer"
          >
            {getUIText("view_full_menu", idioma)}
          </button>
        </div>
      )}
    </div>
  );
}
