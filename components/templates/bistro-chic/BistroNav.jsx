"use client";

import { useEffect, useState } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { traducirMenuTexto } from "@/lib/i18n";

export function BistroNav({ categorias, idioma, onCambiarIdioma }) {
  const [categoriaActiva, setCategoriaActiva] = useState(categorias[0]?.id || "");

  const scrollToCategory = (id) => {
    setCategoriaActiva(id);
    const element = document.getElementById(`cat-${id}`);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const cat of categorias) {
        const element = document.getElementById(`cat-${cat.id}`);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCategoriaActiva(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categorias]);

  return (
    <nav className="sticky top-0 z-30 border-b border-[#E5DEC6] bg-[#FAF6F0]/95 backdrop-blur-md transition-all py-2.5 shadow-xs">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 flex-1">
          {categorias.map((cat) => {
            const isActive = categoriaActiva === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive ? "bistro-pill-active scale-105" : "bistro-pill-inactive"
                }`}
              >
                {traducirMenuTexto(cat, idioma, "nombre")}
              </button>
            );
          })}
        </div>

        {onCambiarIdioma && (
          <div className="shrink-0 pl-1">
            <LanguageSelector
              idioma={idioma}
              onCambiarIdioma={onCambiarIdioma}
              variant="bistro"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
