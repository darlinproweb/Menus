import Image from "next/image";

const dimensiones = {
  sm: { width: 44, height: 44 },
  md: { width: 80, height: 80 },
  lg: { width: 140, height: 140 },
  hero: { width: 220, height: 220 }
};

export function Logo({ logoUrl, nombre, size = "md", className = "", showTagline = false, tagline = "" }) {
  const { width, height } = dimensiones[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative group">
        <div
          className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#FFC700]/30 via-[#FF5500]/25 to-[#D62828]/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        />
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
