import { FeaturedPosts } from "@/components/featured-posts";
import { Reveal } from "@/components/reveal";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PostPreview } from "@/lib/types";

export const revalidate = 60;

export default async function BlogPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("posts")
    .select("slug,title,description,guest,published_at,cover_image_url")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const posts = (data ?? []) as PostPreview[];

  return (
    <main className="min-h-screen bg-black pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <header className="mb-12 text-center">
            <p className="mb-2 font-display text-sm tracking-[0.3em] text-prosa-magenta">CUIABANA FM</p>
            <h1 className="mb-4 text-5xl md:text-6xl">
              BLOG <span className="prosa-gradient-text">PROSA ROCK</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">Noticias, bastidores, entrevistas e conteudo da cena local.</p>
          </header>
        </Reveal>

        <FeaturedPosts posts={posts} />
      </div>
    </main>
  );
}
