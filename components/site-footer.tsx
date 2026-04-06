import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-prosa-purple/20 bg-dark-surface py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Prosa Rock · Cuiabana FM 105.1 · Com Cimone Lima</p>
        <div className="flex items-center gap-4">
          <Link href="/blog" className="transition-colors hover:text-prosa-pink">
            Blog
          </Link>
          <Link href="/admin/posts" className="transition-colors hover:text-prosa-purple">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
