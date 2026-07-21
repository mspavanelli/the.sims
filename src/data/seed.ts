import type { AppState } from "../types";

/**
 * Dados iniciais mockados — a interface nunca começa vazia.
 * Personagens, memórias, missões, metas, conversas e aspirações fictícios.
 */
export const seed: AppState = {
  coupleName: "Matheus & Luiza",
  saveTagline: "Um mundinho só nosso, em construção",
  currentChapter: {
    title: "Capítulo 1 — Nos descobrindo",
    subtitle: "Os primeiros meses, um encontro por semana, inventando o que é nosso.",
  },
  featuredConversationId: "conv-1",

  characters: [
    {
      id: "char-1",
      name: "Matheus",
      emoji: "🌿",
      age: 32,
      tagline: "INTP de bolso — curioso por tudo, mestre dos porquês",
      traits: ["INTP", "Analítico", "Calmo", "Curioso"],
      interests: ["Cozinhar", "Ciclismo", "Jogos de tabuleiro", "Astronomia"],
      likes: ["Massas frescas", "Vinil", "Feiras de rua", "Estrelas"],
      quirks: ["Narra receitas em voz alta", "Nomeia as plantas", "Faz trocadilhos ruins"],
      affectionStyles: ["Atos de cuidado", "Cozinhar junto", "Toque"],
      energySources: ["Pedalar ao amanhecer", "Boa comida", "Silêncio compartilhado"],
      aspirations: ["Aprender pães de fermentação natural", "Ter uma horta em casa"],
    },
    {
      id: "char-2",
      name: "Luiza",
      emoji: "🌻",
      age: 23,
      tagline: "INTP sonhadora — coleciona ideias, teorias e pores do sol",
      traits: ["INTP", "Curiosa", "Independente", "Sonhadora"],
      interests: ["Fotografia analógica", "Cerâmica", "Trilhas", "Cinema cult"],
      likes: ["Café coado", "Chuva com janela aberta", "Livrarias antigas", "Gatos"],
      quirks: ["Fala com plantas", "Guarda ingressos de tudo", "Canta desafinado feliz"],
      affectionStyles: ["Palavras carinhosas", "Tempo de qualidade", "Bilhetinhos"],
      energySources: ["Manhãs sem pressa", "Mar", "Abraço demorado"],
      aspirations: ["Montar um ateliê de cerâmica", "Fotografar 3 países novos"],
    },
  ],

  memories: [
    {
      id: "mem-1",
      title: "O dia em que a gente se conheceu",
      description: "Duas cabeças INTP se encontraram e a conversa não teve fim.",
      date: "2026-04-20",
      emoji: "✨",
      category: "Início",
      tags: ["primeiro encontro", "começo de tudo"],
    },
    {
      id: "mem-2",
      title: "Primeiro encontro que virou madrugada",
      description: "Perdemos a hora falando de tudo — de teoria a bobagem.",
      date: "2026-05-03",
      emoji: "🌙",
      category: "Começo",
      tags: ["conversa infinita", "sintonia"],
    },
    {
      id: "mem-3",
      title: "Nosso ritual de toda semana",
      description: "Descobrimos que um encontro por semana virou o nosso lugar favorito.",
      date: "2026-06-14",
      emoji: "🗓️",
      category: "Ritual",
      tags: ["toda semana", "tradição nossa"],
    },
    {
      id: "mem-4",
      title: "Jantar que quase pegou fogo",
      description: "O risoto virou história pra contar em uma noite só.",
      date: "2026-07-11",
      location: "Cozinha do Matheus",
      emoji: "🍲",
      category: "Cotidiano",
      tags: ["cozinha", "risada", "desastre delicioso"],
    },
  ],

  missions: [
    {
      id: "mis-1",
      title: "Piquenique ao pôr do sol",
      description: "Levar câmera analógica e a manta xadrez.",
      category: "encontro",
      status: "planned",
      date: "2026-07-26",
      steps: [
        { id: "s1", title: "Comprar frutas na feira", completed: true },
        { id: "s2", title: "Carregar a câmera", completed: false },
        { id: "s3", title: "Montar playlist do fim de tarde", completed: false },
      ],
    },
    {
      id: "mis-2",
      title: "Maratona de filmes cult",
      description: "Uma sexta por mês, cada um escolhe um filme surpresa.",
      category: "cotidiano",
      status: "idea",
    },
    {
      id: "mis-3",
      title: "Aula de cerâmica em dupla",
      category: "experiencia",
      status: "planned",
      date: "2026-08-09",
      steps: [
        { id: "s1", title: "Escolher o ateliê", completed: true },
        { id: "s2", title: "Reservar a data", completed: false },
      ],
    },
    {
      id: "mis-4",
      title: "Fim de semana na praia",
      description: "Aquele descanso sem despertador.",
      category: "viagem",
      status: "completed",
      date: "2026-05-18",
    },
    {
      id: "mis-5",
      title: "Café escondido no centro",
      category: "passeio",
      status: "archived",
    },
  ],

  goals: [
    {
      id: "goal-1",
      title: "Cozinhar um prato novo por semana",
      horizon: "short",
      progressType: "percentage",
      progress: 60,
      description: "Rodízio de receitas do mundo, um continente por vez.",
    },
    {
      id: "goal-2",
      title: "Planejar a viagem dos sonhos",
      horizon: "medium",
      progressType: "checklist",
      steps: [
        { id: "g2s1", title: "Escolher o destino", completed: true },
        { id: "g2s2", title: "Definir orçamento", completed: true },
        { id: "g2s3", title: "Reservar passagens", completed: false },
        { id: "g2s4", title: "Montar roteiro leve", completed: false },
      ],
    },
    {
      id: "goal-3",
      title: "Construir uma casa cheia de plantas e histórias",
      horizon: "long",
      progressType: "narrative",
      description:
        "Um lugar com horta, muitos livros e espaço para receber quem a gente ama.",
    },
  ],

  conversations: [
    {
      id: "conv-1",
      title: "Como queremos passar as festas de fim de ano",
      context: "Equilibrar as duas famílias sem correria.",
      topics: ["Dividir as datas", "Criar uma tradição nossa", "Viajar ou ficar?"],
      sensitivity: "meaningful",
      status: "ready",
    },
    {
      id: "conv-2",
      title: "Nossos ritmos de energia social",
      context: "Entender quando cada um precisa de recolhimento.",
      topics: ["Sinais de cansaço", "Combinar pausas", "Planos que respeitam os dois"],
      sensitivity: "delicate",
      status: "horizon",
    },
    {
      id: "conv-3",
      title: "Playlist colaborativa da casa",
      topics: ["Regras bobas", "Música proibida (brincadeira)"],
      sensitivity: "light",
      status: "discussed",
    },
  ],

  aspirations: [
    {
      id: "asp-1",
      title: "Conhecer novos lugares todo ano",
      description: "Nem que seja uma cidade pequena aqui perto.",
      emoji: "🧭",
    },
    {
      id: "asp-2",
      title: "Criar rituais só nossos",
      description: "Do café de domingo ao cinema da quarta.",
      emoji: "🕯️",
    },
    {
      id: "asp-3",
      title: "Aprender algo em dupla",
      description: "Um idioma, um instrumento, uma dança.",
      emoji: "🎨",
    },
  ],
};

export function cloneSeed(): AppState {
  return structuredClone
    ? structuredClone(seed)
    : JSON.parse(JSON.stringify(seed));
}
