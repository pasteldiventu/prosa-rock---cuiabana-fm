"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

interface LoginFormProps {
  errorCode?: string;
}

export function LoginForm({ errorCode }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Falha no login. Verifique email e senha.");
      return;
    }

    router.push("/admin/posts");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorCode === "sem_permissao" && (
        <p className="rounded-md border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
          Sua conta nao possui permissao de administrador.
        </p>
      )}
      {error && <p className="rounded-md border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">{error}</p>}
      <div>
        <label className="mb-1 block text-sm text-zinc-400">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-prosa-purple/25 bg-dark-elevated px-4 py-2 text-white focus:border-prosa-pink focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-zinc-400">Senha</label>
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-md border border-prosa-purple/25 bg-dark-elevated px-4 py-2 text-white focus:border-prosa-pink focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-sm bg-prosa-pink px-6 py-3 font-display uppercase tracking-wider text-white transition-all hover:bg-prosa-hot prosa-glow-pink disabled:opacity-60"
      >
        {loading ? "Entrando..." : "Entrar no painel"}
      </button>
    </form>
  );
}
