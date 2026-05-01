create extension if not exists pgcrypto;

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

alter table public.profiles enable row level security;
alter table public.posts enable row level security;

drop policy if exists "read own profile or admin" on public.profiles;
create policy "read own profile or admin"
on public.profiles for select
to authenticated
using (
  auth.uid() = id
  or exists (
    select 1
    from public.profiles p
    where p.id = auth.uid() and p.role in ('admin', 'editor')
  )
);

drop policy if exists "public read published posts" on public.posts;
create policy "public read published posts"
on public.posts for select
to anon, authenticated
using (
  status = 'published'
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin', 'editor')
  )
);

drop policy if exists "admin insert posts" on public.posts;
create policy "admin insert posts"
on public.posts for insert
to authenticated
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin', 'editor')
  )
);

drop policy if exists "admin update posts" on public.posts;
create policy "admin update posts"
on public.posts for update
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin', 'editor')
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin', 'editor')
  )
);

drop policy if exists "admin delete posts" on public.posts;
create policy "admin delete posts"
on public.posts for delete
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin', 'editor')
  )
);

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
with check (
  bucket_id = 'post-images'
  and exists (
    select 1
    from public.profiles p
    where p.id = auth.uid() and p.role in ('admin', 'editor')
  )
);

drop policy if exists "admin update post-images" on storage.objects;
create policy "admin update post-images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'post-images'
  and exists (
    select 1
    from public.profiles p
    where p.id = auth.uid() and p.role in ('admin', 'editor')
  )
)
with check (
  bucket_id = 'post-images'
  and exists (
    select 1
    from public.profiles p
    where p.id = auth.uid() and p.role in ('admin', 'editor')
  )
);

drop policy if exists "admin delete post-images" on storage.objects;
create policy "admin delete post-images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'post-images'
  and exists (
    select 1
    from public.profiles p
    where p.id = auth.uid() and p.role in ('admin', 'editor')
  )
);
