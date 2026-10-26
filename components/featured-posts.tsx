import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { GuestBadge } from "@/components/guest-badge";
import { Reveal } from "@/components/reveal";
import type { PostPreview } from "@/lib/types";

function formatDate(value: string | null) {
  return value
    ? new Date(value).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : "Sem data";
}

const SIDE_COUNT = 4;

function SidePostCard({ post }: { post: PostPreview }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full gap-4 rounded-xl border border-prosa-purple/20 bg-dark-elevated/60 p-4 transition-all hover:border-prosa-pink/35 hover:bg-dark-elevated"
    >
      {post.cover_image_url && (
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="h-20 w-20 shrink-0 rounded-lg object-cover sm:h-24 sm:w-24"
          referrerPolicy="no-referrer"
        />
      )}
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-zinc-500">
          <Calendar className="h-3 w-3 text-prosa-pink" />
          {formatDate(post.published_at)}
        </span>
        <h4 className="truncate font-display text-lg text-white transition-colors group-hover:text-prosa-magenta">
          {post.title}
        </h4>
        {post.guest && (
          <span className="text-xs text-zinc-400">
            <span className="text-prosa-magenta">Convidados(as):</span> {post.guest}
          </span>
        )}
        <p className="line-clamp-1 text-sm text-zinc-500">{post.description}</p>
      </div>
    </Link>
  );
}

interface FeaturedPostsProps {
  posts: PostPreview[];
  maxRest?: number;
  moreHref?: string;
  overflowBelow?: boolean;
}

export function FeaturedPosts({ posts, maxRest, moreHref, overflowBelow }: FeaturedPostsProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-prosa-purple/25 bg-dark-elevated p-12 text-center text-zinc-500">
        Nenhum artigo publicado ainda. Volte em breve ou acesse o blog quando houver novidades.
      </div>
    );
  }

  const [featured, ...allRest] = posts;
  const side = overflowBelow
    ? allRest.slice(0, SIDE_COUNT)
    : typeof maxRest === "number"
      ? allRest.slice(0, maxRest)
      : allRest;
  const below = overflowBelow ? allRest.slice(SIDE_COUNT) : [];

  return (
    <div className="space-y-8">
      <div className={`grid grid-cols-1 gap-8 lg:grid-cols-2 ${overflowBelow ? "lg:items-start" : ""}`}>
        <Reveal direction="left" className={`prosa-animated-border ${overflowBelow ? "" : "h-full"}`}>
          <Link
            href={`/blog/${featured.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-[calc(1rem-2px)] bg-dark-elevated transition-all hover:shadow-[0_0_50px_rgba(232,121,249,0.12)]"
          >
            {featured.cover_image_url && (
              <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-black/30">
                <img
                  src={featured.cover_image_url}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute left-4 top-4 rounded-full bg-prosa-pink px-3 py-1 text-xs font-display uppercase tracking-wider text-white">
                  Último post
                </span>
              </div>
            )}
            <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-prosa-pink" />
                  {formatDate(featured.published_at)}
                </span>
                <GuestBadge guest={featured.guest} />
              </div>
              <h3 className="font-display text-3xl leading-tight text-white md:text-4xl">{featured.title}</h3>
              <p className="line-clamp-5 text-zinc-400 md:text-lg">{featured.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-2 font-display text-sm uppercase tracking-wider text-prosa-pink">
                Ler artigo completo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>

        <div className="flex flex-col gap-4">
          {side.length === 0 && !moreHref && (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-prosa-purple/25 p-8 text-center text-zinc-600">
              Os próximos posts aparecerão aqui.
            </div>
          )}
          {side.map((post, index) => (
            <Reveal key={post.slug} direction="right" delay={index * 0.08}>
              <SidePostCard post={post} />
            </Reveal>
          ))}
          {moreHref && (
            <Reveal direction="right" delay={side.length * 0.08}>
              <Link
                href={moreHref}
                className="group flex items-center justify-center gap-2 rounded-xl border border-prosa-pink/30 bg-prosa-purple/10 p-5 text-center font-display text-sm uppercase tracking-wider text-prosa-pink transition-all hover:border-prosa-pink/60 hover:bg-prosa-purple/20 hover:shadow-[0_0_30px_rgba(255,60,172,0.15)]"
              >
                Confira outros posts!
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          )}
        </div>
      </div>

      {below.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {below.map((post, index) => (
            <Reveal key={post.slug} direction="up" delay={(index % 3) * 0.08}>
              <SidePostCard post={post} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
