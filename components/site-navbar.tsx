"use client";
import { useState } from "react";
import Link from "next/link";
import { Radio, Menu, X } from "lucide-react";

export function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
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
          <Link href="/#sobre" className="text-zinc-400 transition-colors hover:text-prosa-pink">Sobre</Link>
          <Link href="/#episodios" className="text-zinc-400 transition-colors hover:text-prosa-pink">Episodios</Link>
          <Link href="/blog" className="text-zinc-400 transition-colors hover:text-prosa-pink">Blog</Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-zinc-400 hover:text-prosa-pink p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-prosa-purple/20 bg-dark-bg/95 px-4 py-4 flex flex-col gap-4 text-sm uppercase tracking-wider">
          <Link href="/#sobre" className="text-zinc-400 hover:text-prosa-pink" onClick={() => setOpen(false)}>Sobre</Link>
          <Link href="/#episodios" className="text-zinc-400 hover:text-prosa-pink" onClick={() => setOpen(false)}>Episodios</Link>
          <Link href="/blog" className="text-zinc-400 hover:text-prosa-pink" onClick={() => setOpen(false)}>Blog</Link>
        </div>
      )}
    </nav>
  );
}