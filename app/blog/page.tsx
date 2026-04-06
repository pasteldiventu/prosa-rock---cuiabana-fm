import { BlogPostCard } from "@/components/blog-post-card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Post } from "@/lib/types";

export const revalidate = 60;

export default async function BlogPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("posts")
    .select("slug,title,description,guest,published_at,cover_image_url")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const posts = (data ?? []) as Pick<Post, "slug" | "title" | "description" | "guest" | "published_at" | "cover_image_url">[];

  return (
    <main className="min-h-screen bg-dark-bg pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-5xl md:text-6xl">
            BLOG <span className="text-neon-orange">PROSA ROCK</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">Noticias, bastidores, entrevistas e conteudo da cena local.</p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {posts.length > 0 ? (
            posts.map((post) => <BlogPostCard key={post.slug} post={post} />)
          ) : (
            <div className="col-span-full rounded-lg border border-zinc-800 bg-dark-surface p-12 text-center text-zinc-500">
              Nenhum artigo publicado ainda.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
