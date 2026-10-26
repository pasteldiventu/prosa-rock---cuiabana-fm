import { NewPostForm } from "./new-post-form";
import { ChangePasswordForm } from "./change-password-form";
import { DeleteConfirmButton } from "./delete-confirm-button";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { Post } from "@/lib/types";
import { signOutAction } from "./actions";

export default async function AdminPostsPage() {
  const { supabase, user, role } = await requireAdmin();
  const { data } = await supabase.from("posts").select("*").order("updated_at", { ascending: false });
  const posts = (data ?? []) as Post[];

  return (
    <main className="min-h-screen bg-black pb-24 pt-32">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-xl border border-prosa-purple/25 bg-dark-surface p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl">Painel Admin</h1>
            <p className="text-sm text-zinc-400">
              Logado como {user.email} ({role})
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ChangePasswordForm />
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-sm border border-prosa-purple/40 bg-dark-elevated px-4 py-2 text-sm uppercase tracking-wider text-zinc-300 hover:border-prosa-pink/40"
              >
                Sair
              </button>
            </form>
          </div>
        </header>

        <section className="rounded-xl border border-prosa-purple/25 bg-dark-surface p-6">
          <h2 className="mb-5 text-2xl">Novo post</h2>
          <NewPostForm />
        </section>

        <section className="rounded-xl border border-prosa-purple/25 bg-dark-surface p-6">
          <h2 className="mb-5 text-2xl">Posts existentes</h2>
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-3 rounded-md border border-prosa-purple/20 bg-dark-elevated/80 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">{post.status}</p>
                  <p className="font-medium text-white">{post.title}</p>
                  <p className="text-sm text-zinc-400">/{post.slug}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/blog/${post.slug}`} className="text-sm text-zinc-400 hover:text-prosa-pink">
                    Ver publico
                  </Link>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="rounded-sm border border-prosa-purple/35 px-3 py-1.5 text-sm text-zinc-300 hover:border-prosa-pink/50 hover:text-prosa-magenta"
                  >
                    Editar
                  </Link>
                  <DeleteConfirmButton postId={post.id} postTitle={post.title} />
                </div>
              </div>
            ))}
            {posts.length === 0 && <p className="text-zinc-500">Nenhum post cadastrado.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
