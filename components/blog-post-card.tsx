import Link from "next/link";
import { Calendar, User } from "lucide-react";
import type { Post } from "@/lib/types";

interface BlogPostCardProps {
  post: Pick<Post, "slug" | "title" | "description" | "guest" | "published_at" | "cover_image_url">;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const dateLabel = post.published_at
    ? new Date(post.published_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Sem data";

  return (
    <article className="overflow-hidden rounded-lg border border-prosa-purple/25 bg-dark-elevated transition-all hover:border-prosa-pink/35 hover:shadow-[0_0_28px_rgba(232,121,249,0.08)]">
      {post.cover_image_url && (
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="aspect-video w-full object-cover"
          referrerPolicy="no-referrer"
        />
      )}
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-wider text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-prosa-pink" />
            {dateLabel}
          </span>
          {post.guest && (
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-prosa-pink" />
              {post.guest}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-display text-white">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-prosa-magenta">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-zinc-400">{post.description}</p>
      </div>
    </article>
  );
}
