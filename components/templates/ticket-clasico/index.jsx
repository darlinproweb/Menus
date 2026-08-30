"use client";

import { useState } from "react";
import { formatoPrecioDOP } from "@/lib/formato";
import { LanguageSelector } from "@/components/LanguageSelector";
import { getUIText, traducirMenuTexto } from "@/lib/i18n";

function agruparPorCategoria(productos) {
  const grupos = {};
  for (const p of productos) {
    const cat = p.categoria || "General";
    if (!grupos[cat]) grupos[cat] = [];
    grupos[cat].push(p);
  }
  return grupos;
}

export function TicketClasicoTemplate({ negocio, productos, slug }) {
  const [idioma, setIdioma] = useState("es");
  const grupos = agruparPorCategoria(productos);

  const waPrompt = idioma === "en"
    ? `Hello ${negocio.nombre}! I would like to order via WhatsApp.`
    : `¡Hola ${negocio.nombre}! Quisiera hacer un pedido.`;

  const waLink = negocio.whatsapp_numero
    ? `https://wa.me/${negocio.whatsapp_numero}?text=${encodeURIComponent(waPrompt)}`
    : null;

  return (
    <main className="min-h-screen px-5 py-10 max-w-lg mx-auto relative">
      <div className="flex justify-end mb-4">
        <LanguageSelector
          idioma={idioma}
          onCambiarIdioma={setIdioma}
          variant="classic"
        />
      </div>

      <header className="text-center mb-10">
        {negocio.logo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={negocio.logo_url}
            alt={negocio.nombre}
            className="h-16 w-auto max-w-[220px] object-contain mx-auto mb-3 filter drop-shadow-sm"
          />
        )}
        <h1
          className="font-display text-3xl"
          style={{ color: negocio.color_acento || "#6B2737" }}
        >
          {negocio.nombre}
        </h1>
      </header>

      {Object.keys(grupos).length === 0 && (
        <p className="text-center text-ink2">
          {getUIText("empty_menu_notice", idioma)}
        </p>
      )}

      {Object.entries(grupos).map(([categoria, items]) => (
        <section key={categoria} className="mb-9">
          <h2
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: negocio.color_acento || "#6B2737" }}
          >
            {traducirMenuTexto(categoria, idioma)}
          </h2>

          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className={item.disponible ? "" : "opacity-40"}>
                <div className="menu-row">
                  <span className="font-display text-lg">
                    {traducirMenuTexto(item, idioma, "nombre")}
                  </span>
                  <span className="leader" aria-hidden="true" />
                  <span className="font-mono tabular text-sm">
                    {item.precio_texto || formatoPrecioDOP(item.precio)}
                  </span>
                </div>
                {item.descripcion && (
                  <p className="text-sm text-ink2 mt-0.5">
                    {traducirMenuTexto(item, idioma, "descripcion")}
                  </p>
                )}
                {!item.disponible && (
                  <p className="text-xs font-mono uppercase tracking-wide mt-0.5">
                    {getUIText("sold_out", idioma)}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}

      {waLink && (
        <div className="text-center mt-10">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-sm border border-ink px-5 py-2.5 rounded-full hover:bg-ink hover:text-paper transition-colors"
          >
            {getUIText("order_whatsapp", idioma)}
          </a>
        </div>
      )}

      <footer className="text-center mt-14 text-xs text-ink2 font-mono">
        <a href={`/${slug}/admin`} className="underline">
          {getUIText("admin_panel_short", idioma)}
        </a>
        {" · "}{getUIText("digital_menu_by", idioma)} NexoLink
      </footer>
    </main>
  );
}
