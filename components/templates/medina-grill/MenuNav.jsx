"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LanguageSelector } from "@/components/LanguageSelector";
import { traducirMenuTexto } from "@/lib/i18n";

export function MenuNav({ negocio, categorias, idioma, onCambiarIdioma }) {
  const [activeId, setActiveId] = useState(categorias[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const categoria of categorias) {
        const element = document.getElementById(categoria.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(categoria.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categorias]);

  return (
    <nav
      aria-label="Categorías del menú"
      className="sticky top-0 z-30 border-b border-primary/20 bg-background/90 backdrop-blur-xl shadow-lg shadow-black/40"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5 gap-2">
        <a href="#" className="flex items-center gap-2.5 shrink-0 group">
          {negocio.logo_url ? (
            <div className="relative overflow-hidden rounded-lg border border-primary/30 bg-black/50 p-0.5 transition-transform group-hover:scale-105">
              <Image
                src={negocio.logo_url}
                alt={`${negocio.nombre} logo`}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-gradient-to-b from-[#1C0F10] to-black text-xs font-serif font-bold text-gold-gradient shadow-inner transition-transform group-hover:scale-105">
              {negocio.nombre?.charAt(0) || "🔥"}
            </div>
          )}
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-serif text-sm font-bold leading-none text-primary">
              {negocio.nombre}
            </span>
          </div>
        </a>

        <ul className="flex items-center gap-2 overflow-x-auto py-1 px-2 flex-1 no-scrollbar">
          {categorias.map((categoria) => {
            const isActive = activeId === categoria.id;
            return (
              <li key={categoria.id} className="shrink-0">
                <a
                  href={`#${categoria.id}`}
                  className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-amber-500/20 font-bold scale-105"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {traducirMenuTexto(categoria, idioma, "nombre")}
                </a>
              </li>
            );
          })}
        </ul>

        {onCambiarIdioma && (
          <div className="shrink-0 pl-1">
            <LanguageSelector
              idioma={idioma}
              onCambiarIdioma={onCambiarIdioma}
              variant="medina"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
