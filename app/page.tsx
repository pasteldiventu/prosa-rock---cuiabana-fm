import Link from "next/link";
import { Mic2, Music, Radio, Users, Youtube } from "lucide-react";
import { BlogPostCard } from "@/components/blog-post-card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";

export const revalidate = 60;

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@ProsaRockcomCimoneLima";

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("posts")
    .select("slug,title,description,guest,published_at,cover_image_url")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(6);

  const posts = (data ?? []) as Pick<
    Post,
    "slug" | "title" | "description" | "guest" | "published_at" | "cover_image_url"
  >[];

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

      <section id="sobre" className="relative bg-black py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-prosa-purple/50 to-transparent" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl">
              MUITO MAIS QUE <br />
              <span className="text-prosa-magenta">MUSICA</span>
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-zinc-400">
              O Prosa Rock e o seu espaco dedicado a cultura alternativa. Aqui, o rock n' roll e o ponto de partida para conversas profundas,
              historias de bastidores e valorizacao da cena local.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-zinc-400">
              Todos os sabados, Cimone Lima recebe convidados especiais para um bate-papo sem roteiro, onde a musica dita o ritmo da prosa.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-prosa-purple/30 bg-dark-surface p-2 text-prosa-pink">
                  <Mic2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-display">Entrevistas</h4>
                  <p className="text-sm text-zinc-500">Papo reto com artistas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-prosa-purple/30 bg-dark-surface p-2 text-prosa-pink">
                  <Music className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-display">Cena Local</h4>
                  <p className="text-sm text-zinc-500">Espaco para novas bandas</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/guitarra.jpg"
              alt="Studio Equipment"
              className="relative z-10 aspect-square rounded-full border-4 border-prosa-purple/40 object-cover shadow-[0_0_60px_rgba(147,51,234,0.25)]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-prosa-pink/30 blur-xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-prosa-purple/25 blur-xl" />
          </div>
        </div>
      </section>

      <section id="postagens-do-blog" className="border-y border-prosa-purple/20 bg-dark-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.length > 0 ? (
              posts.map((post) => <BlogPostCard key={post.slug} post={post} />)
            ) : (
              <div className="col-span-full rounded-lg border border-prosa-purple/25 bg-dark-elevated p-12 text-center text-zinc-500">
                Nenhum artigo publicado ainda. Volte em breve ou acesse o blog quando houver novidades.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <span className="inline-flex rounded-full border border-red-500/30 bg-red-950/30 p-4 text-red-500">
                <Youtube className="h-10 w-10 md:h-12 md:w-12" aria-hidden />
              </span>
            </div>
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl">
              APOIE A GENTE NO <span className="prosa-gradient-text">YOUTUBE</span> TAMBÉM
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400">
              Trechos, momentos do programa e conteúdo extra: inscreva-se no canal oficial e ative o sininho para não perder nenhum vídeo novo.
            </p>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-sm bg-red-600 px-8 py-4 font-display uppercase tracking-wider text-white transition-all hover:bg-red-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.35)]"
            >
              <Youtube className="h-5 w-5 shrink-0" aria-hidden />
              Canal no YouTube
            </a>
            <p className="mt-6 text-sm text-zinc-600">
              <span className="text-zinc-500">@ProsaRockcomCimoneLima</span>
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-prosa-purple/20 bg-dark-surface py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-prosa-purple/30 bg-gradient-to-br from-dark-elevated/90 to-dark-surface p-8 backdrop-blur-sm md:p-12">
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="h-48 w-48 shrink-0 overflow-hidden rounded-full border-4 border-prosa-pink/40 shadow-[0_0_40px_rgba(255,60,172,0.2)] md:h-64 md:w-64">
                <img
                  src="cimone-lima.jpg"
                  alt="Cimone Lima"
                  className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-prosa-pink/30 bg-prosa-purple/15 px-3 py-1 text-prosa-magenta">
                  <Radio className="h-4 w-4 text-prosa-pink" />
                  <span className="text-xs uppercase tracking-wider">Apresentadora</span>
                </div>
                <h2 className="mb-4 text-3xl md:text-4xl">CIMONE LIMA</h2>
                <p className="mb-6 text-lg leading-relaxed text-zinc-400">
                  Com mais de 15 anos de experiencia no radio mato-grossense, Cimone respira musica. Sua paixao pelo rock e pela cultura alternativa
                  levou a criacao do Prosa Rock.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-2 text-sm uppercase tracking-wider text-zinc-500">
                    <Users className="h-4 w-4 text-prosa-pink" />
                    +500 Entrevistas
                  </span>
                  <span className="flex items-center gap-2 text-sm uppercase tracking-wider text-zinc-500">
                    <Mic2 className="h-4 w-4 text-prosa-pink" />
                    10 Anos no Ar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
