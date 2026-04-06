import { LoginForm } from "./login-form";

interface AdminLoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-dark-bg pb-24 pt-32">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-zinc-800 bg-dark-surface p-8">
          <h1 className="mb-2 text-3xl">Login Admin</h1>
          <p className="mb-6 text-sm text-zinc-400">Acesso restrito para administracao do blog Prosa Rock.</p>
          <LoginForm errorCode={params.error} />
        </div>
      </div>
    </main>
  );
}
