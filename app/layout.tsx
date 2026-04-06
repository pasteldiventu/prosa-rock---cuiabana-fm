import type { Metadata } from "next";
import "./globals.css";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Prosa Rock - Com Cimone Lima",
  description: "Blog e landing page oficial do programa Prosa Rock com Cimone Lima",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-dark-bg text-zinc-300">
        <div className="flex min-h-screen flex-col">
          <SiteNavbar />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
