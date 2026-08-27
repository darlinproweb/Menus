"use client";

import { useState } from "react";
import { MenuHero } from "./MenuHero";
import { MenuNav } from "./MenuNav";
import { MenuSearchableList } from "./MenuSearchableList";
import { MenuFooter } from "./MenuFooter";

export function MedinaGrillTemplate({ negocio, slug, categoriasEstructuradas }) {
  const [idioma, setIdioma] = useState("es");

  const categoriasParaNav = categoriasEstructuradas.map((c) => ({ id: c.id, nombre: c.nombre }));

  return (
    <div className="tema-medina min-h-screen">
      <MenuHero negocio={negocio} idioma={idioma} />
      <MenuNav
        negocio={negocio}
        categorias={categoriasParaNav}
        idioma={idioma}
        onCambiarIdioma={setIdioma}
      />
      <MenuSearchableList categorias={categoriasEstructuradas} idioma={idioma} />
      <MenuFooter negocio={negocio} slug={slug} idioma={idioma} />
    </div>
  );
}
