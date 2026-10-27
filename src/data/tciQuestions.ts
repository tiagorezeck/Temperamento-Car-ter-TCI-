import { Question } from '../types';

export const TCI_QUESTIONS: Question[] = [
  // Busca de Novidade (NS)
  {
    id: 1,
    dimension: 'NS',
    text: 'Gosto de tentar coisas novas e desconhecidas, mesmo que envolvam riscos ou incertezas.',
  },
  {
    id: 2,
    dimension: 'NS',
    text: 'Frequentemente mudo de ideias ou de planos por impulso ao encontrar algo mais estimulante.',
  },
  {
    id: 3,
    dimension: 'NS',
    text: 'Prefiro rotinas previsíveis e seguras a ambientes caóticos e cheios de surpresas.',
    reverse: true,
  },
  {
    id: 4,
    dimension: 'NS',
    text: 'Fico entediado(a) rapidamente quando as atividades se tornam repetitivas ou monótonas.',
  },

  // Evitação de Danos (HA)
  {
    id: 5,
    dimension: 'HA',
    text: 'Costumo me preocupar muito com a possibilidade de algo dar errado no futuro.',
  },
  {
    id: 6,
    dimension: 'HA',
    text: 'Prefiro ser cauteloso(a) e evitar conflitos ou situações perigosas a todo custo.',
  },
  {
    id: 7,
    dimension: 'HA',
    text: 'Sinto-me calmo(a) e confiante mesmo diante de imprevistos e críticas públicas.',
    reverse: true,
  },
  {
    id: 8,
    dimension: 'HA',
    text: 'Frequentemente imagino os piores cenários possíveis antes de tomar uma decisão importante.',
  },

  // Dependência de Recompensa (RD)
  {
    id: 9,
    dimension: 'RD',
    text: 'A opinião e a aprovação de amigos e familiares são extremamente importantes para mim.',
  },
  {
    id: 10,
    dimension: 'RD',
    text: 'Sou uma pessoa calorosa, afetuosa e sensível às necessidades emocionais dos outros.',
  },
  {
    id: 11,
    dimension: 'RD',
    text: 'Consigo manter minha independência emocional sem depender do elogio alheio.',
    reverse: true,
  },
  {
    id: 12,
    dimension: 'RD',
    text: 'Choro com facilidade ao ver cenas comoventes em filmes ou histórias reais.',
  },

  // Persistência (P)
  {
    id: 13,
    dimension: 'P',
    text: 'Trabalho duro por longas horas, mesmo quando não há recompensas imediatas à vista.',
  },
  {
    id: 14,
    dimension: 'P',
    text: 'Desisto facilmente de projetos ou metas quando encontro os primeiros obstáculos complexos.',
    reverse: true,
  },
  {
    id: 15,
    dimension: 'P',
    text: 'Sou considerado(a) uma pessoa obstinada que não descansa enquanto não conclui uma tarefa.',
  },
  {
    id: 16,
    dimension: 'P',
    text: 'Persisto em meus objetivos de longo prazo apesar de contratempos e fadiga.',
  },

  // Autodireção (SD)
  {
    id: 17,
    dimension: 'SD',
    text: 'Tenho metas claras na vida e assumo total responsabilidade pelo meu próprio sucesso ou fracasso.',
  },
  {
    id: 18,
    dimension: 'SD',
    text: 'Muitas vezes culpo os outros ou circunstâncias externas pelos meus problemas.',
    reverse: true,
  },
  {
    id: 19,
    dimension: 'SD',
    text: 'Sinto que minha vida tem um propósito bem definido e direção consistente.',
  },
  {
    id: 20,
    dimension: 'SD',
    text: 'Consigo me adaptar e superar maus hábitos com disciplina pessoal e foco.',
  },

  // Cooperatividade (C)
  {
    id: 21,
    dimension: 'C',
    text: 'Considero fundamental ajudar os outros, mesmo quando não recebo nada em troca.',
  },
  {
    id: 22,
    dimension: 'C',
    text: 'Costumo ser tolerante e compreensivo(a) com opiniões e pontos de vista diferentes dos meus.',
  },
  {
    id: 23,
    dimension: 'C',
    text: 'Em situações de competição, priorizo meus interesses pessoais acima do bem-estar do grupo.',
    reverse: true,
  },
  {
    id: 24,
    dimension: 'C',
    text: 'Acredito que a honestidade e a empatia devem guiar todas as relações humanas.',
  },

  // Autotranscendência (ST)
  {
    id: 25,
    dimension: 'ST',
    text: 'Sinto uma profunda conexão espiritual com o universo, a natureza ou algo maior que eu mesmo(a).',
  },
  {
    id: 26,
    dimension: 'ST',
    text: 'Experiencio momentos de intensa intuição, inspiração artística ou êxtase contemplativo.',
  },
  {
    id: 27,
    dimension: 'ST',
    text: 'Vejo o mundo de forma estritamente materialista e lógica, sem espaço para o invisível.',
    reverse: true,
  },
  {
    id: 28,
    dimension: 'ST',
    text: 'Sinto que faço parte de um todo maior onde fronteiras individuais perdem o sentido.',
  },
];
