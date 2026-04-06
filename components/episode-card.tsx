import { Calendar, Clock } from "lucide-react";
import { Episode } from "@/lib/episodes";

interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const formattedDate = new Date(episode.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="overflow-hidden rounded-lg border border-prosa-purple/25 bg-dark-elevated transition-shadow hover:shadow-[0_0_30px_rgba(147,51,234,0.12)]">
      <img src={episode.imageUrl} alt={episode.title} className="aspect-video w-full object-cover" referrerPolicy="no-referrer" />
      <div className="space-y-3 p-5">
        <div className="flex items-center gap-4 text-xs uppercase tracking-wider text-zinc-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-prosa-pink" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-prosa-pink" />
            {episode.duration}
          </span>
        </div>
        <h3 className="line-clamp-2 font-display text-xl text-white">{episode.title}</h3>
      </div>
    </div>
  );
}
