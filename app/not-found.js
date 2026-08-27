import Link from "next/link";
import { Utensils, ArrowLeft, Search } from "lucide-react";

export const metadata = {
  title: "Página no encontrada — NexoLink Menus",
  description: "El menú o negocio que buscas no existe o no está disponible."
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#EFEAE0] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background decorative orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#6B2737]/8 via-[#2F4F3E]/8 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#2F4F3E]/5 blur-3xl pointer-events-none" />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 mb-12 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B2737] to-[#2F4F3E] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
          <Utensils className="w-5 h-5" />
        </div>
        <span className="font-display text-xl font-bold tracking-tight text-[#201C16]">
          NexoLink <span className="text-[#6B2737]">Menus</span>
        </span>
      </Link>

      {/* 404 number */}
      <div className="relative mb-6">
        <span className="font-display text-[8rem] sm:text-[12rem] font-semibold leading-none text-[#201C16]/5 select-none pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          404
        </span>
        <div className="w-20 h-20 rounded-3xl bg-white/80 backdrop-blur-md border border-[#C9C0AE] shadow-xl flex items-center justify-center mx-auto relative z-10">
          <Search className="w-9 h-9 text-[#6B2737]" />
        </div>
      </div>

      {/* Message */}
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#201C16] mt-6 mb-3">
        Menú no encontrado
      </h1>
      <p className="text-[#4A4338] text-sm sm:text-base max-w-sm leading-relaxed mb-10">
        La ruta que buscas no existe o el negocio no está disponible en este momento.
        Verifica que el enlace o código QR sea correcto.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#201C16] hover:bg-[#342D24] text-white font-mono text-sm font-semibold transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
        <a
          href="mailto:soporte@nexolink.com"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#C9C0AE] bg-white/60 hover:bg-white text-[#201C16] font-mono text-sm font-semibold transition-all"
        >
          Contactar soporte
        </a>
      </div>

      {/* Footer hint */}
      <p className="mt-16 text-xs font-mono text-[#4A4338]/60">
        ¿Eres dueño de este negocio?{" "}
        <Link href="/" className="underline hover:text-[#6B2737] transition-colors">
          Conoce NexoLink Menus
        </Link>
      </p>
    </main>
  );
}
