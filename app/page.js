"use client";

import { useState } from "react";
import Link from "next/link";
import {
  QrCode,
  Utensils,
  Zap,
  Smartphone,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ChefHat,
  Copy,
  Check,
  Store,
  Flame,
  Receipt,
  Globe,
  Settings,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const [activeTemplate, setActiveTemplate] = useState("medina-grill");
  const [slugInput, setSlugInput] = useState("fuego-brasa");
  const [copied, setCopied] = useState(false);

  const DEMO_SLUGS = {
    "medina-grill": "fuego-brasa",
    "ticket-clasico": "restaurante-demo",
    "bistro-chic": "bistro-demo",
  };

  const handleCopy = () => {
    const defaultBase = process.env.NEXT_PUBLIC_APP_URL || "https://nexomenus.netlify.app";
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (typeof window !== "undefined" && !window.location.hostname.includes("localhost") && !window.location.hostname.includes("127.0.0.1")
        ? window.location.origin
        : defaultBase);
    const fullUrl = `${baseUrl.replace(/\/+$/, "")}/${slugInput}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#EFEAE0] text-[#201C16] font-sans selection:bg-[#6B2737] selection:text-white relative overflow-x-hidden">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#2F4F3E]/10 via-[#6B2737]/10 to-transparent blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-[600px] right-0 w-[500px] h-[500px] bg-[#6B2737]/5 blur-3xl pointer-events-none -z-10" />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-[#EFEAE0]/85 backdrop-blur-md border-b border-[#C9C0AE]/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B2737] to-[#2F4F3E] flex items-center justify-center text-white shadow-md shadow-[#6B2737]/20 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-[#201C16] flex items-center gap-1.5">
                NexoLink <span className="text-[#6B2737] font-semibold">Menus</span>
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#4A4338]/80 block -mt-1">
                Multi-Tenant Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A4338]">
            <a href="#demostraciones" className="hover:text-[#6B2737] transition-colors">
              Plantillas
            </a>
            <a href="#caracteristicas" className="hover:text-[#6B2737] transition-colors">
              Características
            </a>
            <a href="#como-funciona" className="hover:text-[#6B2737] transition-colors">
              Cómo Funciona
            </a>
            <a href="#admin" className="hover:text-[#6B2737] transition-colors">
              Panel Admin
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/restaurante-demo"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-mono font-medium px-4 py-2 rounded-full border border-[#C9C0AE] text-[#201C16] hover:bg-[#C9C0AE]/30 transition-all"
            >
              <Receipt className="w-3.5 h-3.5 text-[#2F4F3E]" />
              Demo Clásico
            </Link>
            <Link
              href="/fuego-brasa"
              className="inline-flex items-center gap-2 text-xs font-mono font-medium px-4 py-2 rounded-full bg-[#6B2737] text-white shadow-md hover:bg-[#441721] transition-all hover:shadow-lg"
            >
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              Demo Fuego &amp; Brasa
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 max-w-7xl mx-auto text-center relative">
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#C9C0AE] shadow-sm mb-6 text-xs font-mono text-[#2F4F3E]">
          <span className="w-2 h-2 rounded-full bg-[#2F4F3E]" />
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Plataforma de Menús & Catálogos Digitales
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-[#201C16] tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Menús Digitales <span className="italic font-normal text-[#6B2737]">Interactivos</span> para tu Negocio
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-[#4A4338] max-w-2xl mx-auto leading-relaxed">
          Un solo sistema inteligente sirve a múltiples restaurantes. Código QR instantáneo,
          actualización en tiempo real y hermosas plantillas adaptadas a la identidad de tu marca.
        </p>

        {/* Dynamic URL Tester Box */}
        <div className="mt-10 max-w-xl mx-auto bg-white/90 p-2 sm:p-3 rounded-2xl border border-[#C9C0AE] shadow-lg shadow-[#6B2737]/5 flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#EFEAE0]/60 rounded-xl w-full sm:w-auto flex-1 font-mono text-xs text-[#4A4338]">
            <Globe className="w-4 h-4 text-[#2F4F3E] shrink-0" />
            <span className="text-[#4A4338]/60 hidden sm:inline">nexomenus.netlify.app/</span>
            <input
              type="text"
              value={slugInput}
              onChange={(e) => setSlugInput(e.target.value)}
              placeholder="tu-negocio"
              className="bg-transparent border-none outline-none font-bold text-[#201C16] w-full"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-xl border border-[#C9C0AE] text-xs font-medium hover:bg-[#EFEAE0] transition-colors flex items-center justify-center gap-1.5 text-[#201C16] w-full sm:w-auto"
              title="Copiar Enlace"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#4A4338]" />}
              {copied ? "¡Copiado!" : "Copiar"}
            </button>
            <Link
              href={`/${slugInput}`}
              className="px-4 py-2 rounded-xl bg-[#2F4F3E] hover:bg-[#1c3227] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md w-full sm:w-auto shrink-0"
            >
              Ver Ruta <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Route Shortcut Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-[#4A4338]">
          <span className="text-[#4A4338]/70">Rutas de demostración listas:</span>
          <button
            onClick={() => { setSlugInput("fuego-brasa"); setActiveTemplate("medina-grill"); }}
            className={`px-2.5 py-1 rounded-md transition-all ${slugInput === "fuego-brasa" ? "bg-[#6B2737] text-white font-bold" : "bg-white/60 hover:bg-white text-[#201C16]"
              }`}
          >
            /fuego-brasa
          </button>
          <button
            onClick={() => { setSlugInput("restaurante-demo"); setActiveTemplate("ticket-clasico"); }}
            className={`px-2.5 py-1 rounded-md transition-all ${slugInput === "restaurante-demo" ? "bg-[#2F4F3E] text-white font-bold" : "bg-white/60 hover:bg-white text-[#201C16]"
              }`}
          >
            /restaurante-demo
          </button>
          <button
            onClick={() => { setSlugInput("bistro-demo"); setActiveTemplate("bistro-chic"); }}
            className={`px-2.5 py-1 rounded-md transition-all ${slugInput === "bistro-demo" ? "bg-amber-700 text-white font-bold" : "bg-white/60 hover:bg-white text-[#201C16]"
              }`}
          >
            /bistro-demo
          </button>
        </div>
      </section>

      {/* Interactive Live Demo & Mockup Switcher */}
      <section id="demostraciones" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6B2737]/10 text-[#6B2737] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" /> Selector de Plantillas
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#201C16]">
            Explora las Plantillas Disponibles
          </h2>
          <p className="text-[#4A4338] mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Cada plantilla cuenta con estilos, tipografías y orden de categorías optimizado para diferentes experiencias gastronómicas.
          </p>

          {/* Toggle Controls — 3 opciones */}
          <div className="mt-6 inline-flex p-1.5 bg-white/80 rounded-2xl border border-[#C9C0AE] shadow-sm gap-1.5 flex-wrap justify-center">
            <button
              onClick={() => { setActiveTemplate("medina-grill"); setSlugInput("fuego-brasa"); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeTemplate === "medina-grill"
                  ? "bg-[#201C16] text-[#FFC700] shadow-md"
                  : "text-[#4A4338] hover:text-[#201C16] hover:bg-[#EFEAE0]/50"
                }`}
            >
              <Flame className="w-4 h-4 text-amber-500" />
              Fuego &amp; Brasa
            </button>
            <button
              onClick={() => { setActiveTemplate("ticket-clasico"); setSlugInput("restaurante-demo"); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeTemplate === "ticket-clasico"
                  ? "bg-[#6B2737] text-white shadow-md"
                  : "text-[#4A4338] hover:text-[#201C16] hover:bg-[#EFEAE0]/50"
                }`}
            >
              <Receipt className="w-4 h-4 text-emerald-300" />
              Ticket Clásico
            </button>
            <button
              onClick={() => { setActiveTemplate("bistro-chic"); setSlugInput("bistro-demo"); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeTemplate === "bistro-chic"
                  ? "bg-amber-700 text-white shadow-md"
                  : "text-[#4A4338] hover:text-[#201C16] hover:bg-[#EFEAE0]/50"
                }`}
            >
              <ChefHat className="w-4 h-4 text-amber-600" />
              Bistro Chic
            </button>
          </div>
        </div>

        {/* Live Mockup Container */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Description Column */}
          <div className="lg:col-span-5 space-y-6">
            {activeTemplate === "medina-grill" && (
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-[#C9C0AE] shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#201C16]">Plantilla Fuego &amp; Brasa</h3>
                <p className="text-sm text-[#4A4338] leading-relaxed">
                  Diseño premium en modo oscuro inspirado en Steak Houses de alta gama. Cuenta con jerarquía de 3 niveles: <strong className="text-[#201C16]">Categorías &gt; Grupos &gt; Productos</strong>, notas aclaratorias, precios formato texto y detalles dorados.
                </p>
                <div className="space-y-2 pt-2 border-t border-[#C9C0AE]/40 text-xs font-mono text-[#4A4338]">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Estética Oscura Elegante</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Buscador Interactivo Integrado</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Soporte para Etiquetas "Destacado"</div>
                </div>
                <div className="pt-4">
                  <Link href="/fuego-brasa" className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold text-sm transition-all shadow-md">
                    Ver Demo Real Fuego &amp; Brasa <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
            {activeTemplate === "ticket-clasico" && (
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-[#C9C0AE] shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#6B2737]/10 flex items-center justify-center text-[#6B2737] font-bold">
                  <Receipt className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#201C16]">Plantilla Ticket Clásico</h3>
                <p className="text-sm text-[#4A4338] leading-relaxed">
                  Inspirada en el encanto de los tickets impresos retro con líderes punteados entre el plato y el precio. Ideal para cafeterías, bistrós, panaderías y locales tradicionales.
                </p>
                <div className="space-y-2 pt-2 border-t border-[#C9C0AE]/40 text-xs font-mono text-[#4A4338]">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Fondo Papel Cálido</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Conexión con Pedidos por WhatsApp</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Formato de Precios en DOP</div>
                </div>
                <div className="pt-4">
                  <Link href="/restaurante-demo" className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#6B2737] hover:bg-[#441721] text-white font-semibold text-sm transition-all shadow-md">
                    Ver Demo Real Ticket Clásico <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
            {activeTemplate === "bistro-chic" && (
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-[#C9C0AE] shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-700/10 flex items-center justify-center text-amber-700 font-bold">
                  <ChefHat className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#201C16]">Plantilla Bistro Chic</h3>
                <p className="text-sm text-[#4A4338] leading-relaxed">
                  Diseño luminoso y sofisticado estilo cafetería artesanal. Paleta marfil, oliva y terracota con tarjetas flotantes y una <strong className="text-[#201C16]">bandeja de pedidos</strong> que envía la comanda directo por WhatsApp.
                </p>
                <div className="space-y-2 pt-2 border-t border-[#C9C0AE]/40 text-xs font-mono text-[#4A4338]">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Bandeja de Pedidos Flotante</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Buscador & Filtro por Categoría</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Ideal para Cafeterías y Brunch</div>
                </div>
                <div className="pt-4">
                  <Link href="/bistro-demo" className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-sm transition-all shadow-md">
                    Ver Demo Real Bistro Chic <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Mobile Phone Device Mockup */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-[340px] sm:max-w-[380px] bg-[#201C16] p-4 rounded-[40px] shadow-2xl border-4 border-[#4A4338]/30 relative group">
              {/* Phone Speaker Notch */}
              <div className="w-28 h-4 bg-[#201C16] rounded-b-xl mx-auto absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-[#4A4338]/50 rounded-full" />
              </div>

              {/* Screen Content Wrapper */}
              <div className="rounded-[30px] overflow-hidden min-h-[520px] max-h-[560px] relative text-left shadow-inner transition-all duration-500">

                {/* === MOCKUP: FUEGO & BRASA === */}
                {activeTemplate === "medina-grill" && (
                  <div className="tema-medina p-6 min-h-[560px] flex flex-col justify-between overflow-y-auto">
                    <div>
                      <div className="text-center pt-6 pb-4 border-b border-amber-500/20">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto mb-2 text-amber-400 font-serif font-bold text-xl">🔥</div>
                        <h4 className="font-serif text-xl font-bold text-gold-gradient">Fuego &amp; Brasa</h4>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-amber-200/60 mt-0.5">Steakhouse &amp; Grill</p>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-2">PARRILLADAS PARA COMPARTIR</span>
                          <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-500/20 space-y-2">
                            <div className="flex justify-between items-baseline">
                              <span className="font-serif text-sm font-semibold text-amber-100">Parrillada de Marisco 2P</span>
                              <span className="font-mono text-xs text-amber-400 font-bold">RD$ 3,300</span>
                            </div>
                            <p className="text-[11px] text-amber-200/70">Pulpo, camarón, lambi, langostino, pescado y calamar a las brasas.</p>
                          </div>
                        </div>
                        <div>
                          <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-500/20 space-y-2">
                            <div className="flex justify-between items-baseline">
                              <span className="font-serif text-sm font-semibold text-amber-100">Costillitas Babe Back</span>
                              <span className="font-mono text-xs text-amber-400 font-bold">RD$ 950</span>
                            </div>
                            <p className="text-[11px] text-amber-200/70">Costillas tiernas y caramelizadas con salsa BBQ de la casa.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-amber-500/20 text-center">
                      <span className="text-[10px] font-mono text-amber-300/80 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">✨ Plantilla Fuego &amp; Brasa Activa</span>
                    </div>
                  </div>
                )}

                {/* === MOCKUP: TICKET CLÁSICO === */}
                {activeTemplate === "ticket-clasico" && (
                  <div className="bg-[#EFEAE0] text-[#201C16] p-6 min-h-[560px] flex flex-col justify-between overflow-y-auto">
                    <div>
                      <div className="text-center pt-6 pb-4 border-b border-[#C9C0AE]">
                        <h4 className="font-display text-2xl font-bold text-[#6B2737]">Restaurante Demo</h4>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-[#4A4338] mt-1">Platos &amp; Catálogo Digital</p>
                      </div>
                      <div className="mt-6 space-y-4">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#6B2737] font-bold block">ENTRADAS &amp; PASTAS</span>
                        <div className="space-y-3">
                          <div>
                            <div className="menu-row">
                              <span className="font-display text-sm font-semibold">Canastitas de Plátano</span>
                              <span className="leader" />
                              <span className="font-mono text-xs">RD$ 300/500</span>
                            </div>
                            <p className="text-[11px] text-[#4A4338] mt-0.5">Rellenas a tu gusto de carne o mariscos.</p>
                          </div>
                          <div>
                            <div className="menu-row">
                              <span className="font-display text-sm font-semibold">Fettuccini Camarón/Pollo</span>
                              <span className="leader" />
                              <span className="font-mono text-xs">RD$ 550/800</span>
                            </div>
                            <p className="text-[11px] text-[#4A4338] mt-0.5">A la Carbonara, Pomodoro o Boloñesa.</p>
                          </div>
                          <div>
                            <div className="menu-row">
                              <span className="font-display text-sm font-semibold">Canapé Mixto</span>
                              <span className="leader" />
                              <span className="font-mono text-xs">RD$ 350</span>
                            </div>
                            <p className="text-[11px] text-[#4A4338] mt-0.5">Bocadillos crujientes montados con carne y camarón.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[#C9C0AE] text-center">
                      <span className="text-[10px] font-mono text-[#6B2737] bg-white/80 px-3 py-1 rounded-full border border-[#C9C0AE]">🎟️ Plantilla Ticket Clásico Activa</span>
                    </div>
                  </div>
                )}

                {/* === MOCKUP: BISTRO CHIC === */}
                {activeTemplate === "bistro-chic" && (
                  <div className="tema-bistro p-5 min-h-[560px] flex flex-col justify-between overflow-y-auto">
                    <div>
                      <div className="text-center pt-6 pb-4 border-b border-[#E2D9CB]">
                        <div className="w-10 h-10 rounded-full bg-amber-700/10 border border-amber-700/20 flex items-center justify-center mx-auto mb-2">
                          <ChefHat className="w-5 h-5 text-amber-700" />
                        </div>
                        <h4 className="font-serif-bistro text-xl font-bold text-[#2D2A26]">L'Étoile Bistro</h4>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-[#5C554C] mt-0.5">Café &amp; Brunch</p>
                      </div>
                      <div className="mt-4 space-y-3">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">PESCADOS Y MARISCOS</p>
                        <div className="bistro-card rounded-2xl p-3 space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-serif-bistro text-sm font-semibold text-[#2D2A26]">Langosta 1.5 LB</span>
                            <span className="font-mono text-xs text-amber-700 font-bold shrink-0 ml-2">RD$ 1,500</span>
                          </div>
                          <p className="text-[11px] text-[#5C554C]">Al Termidor o Al Ajillo.</p>
                          <span className="text-[10px] font-mono text-amber-700/80 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200 inline-block">⭐ Destacado</span>
                        </div>
                        <div className="bistro-card rounded-2xl p-3 space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-serif-bistro text-sm font-semibold text-[#2D2A26]">Pescado Colorao</span>
                            <span className="font-mono text-xs text-amber-700 font-bold shrink-0 ml-2">RD$ 1,200</span>
                          </div>
                          <p className="text-[11px] text-[#5C554C]">Frito o al vapor a la criolla, ajillo o coco.</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-[#E2D9CB] text-center">
                      <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">☕ Plantilla Bistro Chic Activa</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="caracteristicas" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F4F3E]/10 text-[#2F4F3E] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" /> Ventajas Competitivas
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#201C16]">
            Todo lo que Tu Negocio Necesita
          </h2>
          <p className="text-[#4A4338] mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Diseñado para eliminar menús impresos costosos y brindar una experiencia de usuario rápida en dispositivos móviles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-[#C9C0AE]/70 hover:border-[#6B2737]/40 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#6B2737]/10 flex items-center justify-center text-[#6B2737] mb-6 group-hover:scale-110 transition-transform">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#201C16] mb-2">
              Código QR Instantáneo
            </h3>
            <p className="text-sm text-[#4A4338] leading-relaxed">
              Genera tu propio código QR listo para colocar en mesas, barras y mostradores. Tus clientes solo escanean y navegan.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-[#C9C0AE]/70 hover:border-[#2F4F3E]/40 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#2F4F3E]/10 flex items-center justify-center text-[#2F4F3E] mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#201C16] mb-2">
              Actualizaciones al Instante
            </h3>
            <p className="text-sm text-[#4A4338] leading-relaxed">
              Cambia un precio, agrega un plato del día o marca artículos agotados en tiempo real. Los cambios se reflejan inmediatamente.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-[#C9C0AE]/70 hover:border-amber-600/40 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-700 mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#201C16] mb-2">
              Pedidos por WhatsApp
            </h3>
            <p className="text-sm text-[#4A4338] leading-relaxed">
              Permite a los usuarios armar su selección y enviar el pedido estructurado directamente a tu número de WhatsApp.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-[#C9C0AE]/70 hover:border-[#2F4F3E]/40 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#2F4F3E]/10 flex items-center justify-center text-[#2F4F3E] mb-6 group-hover:scale-110 transition-transform">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#201C16] mb-2">
              Panel Admin Autoservicio
            </h3>
            <p className="text-sm text-[#4A4338] leading-relaxed">
              Cada negocio cuenta con su panel privado en <code className="bg-[#EFEAE0] px-1.5 py-0.5 rounded text-xs">/admin</code> con autenticación segura por Magic Links.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-[#C9C0AE]/70 hover:border-[#6B2737]/40 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#6B2737]/10 flex items-center justify-center text-[#6B2737] mb-6 group-hover:scale-110 transition-transform">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#201C16] mb-2">
              Multi-Tenant Escalable
            </h3>
            <p className="text-sm text-[#4A4338] leading-relaxed">
              Una sola infraestructura atiende a cientos de clientes. Cada negocio obtiene su slug único sin requerir deploys adicionales.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-[#C9C0AE]/70 hover:border-amber-600/40 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-700 mb-6 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#201C16] mb-2">
              Optimizado para Celulares
            </h3>
            <p className="text-sm text-[#4A4338] leading-relaxed">
              Carga ultra rápida sin descargas ni aplicaciones pesadas. Funciona fluidamente en iOS, Android y cualquier navegador web.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="bg-gradient-to-br from-[#201C16] to-[#342D24] text-white rounded-[40px] p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow Circle */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#6B2737]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FFC700] font-bold block mb-2">
              Paso a Paso
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold">
              ¿Cómo funciona NexoLink Menus?
            </h2>
            <p className="text-gray-300 mt-4 text-sm sm:text-base">
              Lanzar el catálogo digital de tu restaurante es un proceso de tres sencillos pasos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 relative">
              <span className="text-4xl font-mono font-bold text-[#FFC700]/40 absolute top-4 right-6">
                01
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#6B2737] flex items-center justify-center text-white mb-4 font-bold text-sm">
                1
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Asigna la Ruta
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Cada comercio obtiene su URL personalizada como <code className="text-[#FFC700] text-xs">tudominio.com/tu-negocio</code> en la base de datos Supabase.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 relative">
              <span className="text-4xl font-mono font-bold text-[#FFC700]/40 absolute top-4 right-6">
                02
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#2F4F3E] flex items-center justify-center text-white mb-4 font-bold text-sm">
                2
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Carga tus Productos
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Ingresa al panel <code className="text-[#FFC700] text-xs">/tu-negocio/admin</code> para definir categorías, precios, descripciones y estado de disponibilidad.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 relative">
              <span className="text-4xl font-mono font-bold text-[#FFC700]/40 absolute top-4 right-6">
                03
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white mb-4 font-bold text-sm">
                3
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Imprime tu QR
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Comparte la URL o imprime el código QR en el menú físico de tus mesas para que los clientes accedan inmediatamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Panel Banner Showcase */}
      <section id="admin" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#C9C0AE] p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6B2737]/10 text-[#6B2737] text-xs font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Seguridad RLS en Supabase
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#201C16]">
              Panel Admin de Autoservicio
            </h3>
            <p className="text-sm sm:text-base text-[#4A4338] leading-relaxed">
              Los dueños de negocio pueden ingresar mediante Magic Link (sin contraseña) y gestionar su carta de menú de forma independiente.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/restaurante-demo/admin"
                className="px-5 py-2.5 rounded-xl bg-[#201C16] hover:bg-[#342D24] text-white text-xs font-mono font-medium flex items-center gap-2 transition-all shadow-md"
              >
                Probar /restaurante-demo/admin <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="w-full md:w-auto bg-[#EFEAE0] p-6 rounded-2xl border border-[#C9C0AE] font-mono text-xs text-[#201C16] space-y-3 shrink-0 shadow-inner">
            <div className="flex items-center justify-between border-b border-[#C9C0AE] pb-2 font-bold">
              <span>ESTADO DE SEGURIDAD</span>
              <span className="text-emerald-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" /> ACTIVO
              </span>
            </div>
            <p className="text-[#4A4338]">✓ Multi-tenant Row Level Security</p>
            <p className="text-[#4A4338]">✓ Magic Link Authentication</p>
            <p className="text-[#4A4338]">✓ Cero filtración entre clientes</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#C9C0AE] bg-[#EFEAE0] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#4A4338] font-mono">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#6B2737] flex items-center justify-center text-white">
              <Utensils className="w-4 h-4" />
            </div>
            <span className="font-bold text-[#201C16]">NexoLink Menus</span>
            <span>— Plataforma Multi-Tenant</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/restaurante-demo" className="hover:text-[#6B2737] underline">
              Demo Ticket Clásico
            </Link>
            <Link href="/fuego-brasa" className="hover:text-[#6B2737] underline">
              Demo Fuego &amp; Brasa
            </Link>
            <Link href="/bistro-demo" className="hover:text-[#6B2737] underline">
              Demo Bistro Chic
            </Link>
            <Link href="/restaurante-demo/admin" className="hover:text-[#6B2737] underline">
              Panel Admin
            </Link>
          </div>

          <div>
            Desarrollado con <span className="text-[#6B2737]">Next.js</span>, <span className="text-[#2F4F3E]">Supabase</span> & Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
}
