import Link from "next/link";
import { Mic2, Music, Radio, Users } from "lucide-react";
import { EpisodeCard } from "@/components/episode-card";
import { episodes } from "@/lib/episodes";

export default function HomePage() {
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
              href="#episodios"
              className="rounded-sm border border-prosa-purple/50 bg-dark-surface/80 px-8 py-4 text-center font-display uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:border-prosa-pink/60 hover:bg-dark-elevated/90"
            >
              Ultimos Episodios
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
              src="https://images.unsplash.com/photo-1516280440502-65f536f9770b?auto=format&fit=crop&q=80&w=800"
              alt="Studio Equipment"
              className="relative z-10 aspect-square rounded-full border-4 border-prosa-purple/40 object-cover shadow-[0_0_60px_rgba(147,51,234,0.25)]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-prosa-pink/30 blur-xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-prosa-purple/25 blur-xl" />
          </div>
        </div>
      </section>

      <section id="episodios" className="border-y border-prosa-purple/20 bg-dark-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-3 text-4xl font-bold">
                ULTIMOS <span className="text-prosa-pink">EPISODIOS</span>
              </h2>
              <p className="max-w-2xl text-zinc-400">Perdeu o programa ao vivo? Nao se preocupe. Ouça os episodios recentes quando e onde quiser.</p>
            </div>
            <Link
              href="/blog"
              className="whitespace-nowrap rounded-sm border border-prosa-purple/40 bg-dark-elevated px-6 py-3 font-display uppercase tracking-wider text-white transition-all hover:border-prosa-pink/50 hover:shadow-[0_0_40px_rgba(232,121,249,0.15)]"
            >
              Ver Blog
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl">
              APOIE A <span className="prosa-gradient-text">CENA LOCAL</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              O Mato Grosso respira rock. Conheca algumas das bandas que estao fazendo barulho na nossa regiao.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {[
              { name: "Macaco Bong", img: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&q=80&w=400" },
              { name: "Vanguart", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400" },
              { name: "Strauss", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5294b?auto=format&fit=crop&q=80&w=400" },
              { name: "Lopes", img: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&q=80&w=400" },
            ].map((band) => (
              <div
                key={band.name}
                className="group relative aspect-square overflow-hidden rounded-lg border border-prosa-purple/25 bg-dark-surface"
              >
                <img
                  src={band.img}
                  alt={band.name}
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-prosa-purple/20 opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h3 className="text-center text-xl font-bold text-white">{band.name}</h3>
                </div>
              </div>
            ))}
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
                  levou a criação do Prosa Rock.
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
