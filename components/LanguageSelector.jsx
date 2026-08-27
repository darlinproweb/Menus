"use client";

export function LanguageSelector({ idioma, onCambiarIdioma, variant = "default" }) {
  const isEn = idioma === "en";

  // Estilos según plantilla
  let containerStyles = "inline-flex items-center rounded-full p-1 border backdrop-blur-md shadow-xs transition-all";
  let activeBtnStyles = "rounded-full px-2.5 py-1 text-xs font-bold transition-all flex items-center gap-1 shadow-xs";
  let inactiveBtnStyles = "rounded-full px-2.5 py-1 text-xs font-medium transition-all flex items-center gap-1 opacity-70 hover:opacity-100 cursor-pointer";

  if (variant === "bistro") {
    containerStyles += " border-[#E5DEC6] bg-[#FAF6F0]/90 text-[#2D2A26]";
    activeBtnStyles += " bg-[#2E3B32] text-[#FDFBF7]";
    inactiveBtnStyles += " text-[#5C554C] hover:bg-[#EAE2D3]";
  } else if (variant === "medina") {
    containerStyles += " border-primary/30 bg-black/60 text-foreground";
    activeBtnStyles += " bg-primary text-primary-foreground font-bold shadow-amber-500/20";
    inactiveBtnStyles += " text-muted-foreground hover:text-primary hover:bg-primary/10";
  } else {
    // Ticket Clasico / Default
    containerStyles += " border-ink/20 bg-paper text-ink";
    activeBtnStyles += " bg-ink text-paper font-mono";
    inactiveBtnStyles += " text-ink2 font-mono hover:bg-ink/5";
  }

  return (
    <div className={containerStyles} role="group" aria-label="Selector de idioma">
      <button
        type="button"
        onClick={() => onCambiarIdioma("es")}
        className={!isEn ? activeBtnStyles : inactiveBtnStyles}
        title="Español"
      >
        <span>🇪🇸</span>
        <span className="text-[11px] uppercase tracking-wider">ES</span>
      </button>
      <button
        type="button"
        onClick={() => onCambiarIdioma("en")}
        className={isEn ? activeBtnStyles : inactiveBtnStyles}
        title="English"
      >
        <span>🇺🇸</span>
        <span className="text-[11px] uppercase tracking-wider">EN</span>
      </button>
    </div>
  );
}
