import type { Metadata } from "next";
import { Instagram, Mic2, Music, Radio, Users, Youtube } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Apresentadora — Prosa Rock",
  description:
    "Conheça Cimone Lima, apresentadora do Prosa Rock, e o programa: rock, entrevistas e valorização da cena local. Acompanhe nas redes sociais.",
};

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/channel/UCuGs-zkWyi4YoSEPtJelNAw";
const INSTAGRAM_URL = "https://www.instagram.com/prosarock/";

export default function ApresentadoraPage() {
  return (
    <main className="min-h-screen bg-black pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <header className="mb-16 text-center">
            <p className="mb-2 font-display text-sm tracking-[0.3em] text-prosa-magenta">PROSA ROCK</p>
            <h1 className="text-5xl md:text-6xl">
              A <span className="prosa-gradient-text">APRESENTADORA</span>
            </h1>
          </header>
        </Reveal>

        <Reveal direction="up">
          <section className="relative overflow-hidden rounded-2xl border border-prosa-purple/30 bg-gradient-to-br from-dark-elevated/90 to-dark-surface p-8 backdrop-blur-sm md:p-12">
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="h-48 w-48 shrink-0 overflow-hidden rounded-full border-4 border-prosa-pink/40 shadow-[0_0_40px_rgba(255,60,172,0.2)] md:h-64 md:w-64">
                <img src="/cimone-lima.jpg" alt="Cimone Lima" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
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
          </section>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <section className="mt-12 rounded-2xl border border-prosa-purple/30 bg-dark-surface p-8 md:p-12">
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl">
              MUITO MAIS QUE <span className="text-prosa-magenta">MUSICA</span>
            </h2>
            <p className="mb-6 max-w-3xl text-lg leading-relaxed text-zinc-400">
              O Prosa Rock e o seu espaco dedicado a cultura alternativa. Aqui, o rock n' roll e o ponto de partida para conversas profundas,
              historias de bastidores e valorizacao da cena local.
            </p>
            <p className="mb-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
              Todos os sabados, Cimone Lima recebe convidados especiais para um bate-papo sem roteiro, onde a musica dita o ritmo da prosa.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-prosa-purple/30 bg-dark-elevated p-2 text-prosa-pink">
                  <Mic2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-display">Entrevistas</h4>
                  <p className="text-sm text-zinc-500">Papo reto com artistas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-prosa-purple/30 bg-dark-elevated p-2 text-prosa-pink">
                  <Music className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-display">Cena Local</h4>
                  <p className="text-sm text-zinc-500">Espaco para novas bandas</p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal direction="up" delay={0.15}>
          <section className="relative mt-12 overflow-hidden rounded-2xl border border-red-500/20 bg-dark-surface py-16">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[100px]" />
            <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
              <div className="mb-6 flex justify-center">
                <span className="inline-flex rounded-full border border-red-500/30 bg-red-950/30 p-4 text-red-500">
                  <Youtube className="h-10 w-10 md:h-12 md:w-12" aria-hidden />
                </span>
              </div>
              <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl">
                APOIE A GENTE NAS <span className="prosa-gradient-text">REDES SOCIAIS</span> TAMBÉM
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400">
                Trechos, momentos do programa e conteúdo extra: inscreva-se no canal oficial e siga a gente para não perder nenhuma novidade.
              </p>
              <div className="flex flex-col items-center gap-4">
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full max-w-xs items-center justify-center gap-3 whitespace-nowrap rounded-sm bg-red-600 px-5 py-4 text-sm font-display uppercase tracking-wider text-white transition-all hover:bg-red-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.35)] sm:px-8 sm:text-base"
                >
                  <Youtube className="h-5 w-5 shrink-0" aria-hidden />
                  Canal no YouTube
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full max-w-xs items-center justify-center gap-3 whitespace-nowrap rounded-sm bg-gradient-to-r from-prosa-magenta via-prosa-pink to-prosa-hot px-5 py-4 text-sm font-display uppercase tracking-wider text-white transition-all hover:shadow-[0_0_40px_rgba(232,121,249,0.35)] sm:px-8 sm:text-base"
                >
                  <Instagram className="h-5 w-5 shrink-0" aria-hidden />
                  Siga no Instagram
                </a>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
