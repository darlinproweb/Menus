import { Fraunces, IBM_Plex_Mono, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"]
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"]
});

// Fuentes usadas por la plantilla "medina-grill". Cargarlas aquí no
// afecta a las demás plantillas: solo se aplican donde el CSS las
// referencia (dentro de .tema-medina).
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata = {
  title: {
    default: "NexoLink Menus — Menús Digitales Interactivos",
    template: "%s | NexoLink Menus"
  },
  description: "Plataforma multi-tenant de menús y catálogos digitales para restaurantes, cafeterías y negocios locales. Código QR instantáneo, pedidos por WhatsApp y panel admin de autoservicio.",
  keywords: ["menú digital", "catálogo digital", "restaurante", "código QR", "pedidos WhatsApp", "NexoLink"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://nexomenus.netlify.app"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" }
    ],
  },
  openGraph: {
    siteName: "NexoLink Menus",
    locale: "es_DO",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      scroll-behavior="smooth"
      className={`${fraunces.variable} ${plexMono.variable} ${playfair.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
