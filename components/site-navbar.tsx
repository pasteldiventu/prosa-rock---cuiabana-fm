"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/blog", label: "Blog" },
  { href: "/apresentadora", label: "Apresentadora" },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-prosa-purple/20 bg-dark-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-2" onClick={() => setOpen(false)}>
            <div className="rounded-full bg-prosa-purple/15 p-2 transition-colors group-hover:bg-prosa-pink/20 prosa-glow-soft">
              <Radio className="h-5 w-5 text-prosa-pink" />
            </div>
            <span className="font-display text-lg tracking-wider text-white leading-tight">
              PROSA ROCK{" "}
              <span className="text-prosa-magenta">Com Cimone Lima</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm uppercase tracking-wider">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`transition-colors duration-200 hover:text-prosa-pink ${
                  isActive(link.href) ? "text-prosa-pink" : "text-zinc-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="md:hidden relative z-50 text-zinc-400 hover:text-prosa-pink p-2"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-dark-bg transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={`font-display text-4xl uppercase tracking-wider transition-colors duration-200 hover:text-prosa-pink ${
              isActive(link.href) ? "text-prosa-pink" : "text-zinc-200"
            }`}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
