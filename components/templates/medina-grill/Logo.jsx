import Image from "next/image";
import { Flame } from "lucide-react";

const dimensiones = {
  sm: { width: 44, height: 44, textSize: "text-lg", iconSize: "w-3 h-3" },
  md: { width: 80, height: 80, textSize: "text-2xl", iconSize: "w-5 h-5" },
  lg: { width: 130, height: 130, textSize: "text-4xl", iconSize: "w-8 h-8" },
  hero: { width: 160, height: 160, textSize: "text-5xl", iconSize: "w-10 h-10" }
};

export function Logo({ logoUrl, nombre, size = "md", className = "", showTagline = false, tagline = "" }) {
  const { width, height, textSize } = dimensiones[size] || dimensiones.md;
  const initial = nombre?.charAt(0) || "🔥";

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative group">
        <div
          className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#FFC700]/30 via-[#FF5500]/25 to-[#D62828]/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        />
        {logoUrl ? (
          <div className="relative overflow-hidden rounded-2xl p-1.5 bg-black/40 border border-primary/20 backdrop-blur-sm">
            <Image
              src={logoUrl}
              alt={`${nombre} logo`}
              width={width}
              height={height}
              priority={size === "hero" || size === "lg"}
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div
            style={{ width: `${width}px`, height: `${height}px` }}
            className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-primary/40 bg-gradient-to-b from-[#1C0F10] via-[#12090A] to-black shadow-2xl backdrop-blur-sm transition-transform duration-500 group-hover:scale-105"
          >
            <div className="absolute inset-0.5 rounded-[14px] border border-primary/20 pointer-events-none" />
            <span className={`font-serif font-bold text-gold-gradient ${textSize} select-none leading-none tracking-tight`}>
              {initial}
            </span>
            {size === "hero" && (
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-[0.25em] text-primary/80">
                <Flame className="w-3 h-3 text-amber-500 animate-pulse" />
                Grill
              </span>
            )}
          </div>
        )}
      </div>
      {showTagline && tagline && (
        <div className="mt-3 text-center">
          <span className="inline-block bg-[#D62828] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-0.5 rounded shadow-sm shadow-red-900/50">
            {tagline}
          </span>
        </div>
      )}
    </div>
  );
}
