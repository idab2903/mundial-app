import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mundial 2026",
  description: "Resultados, calendario, noticias y apuestas del Mundial 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-white`}
      >
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
            <a href="/" className="flex items-center gap-2 text-xl font-bold">
              <span>Mundial 2026</span>
            </a>
            <div className="flex gap-6 text-sm text-zinc-400">
              <a href="/" className="transition hover:text-white">Inicio</a>
              <a href="/groups" className="transition hover:text-white">Grupos</a>
              <a href="/matches" className="transition hover:text-white">Partidos</a>
              <a href="/teams" className="transition hover:text-white">Equipos</a>
            </div>
          </div>
        </nav>

        {/* CONTENIDO */}
        <main className="mx-auto max-w-7xl px-4 py-8">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500">
          <p>Mundial 2026 USA 🇺🇸 México 🇲🇽 Canadá 🇨🇦</p>
        </footer>
      </body>
    </html>
  );
}