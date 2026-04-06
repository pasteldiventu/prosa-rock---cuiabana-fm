import type { Metadata } from "next";
import "./globals.css";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Prosa & Rock — Cuiabana FM 105.1 | Com Cimone Lima",
  description: "Programa Prosa & Rock na Cuiabana FM 105.1 — rock, entrevistas e cena local com Cimone Lima.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-dark-bg text-zinc-300">
        <div className="prosa-noise flex min-h-screen flex-col">
          <SiteNavbar />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
