import Image from "next/image";
import { Logo } from "./Logo";
import { traducirMenuTexto } from "@/lib/i18n";

export function MenuHero({ negocio, idioma = "es" }) {
  const heroImg = negocio.imagen_hero_url || "/hero-parrilla.png";

  return (
    <header className="relative overflow-hidden border-b border-primary/20 bg-[#12090A]">
      <div className="absolute inset-0">
        <Image
          src={heroImg}
          alt={negocio.nombre}
          fill
          priority
          className="object-cover opacity-35 filter contrast-125 saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-60" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pt-16 pb-20 text-center md:pt-24 md:pb-28">
        <Logo
          logoUrl={negocio.logo_url}
          nombre={negocio.nombre}
          size="hero"
          className="mb-6"
        />

        {negocio.tagline && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-primary backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>{traducirMenuTexto(negocio.tagline, idioma)}</span>
          </div>
        )}

        <h1 className="font-serif text-5xl font-bold leading-none tracking-tight text-gold-gradient md:text-7xl">
          {negocio.nombre}
        </h1>

        {negocio.descripcion && (
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground/90 text-sm md:text-base">
            {traducirMenuTexto(negocio.descripcion, idioma)}
          </p>
        )}
      </div>
    </header>
  );
}
