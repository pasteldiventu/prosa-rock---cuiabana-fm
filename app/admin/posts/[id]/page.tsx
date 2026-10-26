import { MarkdownEditor } from "../markdown-preview";
import { ImageUpload } from "../image-upload";
import { SubmitButton } from "../submit-button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { Post } from "@/lib/types";
import { updatePostAction } from "../actions";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();

  if (!data) {
    notFound();
  }

  const post = data as Post;

  return (
    <main className="min-h-screen bg-black pb-24 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/admin/posts" className="mb-6 inline-flex text-sm uppercase tracking-wider text-zinc-400 hover:text-prosa-pink">
          Voltar ao painel
        </Link>
        <section className="rounded-xl border border-prosa-purple/25 bg-dark-surface p-6">
          <h1 className="mb-5 text-3xl">Editar post</h1>
          <form action={updatePostAction} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input type="hidden" name="id" value={post.id} />

            <input type="hidden" name="slug" defaultValue={post.slug} />

            <div className="space-y-1 md:col-span-2">
              <label className="block text-sm uppercase tracking-wider text-zinc-400">
                Título <span className="text-zinc-600">(obrigatório)</span>
              </label>
              <input required name="title" defaultValue={post.title} className="w-full rounded-md border border-prosa-purple/25 bg-dark-elevated px-4 py-2" />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-sm uppercase tracking-wider text-zinc-400">
                Descrição <span className="text-zinc-600">(obrigatório)</span>
              </label>
              <input
                required
                name="description"
                defaultValue={post.description}
                className="w-full rounded-md border border-prosa-purple/25 bg-dark-elevated px-4 py-2"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm uppercase tracking-wider text-zinc-400">
                Convidado <span className="text-zinc-600">(opcional)</span>
              </label>
              <input name="guest" defaultValue={post.guest ?? ""} className="w-full rounded-md border border-prosa-purple/25 bg-dark-elevated px-4 py-2" />
            </div>

            <ImageUpload name="cover_image_url" defaultUrl={post.cover_image_url} />

            <div className="space-y-1 md:col-span-2">
              <label className="block text-sm uppercase tracking-wider text-zinc-400">
                Conteúdo <span className="text-zinc-600">(obrigatório)</span>
              </label>
              <MarkdownEditor name="content" defaultValue={post.content} />
            </div>

            <div className="space-y-1">
              <label className="block text-sm uppercase tracking-wider text-zinc-400">Status</label>
              <select name="status" defaultValue={post.status} className="w-full rounded-md border border-prosa-purple/25 bg-dark-elevated px-4 py-2">
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
              </select>
            </div>

            <SubmitButton
              pendingText="Salvando..."
              className="rounded-sm bg-prosa-pink px-6 py-2 font-display uppercase tracking-wider text-white transition-colors hover:bg-prosa-hot md:col-span-2 md:justify-self-end"
            >
              Salvar alteracoes
            </SubmitButton>
          </form>
        </section>
      </div>
    </main>
  );
}
