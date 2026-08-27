"use client";

import { useState } from "react";
import { MenuSection } from "./MenuSection";
import { getUIText } from "@/lib/i18n";

export function MenuSearchableList({ categorias, idioma = "es" }) {
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
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="my-6 relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-primary pointer-events-none">🔍</div>
          <input
            type="text"
            placeholder={getUIText("search_placeholder_medina", idioma)}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-2xl border border-primary/30 bg-card/80 py-3.5 pl-12 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-md shadow-lg shadow-black/20 transition-all"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda("")}
              className="absolute right-4 text-xs font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              aria-label={getUIText("clear_search", idioma)}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filtradas.length > 0 ? (
        filtradas.map((categoria) => (
          <MenuSection key={categoria.id} categoria={categoria} idioma={idioma} />
        ))
      ) : (
        <div className="my-16 text-center rounded-2xl border border-primary/20 bg-card/40 p-12 backdrop-blur-sm">
          <h3 className="font-serif text-xl font-bold text-foreground">
            {getUIText("no_dishes_found_title_short", idioma, { query: busqueda })}
          </h3>
          <button
            onClick={() => setBusqueda("")}
            className="mt-6 rounded-full border border-primary/40 bg-primary/10 px-6 py-2 text-xs uppercase tracking-wider font-semibold text-primary hover:bg-primary/20 transition-colors cursor-pointer"
          >
            {getUIText("view_all_menu", idioma)}
          </button>
        </div>
      )}
    </div>
  );
}
