import Link from "next/link";
import { Radio } from "lucide-react";

export function SiteNavbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-dark-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="rounded-full bg-neon-orange/10 p-2 transition-colors group-hover:bg-neon-orange/20">
            <Radio className="h-6 w-6 text-neon-orange" />
          </div>
          <span className="font-display text-2xl font-bold tracking-wider text-white">
            PROSA <span className="text-neon-orange">ROCK</span>
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm uppercase tracking-wider">
          <Link href="/#sobre" className="text-zinc-400 transition-colors hover:text-neon-orange">
            Sobre
          </Link>
          <Link href="/#episodios" className="text-zinc-400 transition-colors hover:text-neon-orange">
            Episodios
          </Link>
          <Link href="/blog" className="text-zinc-400 transition-colors hover:text-neon-orange">
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}
