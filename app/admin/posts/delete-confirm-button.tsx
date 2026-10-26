"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { deletePostAction } from "./actions";

function ConfirmButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-sm border border-red-700 bg-red-950/50 px-3 py-1.5 text-sm text-red-200 hover:bg-red-900/60 disabled:opacity-60"
    >
      {pending ? "Excluindo..." : "Confirmar"}
    </button>
  );
}

export function DeleteConfirmButton({ postId, postTitle }: { postId: string; postTitle: string }) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-sm border border-red-900/70 px-3 py-1.5 text-sm text-red-300 hover:bg-red-950/40"
      >
        Excluir
      </button>
    );
  }

  return (
    <form action={deletePostAction} className="flex flex-wrap items-center gap-2" title={postTitle}>
      <input type="hidden" name="id" value={postId} />
      <span className="text-xs uppercase tracking-wider text-zinc-400">Excluir?</span>
      <ConfirmButton />
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="rounded-sm border border-prosa-purple/40 px-3 py-1.5 text-sm text-zinc-300 hover:border-prosa-pink/40"
      >
        Cancelar
      </button>
    </form>
  );
}
