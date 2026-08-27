import Image from "next/image";
import { getUIText, traducirMenuTexto } from "@/lib/i18n";

export function BistroHero({ negocio, idioma }) {
  const heroImg = negocio.imagen_hero_url || "/hero-parrilla.png";
  const waPrompt = idioma === "en"
    ? `Hello ${negocio.nombre}! I would like to make an inquiry or order.`
    : `¡Hola ${negocio.nombre}! Quisiera hacer una consulta/pedido.`;
    
  const waLink = negocio.whatsapp_numero
    ? `https://wa.me/${negocio.whatsapp_numero}?text=${encodeURIComponent(waPrompt)}`
    : null;

  return (
    <header className="relative overflow-hidden border-b border-[#E8DEC9] bg-[#FDFBF7]">
      {/* Background Image Overlay */}
      {negocio.imagen_hero_url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImg}
            alt={negocio.nombre}
            fill
            priority
            className="object-cover opacity-15 filter blur-[2px] saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/60 via-[#FDFBF7]/90 to-[#FAF6F0]" />
        </div>
      )}

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-12 pb-14 text-center md:pt-16 md:pb-18">
        {/* Logo Badge */}
        {negocio.logo_url ? (
          <div className="mb-5 relative h-24 w-24 overflow-hidden rounded-full border-4 border-[#FFFFFF] shadow-md shadow-[#2D2A26]/10 transition-transform hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={negocio.logo_url}
              alt={negocio.nombre}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#D4A373] bg-[#F4EFE6] text-3xl font-serif-bistro font-bold text-[#2E3B32] shadow-sm">
            {negocio.nombre?.charAt(0) || "B"}
          </div>
        )}

        {/* Tagline Badge */}
        {negocio.tagline && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4A373]/50 bg-[#F4EFE6] px-4 py-1 text-xs uppercase tracking-[0.25em] text-[#B88956] shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A5D4E]" />
            <span>{traducirMenuTexto(negocio.tagline, idioma)}</span>
          </div>
        )}

        {/* Business Title */}
        <h1 className="font-serif-bistro text-4xl font-bold tracking-tight text-gradient-bistro md:text-6xl">
          {negocio.nombre}
        </h1>

        {/* Description */}
        {negocio.descripcion && (
          <p className="mt-4 max-w-lg text-sm text-[#6C6356] leading-relaxed md:text-base">
            {traducirMenuTexto(negocio.descripcion, idioma)}
          </p>
        )}

        {/* Information Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-[#5C554C]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAE2D3]/60 px-3 py-1 font-medium">
            ✨ {getUIText("interactive_menu", idioma)}
          </span>
          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#2E3B32] px-3.5 py-1 text-[#FDFBF7] font-medium transition-all hover:bg-[#3D4F43] hover:shadow-md"
            >
              <span>💬 {getUIText("contact_whatsapp", idioma)}</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
