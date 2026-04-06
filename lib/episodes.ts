export interface Episode {
  id: string;
  title: string;
  duration: string;
  date: string;
  imageUrl: string;
}

export const episodes: Episode[] = [
  {
    id: "ep-42",
    title: "A Evolucao do Grunge em Cuiaba",
    duration: "45:20",
    date: "2023-10-25",
    imageUrl: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "ep-41",
    title: "Entrevista: Banda Macaco Bong",
    duration: "52:10",
    date: "2023-10-18",
    imageUrl: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "ep-40",
    title: "Classicos do Rock Nacional dos Anos 80",
    duration: "60:05",
    date: "2023-10-11",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5294b?auto=format&fit=crop&q=80&w=800",
  },
];
