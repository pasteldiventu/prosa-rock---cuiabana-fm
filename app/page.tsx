import Link from "next/link";
import { FeaturedPosts } from "@/components/featured-posts";
import { Reveal } from "@/components/reveal";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PostPreview } from "@/lib/types";

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("posts")
    .select("slug,title,description,guest,published_at,cover_image_url")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(5);

  const posts = (data ?? []) as PostPreview[];

  return (
    <main>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src="/ref.png"
            alt="Prosa Rock"
            className="h-full w-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-prosa-cyan/15 via-dark-bg/15 to-prosa-deep/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-prosa-purple/30" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 font-display text-sm tracking-[0.35em] text-prosa-magenta md:text-base">DIRETAMENTE DE CUIABÁ</p>
          <h1 className="mb-6 text-4xl font-bold leading-[0.95] sm:text-5xl md:text-7xl lg:text-8xl">
            A SUA DOSE <br />
            <span className="prosa-gradient-text">SEMANAL DE ROCK</span>
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-zinc-300 md:text-xl">
            Entrevistas exclusivas, bandas locais e muita prosa com Cimone Lima.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/blog"
              className="rounded-sm bg-prosa-pink px-8 py-4 text-center font-display uppercase tracking-wider text-white transition-all hover:bg-prosa-hot prosa-glow-pink"
            >
              Acompanhar Blog
            </Link>
            <a
              href="#postagens-do-blog"
              className="rounded-sm border border-prosa-purple/50 bg-dark-surface/80 px-8 py-4 text-center font-display uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:border-prosa-pink/60 hover:bg-dark-elevated/90"
            >
              Últimas postagens do Blog
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 h-1/2 w-1/2 rounded-full bg-prosa-purple/20 blur-[120px]" />
        <div className="pointer-events-none absolute left-0 top-1/3 h-1/3 w-1/3 rounded-full bg-prosa-cyan/10 blur-[100px]" />
      </section>

      <section id="postagens-do-blog" className="border-y border-prosa-purple/20 bg-dark-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="mb-3 text-4xl font-bold">
                  ÚLTIMAS <span className="text-prosa-pink">POSTAGENS DO BLOG</span>
                </h2>
                <p className="max-w-2xl text-zinc-400">
                  Bastidores, notícias e conteúdo escrito para quem acompanha o Prosa Rock além das ondas do rádio.
                </p>
              </div>
              <Link
                href="/blog"
                className="whitespace-nowrap rounded-sm border border-prosa-purple/40 bg-dark-elevated px-6 py-3 font-display uppercase tracking-wider text-white transition-all hover:border-prosa-pink/50 hover:shadow-[0_0_40px_rgba(232,121,249,0.15)]"
              >
                Ver Blog
              </Link>
            </div>
          </Reveal>
          <FeaturedPosts posts={posts} maxRest={4} moreHref="/blog" />
        </div>
      </section>
    </main>
  );
}
