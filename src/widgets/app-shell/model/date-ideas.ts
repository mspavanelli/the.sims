import type { MissionCategory } from "@/entities/relationship";

/** Uma ideia de encontro guardada no pote — sem data, sem cobrança, só convite. */
export type DateIdea = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  category: MissionCategory;
};

/**
 * As 20 ideias do "pote" — o segredinho escondido atrás do ♡.
 * Nada aqui depende do save: é uma lista fixa, feita para ser sorteada
 * e, se der vontade, virar missão.
 */
export const dateIdeas: DateIdea[] = [
  {
    id: "piquenique",
    emoji: "🧺",
    title: "Piquenique improvisado",
    description:
      "Montem uma toalha no chão — em casa ou no parque — e comam o que já tiver na geladeira, como se fosse um momento especial.",
    category: "cotidiano",
  },
  {
    id: "cozinhar",
    emoji: "🍳",
    title: "Cozinhar juntos com o que tem em casa",
    description:
      "Escolham ingredientes simples e criem uma competição divertida de quem faz o melhor prato.",
    category: "cotidiano",
  },
  {
    id: "cinema-em-casa",
    emoji: "🎬",
    title: "Noite de filmes com tema",
    description:
      "Escolham um tema (romance, comédia, terror) e montem uma sessão cinema em casa.",
    category: "cotidiano",
  },
  {
    id: "caminhada",
    emoji: "🚶",
    title: "Caminhada sem destino",
    description:
      "Saiam andando sem roteiro e descubram lugares novos do bairro juntos.",
    category: "passeio",
  },
  {
    id: "perguntas",
    emoji: "🃏",
    title: "Jogo de perguntas profundas",
    description:
      "Façam perguntas sobre sonhos, infância e planos futuros para se conhecerem ainda melhor.",
    category: "experiencia",
  },
  {
    id: "primeiro-encontro",
    emoji: "💞",
    title: "Recriar o primeiro encontro",
    description:
      "Tentem reviver o momento em que se conheceram, mesmo que de forma improvisada.",
    category: "encontro",
  },
  {
    id: "sessao-de-fotos",
    emoji: "📸",
    title: "Sessão de fotos com celular",
    description:
      "Um fotografa o outro em poses criativas, dentro ou fora de casa.",
    category: "experiencia",
  },
  {
    id: "dancar-na-sala",
    emoji: "💃",
    title: "Dançar na sala",
    description:
      "Coloquem músicas que marcaram a relação e dancem juntos sem vergonha nenhuma.",
    category: "cotidiano",
  },
  {
    id: "playlist",
    emoji: "🎧",
    title: "Construir uma playlist do casal",
    description:
      "Cada um escolhe músicas que representam a relação e explica o motivo da escolha.",
    category: "experiencia",
  },
  {
    id: "desenho",
    emoji: "✏️",
    title: "Desafio de desenho um do outro",
    description: "Tentem desenhar o parceiro e depois comparem os resultados.",
    category: "experiencia",
  },
  {
    id: "por-do-sol",
    emoji: "🌇",
    title: "Pôr do sol juntos",
    description:
      "Procurem um lugar bonito para assistir o pôr do sol, em silêncio ou conversando.",
    category: "passeio",
  },
  {
    id: "historias-da-vida",
    emoji: "📖",
    title: "Maratona de histórias da vida",
    description:
      "Cada um conta histórias engraçadas ou importantes da própria vida.",
    category: "experiencia",
  },
  {
    id: "jogos",
    emoji: "🎲",
    title: "Jogos com cartas ou improvisados",
    description:
      "Criem regras novas para jogos simples, usando o que tiver em casa.",
    category: "cotidiano",
  },
  {
    id: "sem-celular",
    emoji: "🌙",
    title: "Noite sem celular",
    description:
      "Fiquem algumas horas totalmente desconectados para focar um no outro.",
    category: "experiencia",
  },
  {
    id: "lista-de-sonhos",
    emoji: "🌠",
    title: "Lista de sonhos juntos",
    description: "Escrevam tudo o que querem fazer como casal no futuro.",
    category: "experiencia",
  },
  {
    id: "spa-caseiro",
    emoji: "🛁",
    title: "Spa caseiro",
    description:
      "Façam massagem um no outro e criem um clima relaxante em casa.",
    category: "cotidiano",
  },
  {
    id: "acampamento",
    emoji: "⛺",
    title: "Acampamento na sala",
    description: "Montem cobertores, almofadas e acampem dentro de casa.",
    category: "surpresa",
  },
  {
    id: "caca-ao-tesouro",
    emoji: "💌",
    title: "Caça ao tesouro emocional",
    description:
      "Esconda bilhetes com mensagens carinhosas pela casa para o outro encontrar.",
    category: "surpresa",
  },
  {
    id: "leitura",
    emoji: "📚",
    title: "Leitura juntos",
    description:
      "Leiam o mesmo livro ou textos em voz alta, um para o outro.",
    category: "cotidiano",
  },
  {
    id: "silencio",
    emoji: "🤍",
    title: "Silêncio confortável",
    description:
      "Fiquem juntos em silêncio por alguns minutos, apenas apreciando a presença um do outro.",
    category: "encontro",
  },
];
