import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Logo } from "./Logo";
import { getUIText } from "@/lib/i18n";

export function MenuFooter({ negocio, slug, idioma = "es" }) {
  const waPrompt = idioma === "en"
    ? `Hello ${negocio.nombre}! I would like to order via WhatsApp.`
    : `¡Hola ${negocio.nombre}! Quisiera hacer un pedido.`;
    
  const waLink = negocio.whatsapp_numero
    ? `https://wa.me/${negocio.whatsapp_numero}?text=${encodeURIComponent(waPrompt)}`
    : null;

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-primary/20 bg-[#0F0708]">
      <div className="absolute inset-0">
        <Image
          src="/parrillada.png"
          alt=""
          fill
          className="object-cover opacity-15 filter contrast-125 saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0708] via-[#0F0708]/90 to-[#0F0708]/70" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-16 text-center">
        <Logo
          logoUrl={negocio.logo_url || "/logo-medina.png"}
          nombre={negocio.nombre}
          size="lg"
          showTagline={Boolean(negocio.tagline)}
          tagline={negocio.tagline}
          className="mb-6"
        />

        <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
          {getUIText("we_welcome_you", idioma)} {negocio.nombre}
        </h2>

        {waLink && (
          <div className="mt-8">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-primary/40 bg-primary/10 px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-primary hover:bg-primary/20 transition-colors"
            >
              {getUIText("order_whatsapp", idioma)}
            </a>
          </div>
        )}

        <div className="mt-12 border-t border-primary/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {negocio.nombre}. {getUIText("rights_reserved", idioma)}</p>

          <Link
            href={`/${slug}/admin`}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary/80 hover:text-primary transition-colors border-l border-primary/20 pl-4"
          >
            <Lock className="w-3 h-3" /> {getUIText("admin_panel_short", idioma)}
          </Link>
        </div>
      </div>
    </footer>
  );
}
