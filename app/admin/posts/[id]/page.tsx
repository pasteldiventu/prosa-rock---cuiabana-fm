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
    <main className="min-h-screen bg-dark-bg pb-24 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/admin/posts" className="mb-6 inline-flex text-sm uppercase tracking-wider text-zinc-400 hover:text-neon-orange">
          Voltar ao painel
        </Link>
        <section className="rounded-xl border border-zinc-800 bg-dark-surface p-6">
          <h1 className="mb-5 text-3xl">Editar post</h1>
          <form action={updatePostAction} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input type="hidden" name="id" value={post.id} />
            <input required name="title" defaultValue={post.title} className="rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2" />
            <input required name="slug" defaultValue={post.slug} className="rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2" />
            <input
              required
              name="description"
              defaultValue={post.description}
              className="rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 md:col-span-2"
            />
            <input name="guest" defaultValue={post.guest ?? ""} className="rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2" />
            <input
              name="cover_image_url"
              defaultValue={post.cover_image_url ?? ""}
              className="rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2"
            />
            <textarea
              required
              name="content"
              defaultValue={post.content}
              rows={10}
              className="rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 md:col-span-2"
            />
            <select name="status" defaultValue={post.status} className="rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2">
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
            <button type="submit" className="rounded-sm bg-neon-orange px-6 py-2 font-display uppercase tracking-wider text-white md:justify-self-end">
              Salvar alteracoes
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
