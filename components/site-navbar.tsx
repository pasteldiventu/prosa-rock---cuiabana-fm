import Link from "next/link";
import { Radio } from "lucide-react";

export function SiteNavbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-prosa-purple/20 bg-dark-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="rounded-full bg-prosa-purple/15 p-2 transition-colors group-hover:bg-prosa-pink/20 prosa-glow-soft">
            <Radio className="h-6 w-6 text-prosa-pink" />
          </div>
          <span className="font-display text-2xl tracking-wider text-white">
            PROSA ROCK<span className="prosa-gradient-text"></span>{" "}
            <span className="text-prosa-magenta">Com Cimone Lima</span>
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm uppercase tracking-wider">
          <Link href="/#sobre" className="text-zinc-400 transition-colors hover:text-prosa-pink">
            Sobre
          </Link>
          <Link href="/#episodios" className="text-zinc-400 transition-colors hover:text-prosa-pink">
            Episodios
          </Link>
          <Link href="/blog" className="text-zinc-400 transition-colors hover:text-prosa-pink">
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}
