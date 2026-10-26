"use client";

import { useState } from "react";
import { MarkdownEditor } from "./markdown-preview";
import { ImageUpload } from "./image-upload";
import { SubmitButton } from "./submit-button";
import { createPostAction } from "./actions";

type FieldErrors = {
  title?: string;
  description?: string;
  content?: string;
};

export function NewPostForm() {
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const next: FieldErrors = {};

    if (!String(formData.get("title") ?? "").trim()) {
      next.title = "Informe o título do post.";
    }
    if (!String(formData.get("description") ?? "").trim()) {
      next.description = "Informe a descrição do post.";
    }
    if (!String(formData.get("content") ?? "").trim()) {
      next.content = "Escreva o conteúdo do post.";
    }

    if (Object.keys(next).length > 0) {
      event.preventDefault();
      setErrors(next);
      return;
    }

    setErrors({});
  }

  const inputClass = (hasError: boolean) =>
    `rounded-md border bg-dark-elevated px-4 py-2 ${hasError ? "border-red-500/70" : "border-prosa-purple/25"}`;

  return (
    <form noValidate action={createPostAction} onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="space-y-1 md:col-span-2">
        <label className="block text-sm uppercase tracking-wider text-zinc-400">
          Título <span className="text-zinc-600">(obrigatório)</span>
        </label>
        <input name="title" placeholder="Titulo" className={`${inputClass(!!errors.title)} w-full`} />
        {errors.title && <p className="text-xs text-red-400">{errors.title}</p>}
      </div>

      <div className="space-y-1 md:col-span-2">
        <label className="block text-sm uppercase tracking-wider text-zinc-400">
          Descrição <span className="text-zinc-600">(obrigatório)</span>
        </label>
        <input name="description" placeholder="Descricao" className={`${inputClass(!!errors.description)} w-full`} />
        {errors.description && <p className="text-xs text-red-400">{errors.description}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm uppercase tracking-wider text-zinc-400">
          Convidado <span className="text-zinc-600">(opcional)</span>
        </label>
        <input name="guest" placeholder="Convidado" className="w-full rounded-md border border-prosa-purple/25 bg-dark-elevated px-4 py-2" />
      </div>

      <ImageUpload name="cover_image_url" />

      <div className="md:col-span-2 space-y-1">
        <label className="block text-sm uppercase tracking-wider text-zinc-400">
          Conteúdo <span className="text-zinc-600">(obrigatório)</span>
        </label>
        <MarkdownEditor name="content" />
        {errors.content && <p className="text-xs text-red-400">{errors.content}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm uppercase tracking-wider text-zinc-400">Status</label>
        <select name="status" defaultValue="draft" className="w-full rounded-md border border-prosa-purple/25 bg-dark-elevated px-4 py-2">
          <option value="draft">Rascunho</option>
          <option value="published">Publicar agora</option>
        </select>
      </div>

      <SubmitButton
        pendingText="Salvando..."
        className="rounded-sm bg-prosa-pink px-6 py-2 font-display uppercase tracking-wider text-white transition-colors hover:bg-prosa-hot md:justify-self-end"
      >
        Salvar post
      </SubmitButton>
    </form>
  );
}
