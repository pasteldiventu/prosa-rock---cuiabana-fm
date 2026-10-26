import { User } from "lucide-react";

interface GuestBadgeProps {
  guest: string | null;
  className?: string;
}

export function GuestBadge({ guest, className }: GuestBadgeProps) {
  if (!guest) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-prosa-pink/30 bg-prosa-purple/15 px-3 py-1 text-xs uppercase tracking-wider ${className ?? ""}`}
    >
      <User className="h-3.5 w-3.5 text-prosa-pink" />
      <span className="text-prosa-magenta">Convidados(as):</span>
      <span className="text-zinc-200">{guest}</span>
    </span>
  );
}
