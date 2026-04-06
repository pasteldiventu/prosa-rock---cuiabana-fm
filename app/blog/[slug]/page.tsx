import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Post } from "@/lib/types";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
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
        <Link href="/blog" className="mb-8 inline-flex text-sm uppercase tracking-wider text-zinc-400 hover:text-prosa-pink">
          Voltar para o blog
        </Link>
        <header className="mb-10">
          <p className="mb-4 text-sm uppercase tracking-wider text-zinc-500">{dateLabel}</p>
          <h1 className="mb-4 text-4xl md:text-6xl">{post.title}</h1>
          <p className="text-xl text-zinc-400">{post.description}</p>
        </header>
        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mb-12 aspect-video w-full rounded-xl border border-prosa-purple/30 object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="markdown-body text-lg leading-relaxed text-zinc-300">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
