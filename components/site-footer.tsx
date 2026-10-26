import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-prosa-purple/20 bg-dark-surface py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Prosa Rock · Com Cimone Lima</p>
        <div className="flex items-center gap-4">
        </div>
      </div>
    </footer>
  );
}
