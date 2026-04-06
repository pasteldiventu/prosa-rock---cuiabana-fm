# Checklist de Deploy na Vercel

## 1) Preparar Supabase

- Executar `supabase/schema.sql` no SQL Editor.
- Executar `supabase/seed.sql` para dados iniciais.
- Criar usuario admin em Authentication.
- Inserir role admin na tabela `profiles`.

## 2) Configurar projeto na Vercel

- Importar repositorio no dashboard da Vercel.
- Framework detectado: Next.js.
- Build command: `npm run build`.
- Output: padrao do Next.js.

## 3) Variaveis de ambiente (Project Settings > Environment Variables)

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4) Validacoes pos-deploy

- Acessar `/` e `/blog` sem login.
- Validar leitura de posts publicados.
- Acessar `/admin/login` e autenticar com admin.
- Criar novo post em rascunho e depois publicar.
- Editar post em `/admin/posts/[id]`.
- Confirmar que usuario comum nao consegue escrever dados.
