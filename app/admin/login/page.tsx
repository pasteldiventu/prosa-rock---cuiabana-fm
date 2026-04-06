import { LoginForm } from "./login-form";

interface AdminLoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-black pb-24 pt-32">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-prosa-purple/30 bg-dark-surface p-8 shadow-[0_0_40px_rgba(147,51,234,0.08)]">
          <h1 className="mb-2 text-3xl">Login Admin</h1>
          <p className="mb-6 text-sm text-zinc-400">Acesso restrito para administracao do blog Prosa Rock.</p>
          <LoginForm errorCode={params.error} />
        </div>
      </div>
    </main>
  );
}
