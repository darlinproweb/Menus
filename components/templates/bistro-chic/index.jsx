"use client";

import { useState } from "react";
import { BistroHero } from "./BistroHero";
import { BistroNav } from "./BistroNav";
import { BistroSearchableList } from "./BistroSearchableList";
import { BistroOrderTray } from "./BistroOrderTray";
import { BistroFooter } from "./BistroFooter";

export function BistroChicTemplate({ negocio, slug, categoriasEstructuradas }) {
  const [idioma, setIdioma] = useState("es");
  const [ordenItems, setOrdenItems] = useState({});

  const categoriasParaNav = categoriasEstructuradas.map((c) => ({
    id: c.id,
    nombre: c.nombre
  }));

  const handleAgregarItem = (item) => {
    setOrdenItems((prev) => {
      const actual = prev[item.id] || { item, cantidad: 0 };
      return {
        ...prev,
        [item.id]: {
          item,
          cantidad: actual.cantidad + 1
        }
      };
    });
  };

  const handleRemoverItem = (itemId) => {
    setOrdenItems((prev) => {
      const actual = prev[itemId];
      if (!actual) return prev;
      if (actual.cantidad <= 1) {
        const copia = { ...prev };
        delete copia[itemId];
        return copia;
      }
      return {
        ...prev,
        [itemId]: {
          ...actual,
          cantidad: actual.cantidad - 1
        }
      };
    });
  };

  const handleLimpiarOrden = () => {
    setOrdenItems({});
  };

  return (
    <div className="tema-bistro min-h-screen">
      <BistroHero negocio={negocio} idioma={idioma} />
      <BistroNav
        categorias={categoriasParaNav}
        idioma={idioma}
        onCambiarIdioma={setIdioma}
      />
      <BistroSearchableList
        categorias={categoriasEstructuradas}
        ordenItems={ordenItems}
        onAgregarItem={handleAgregarItem}
        onRemoverItem={handleRemoverItem}
        idioma={idioma}
      />
      <BistroOrderTray
        negocio={negocio}
        ordenItems={ordenItems}
        onAgregar={handleAgregarItem}
        onRemover={handleRemoverItem}
        onLimpiar={handleLimpiarOrden}
        idioma={idioma}
      />
      <BistroFooter negocio={negocio} slug={slug} idioma={idioma} />
    </div>
  );
}
