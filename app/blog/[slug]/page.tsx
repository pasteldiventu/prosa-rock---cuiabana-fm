import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { GuestBadge } from "@/components/guest-badge";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Post } from "@/lib/types";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug: rawSlug } = await params;
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    slug = rawSlug;
  }
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!data) {
    notFound();
  }

  const post = data as Post;
  const dateLabel = post.published_at
    ? new Date(post.published_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Sem data";

  return (
    <main className="min-h-screen bg-black pb-24 pt-32">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 rounded-sm border border-prosa-purple/40 bg-dark-elevated px-5 py-2.5 text-sm font-display uppercase tracking-wider text-white transition-all hover:border-prosa-pink/60 hover:bg-dark-surface hover:shadow-[0_0_30px_rgba(232,121,249,0.15)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o blog
        </Link>
        <header className="mb-10">
          <p className="mb-4 text-sm uppercase tracking-wider text-zinc-500">{dateLabel}</p>
          <h1 className="mb-4 text-4xl md:text-6xl">{post.title}</h1>
          <p className="mb-4 text-xl text-zinc-400">{post.description}</p>
          <GuestBadge guest={post.guest} />
        </header>
        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mb-12 max-h-[70vh] w-full rounded-xl border border-prosa-purple/30 bg-black/30 object-contain"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="markdown-body text-lg leading-relaxed text-zinc-300">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        <div className="mt-16 flex justify-center border-t border-prosa-purple/20 pt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-sm border border-prosa-purple/40 bg-dark-elevated px-5 py-2.5 text-sm font-display uppercase tracking-wider text-white transition-all hover:border-prosa-pink/60 hover:bg-dark-surface hover:shadow-[0_0_30px_rgba(232,121,249,0.15)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o blog
          </Link>
        </div>
      </article>
    </main>
  );
}
