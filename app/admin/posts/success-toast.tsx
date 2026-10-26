"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CheckCircle2, ArrowUpRight } from "lucide-react";

const DISMISS_MS = 6000;
const FADE_MS = 400;

export function SuccessToast({ message, viewHref }: { message: string; viewHref?: string }) {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function startDismiss() {
    clearTimers();
    setLeaving(false);
    timers.current.push(setTimeout(() => setLeaving(true), DISMISS_MS));
    timers.current.push(setTimeout(() => setGone(true), DISMISS_MS + FADE_MS));
  }

  useEffect(() => {
    setMounted(true);
    // Limpa o parametro da URL (sem recarregar) pra o toast nao reaparecer num refresh.
    window.history.replaceState(null, "", "/admin/posts");
    startDismiss();
    return clearTimers;
  }, []);

  if (gone || !mounted) return null;

  const className = `fixed bottom-6 right-6 z-[100] flex items-center gap-4 rounded-lg border border-green-600/50 bg-green-950/90 px-5 py-3 text-sm text-green-200 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-opacity duration-300 ${
    leaving ? "opacity-0" : "opacity-100"
  } ${viewHref ? "cursor-pointer hover:bg-green-900/95" : ""}`;

  const content = (
    <>
      <span className="flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
        {message}
      </span>
      {viewHref && (
        <span className="inline-flex items-center gap-1 whitespace-nowrap font-display text-xs uppercase tracking-wider text-green-100">
          Ver post
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      )}
    </>
  );

  // Portal no body: escapa de ancestrais com transform (ex: a animacao de pagina),
  // garantindo que o fixed siga a viewport onde quer que o usuario esteja olhando.
  return createPortal(
    viewHref ? (
      <Link href={viewHref} onMouseEnter={clearTimers} onMouseLeave={startDismiss} className={className} role="status">
        {content}
      </Link>
    ) : (
      <div onMouseEnter={clearTimers} onMouseLeave={startDismiss} className={className} role="status">
        {content}
      </div>
    ),
    document.body
  );
}
