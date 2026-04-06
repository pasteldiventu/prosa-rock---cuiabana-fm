insert into public.posts (slug, title, description, content, guest, cover_image_url, status, published_at)
values
(
  'o-renascimento-do-vinil-na-cena-local',
  'O Renascimento do Vinil na Cena Local',
  'Como as lojas de discos independentes estao mantendo a cultura do vinil viva em Mato Grosso.',
  E'O vinil nunca morreu, mas definitivamente esta vivendo um novo amanhecer em Cuiaba.\n\nNeste artigo, exploramos lojas independentes, sebos e o retorno do garimpo musical na cidade.',
  null,
  'https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&q=80&w=800',
  'published',
  now() - interval '10 days'
),
(
  'entrevista-exclusiva-com-Vidraças',
  'Hoje: Entrevista Exclusiva com Vidraças',
  'Nao perca o programa com uma das bandas mais iconicas da nossa terra.',
  E'No episodio de hoje do Prosa Rock, Cimone Lima recebe os integrantes da banda Vidraças para um bate-papo imperdivel.\n\nHistoria da banda, bastidores e proximos projetos.',
  'Banda Vidraças',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
  'published',
  now() - interval '8 days'
),
(
  '5-guitarras-que-mudaram-a-historia-do-rock',
  '5 Guitarras que Mudaram a Historia do Rock',
  'Uma viagem pelos instrumentos que definiram o som de geracoes.',
  E'O rock n'' roll nao seria o mesmo sem a guitarra eletrica.\n\nNesta lista reunimos instrumentos iconicos que marcaram epocas.',
  null,
  'https://images.unsplash.com/photo-1514649923863-ceaf75b7ec00?auto=format&fit=crop&q=80&w=800',
  'published',
  now() - interval '5 days'
)
on conflict (slug) do nothing;
