"use client";
import { useRef } from "react";
import { deletePostAction } from "./actions";

export function DeleteConfirmButton({ postId, postTitle }: { postId: string; postTitle: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleClick() {
    const confirmed = window.confirm(`Tem certeza que quer excluir a postagem "${postTitle}"?`);
    if (confirmed) {
      formRef.current?.requestSubmit();
    }
  }

  return (
    <form ref={formRef} action={deletePostAction}>
      <input type="hidden" name="id" value={postId} />
      <button
        type="button"
        onClick={handleClick}
        className="rounded-sm border border-red-900/70 px-3 py-1.5 text-sm text-red-300 hover:bg-red-950/40"
      >
        Excluir
      </button>
    </form>
  );
}