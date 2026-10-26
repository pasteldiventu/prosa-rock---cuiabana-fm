-- Corrige recursao infinita nas policies que consultam public.profiles
-- dentro de policies da propria profiles / posts / storage.
-- Usa uma funcao SECURITY DEFINER que roda com privilegios do dono
-- e, portanto, NAO reaplica RLS ao checar o role (quebra o ciclo).

-- Permissoes de tabela (GRANT) para os roles do Supabase.
-- RLS roda EM CIMA destas permissoes; sem o GRANT a query falha com
-- "permission denied for table" antes mesmo de avaliar as policies.
grant select on public.profiles to anon, authenticated;
grant select, insert, update, delete on public.posts to authenticated;
grant select on public.posts to anon;

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

-- profiles: ler o proprio perfil OU ser staff
drop policy if exists "read own profile or admin" on public.profiles;
create policy "read own profile or admin"
on public.profiles for select
to authenticated
using (
  auth.uid() = id
  or public.is_staff()
);

-- posts: leitura publica de publicados OU staff ve tudo
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

-- storage: bucket post-images
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
