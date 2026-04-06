# Prosa Rock - Com Cimone Lima

Blog oficial e landing page do programa **Prosa Rock** com:
- leitura publica de conteudo sem login;
- area administrativa para criar/editar posts;
- persistencia compartilhada em banco via Supabase.

## Stack

- Next.js (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Supabase (Auth + Postgres + RLS)
- React Markdown

## Arquitetura de acesso

- **Visitante:** acessa `/` e `/blog` sem autenticacao.
- **Admin:** faz login em `/admin/login` com email e senha.
- **Autorizacao:** tabela `profiles` com role (`admin` ou `editor`) + politicas RLS.
- **Publicacao:** conteudo salvo em `posts` e servido para todos.

## Rotas principais

- `/` - landing page do programa
- `/blog` - lista publica de posts publicados
- `/blog/[slug]` - pagina publica de artigo
- `/admin/login` - login administrativo
- `/admin/posts` - painel com criacao e listagem
- `/admin/posts/[id]` - edicao de post

## Banco (Supabase)

Arquivos em `supabase/`:
- `schema.sql` - tabelas, triggers e politicas RLS
- `seed.sql` - posts iniciais para carga de conteudo

Tabelas principais:
- `profiles` - roles por usuario autenticado
- `posts` - artigos do blog (`draft` ou `published`)

## Setup local

### 1) Instalar dependencias

```bash
npm install
```

### 2) Configurar variaveis

Copie `.env.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 3) Criar schema e seed no Supabase

1. Rode `supabase/schema.sql` no SQL Editor.
2. Rode `supabase/seed.sql` para inserir posts iniciais.
3. Crie o usuario admin em **Authentication > Users**.
4. Insira role admin na tabela `profiles` para o mesmo `id` do usuario auth.

Exemplo:

```sql
insert into public.profiles (id, role, display_name)
values ('UUID_DO_USUARIO_AUTH', 'admin', 'Administrador')
on conflict (id) do update set role = excluded.role;
```

### 4) Rodar aplicacao

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts

- `npm run dev` - desenvolvimento
- `npm run build` - build de producao
- `npm run start` - servidor de producao local
- `npm run lint` - type-check (`tsc --noEmit`)
- `npm run clean` - limpa build do Next (`.next`)

## Deploy (Vercel)

Defina as mesmas variaveis (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) no projeto da Vercel.
