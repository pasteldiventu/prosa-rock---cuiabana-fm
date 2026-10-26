"use client";

import { useState } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const MIN_LENGTH = 6;

export function ChangePasswordForm() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function reset() {
    setPassword("");
    setConfirm("");
    setError("");
    setSuccess("");
    setShowPassword(false);
    setShowConfirm(false);
  }

  function close() {
    setOpen(false);
    reset();
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < MIN_LENGTH) {
      setError(`A senha deve ter pelo menos ${MIN_LENGTH} caracteres.`);
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(`Não foi possível alterar a senha. ${updateError.message}`);
      return;
    }

    setSuccess("Senha alterada com sucesso!");
    setPassword("");
    setConfirm("");
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        className="inline-flex items-center gap-2 rounded-sm border border-prosa-purple/40 bg-dark-elevated px-4 py-2 text-sm uppercase tracking-wider text-zinc-300 hover:border-prosa-pink/40"
      >
        <KeyRound className="h-4 w-4" />
        Mudar senha
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded-lg border border-prosa-purple/30 bg-dark-surface p-5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-sm font-display uppercase tracking-wider text-white">Nova senha</p>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nova senha"
                className="w-full rounded-md border border-prosa-purple/25 bg-dark-elevated px-4 py-2 pr-10 text-sm text-white focus:border-prosa-pink focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400 hover:text-prosa-pink"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirmar nova senha"
                className="w-full rounded-md border border-prosa-purple/25 bg-dark-elevated px-4 py-2 pr-10 text-sm text-white focus:border-prosa-pink focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400 hover:text-prosa-pink"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}
            {success && <p className="text-xs text-green-400">{success}</p>}

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-sm bg-prosa-pink px-4 py-2 text-sm font-display uppercase tracking-wider text-white transition-colors hover:bg-prosa-hot disabled:opacity-60"
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
              <button
                type="button"
                onClick={close}
                className="rounded-sm border border-prosa-purple/40 px-4 py-2 text-sm uppercase tracking-wider text-zinc-300 hover:border-prosa-pink/40"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
