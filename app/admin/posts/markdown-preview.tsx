"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export function MarkdownEditor({ name, defaultValue }: { name: string; defaultValue?: string }) {
  const [content, setContent] = useState(defaultValue ?? "");
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  return (
    <div className="md:col-span-2 space-y-2">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTab("edit")}
          className={`px-4 py-1.5 text-sm uppercase tracking-wider rounded-sm border transition-colors ${
            tab === "edit"
              ? "border-prosa-pink/60 text-prosa-pink bg-dark-elevated"
              : "border-prosa-purple/30 text-zinc-400 hover:text-white"
          }`}
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={`px-4 py-1.5 text-sm uppercase tracking-wider rounded-sm border transition-colors ${
            tab === "preview"
              ? "border-prosa-pink/60 text-prosa-pink bg-dark-elevated"
              : "border-prosa-purple/30 text-zinc-400 hover:text-white"
          }`}
        >
          Prévia
        </button>
      </div>

      {tab === "edit" ? (
        <textarea
          name={name}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          placeholder="Conteudo em Markdown"
          className="w-full rounded-md border border-prosa-purple/25 bg-dark-elevated px-4 py-2"
        />
      ) : (
        <>
          {/* campo hidden pro form quando está na aba preview */}
          <input type="hidden" name={name} value={content} />
          <div className="markdown-body min-h-[200px] w-full rounded-md border border-prosa-purple/25 bg-dark-elevated px-4 py-3 text-zinc-300">
            {content ? (
              <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
              <p className="text-zinc-500 italic">Nenhum conteúdo para exibir.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}