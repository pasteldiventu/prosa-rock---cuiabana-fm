-- Schema inicial do Prosa Rock (consolidado e corrigido).
-- Inclui tabelas, triggers, GRANTs, funcao is_staff() (evita recursao de RLS),
-- politicas RLS e bucket de imagens. Idempotente: pode rodar mais de uma vez.

create extension if not exists pgcrypto;

-- ============================ Tabelas ============================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('admin', 'editor', 'user')),
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  content text not null,
  guest text,
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ====================== Trigger updated_at =======================

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at_profiles on public.profiles;
create trigger set_updated_at_profiles
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_posts on public.posts;
create trigger set_updated_at_posts
before update on public.posts
for each row execute function public.set_updated_at();

-- ============================ GRANTs =============================
-- RLS roda EM CIMA destas permissoes; sem o GRANT a query falha com
-- "permission denied for table" antes mesmo de avaliar as policies.

grant select on public.profiles to anon, authenticated;
grant select, insert, update, delete on public.posts to authenticated;
grant select on public.posts to anon;

-- ===================== Funcao is_staff() =========================
-- SECURITY DEFINER: roda com privilegios do dono e NAO reaplica RLS ao
-- checar o role, quebrando o ciclo de recursao infinita nas policies.

create or replace function public.is_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

-- ============================== RLS ==============================

alter table public.profiles enable row level security;
alter table public.posts enable row level security;

drop policy if exists "read own profile or admin" on public.profiles;
create policy "read own profile or admin"
on public.profiles for select
to authenticated
using (
  auth.uid() = id
  or public.is_staff()
);

drop policy if exists "public read published posts" on public.posts;
create policy "public read published posts"
on public.posts for select
to anon, authenticated
using (
  status = 'published'
  or public.is_staff()
);

drop policy if exists "admin insert posts" on public.posts;
create policy "admin insert posts"
on public.posts for insert
to authenticated
with check (public.is_staff());

drop policy if exists "admin update posts" on public.posts;
create policy "admin update posts"
on public.posts for update
to authenticated
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "admin delete posts" on public.posts;
create policy "admin delete posts"
on public.posts for delete
to authenticated
using (public.is_staff());

-- ====================== Storage: capas ===========================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'post-images',
  'post-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public read post-images" on storage.objects;
create policy "public read post-images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'post-images');

drop policy if exists "admin insert post-images" on storage.objects;
create policy "admin insert post-images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'post-images' and public.is_staff());

drop policy if exists "admin update post-images" on storage.objects;
create policy "admin update post-images"
on storage.objects for update
to authenticated
using (bucket_id = 'post-images' and public.is_staff())
with check (bucket_id = 'post-images' and public.is_staff());

drop policy if exists "admin delete post-images" on storage.objects;
create policy "admin delete post-images"
on storage.objects for delete
to authenticated
using (bucket_id = 'post-images' and public.is_staff());
