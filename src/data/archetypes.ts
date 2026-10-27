import { Archetype, UserProfile } from '../types';

export const TCI_ARCHETYPES: Archetype[] = [
  {
    id: 'visionario',
    name: 'O Explorador Visionário',
    subtitle: 'Alta Busca de Novidade & Alta Autodireção',
    description: 'Curioso(a), inventivo(a) e movido(a) por descobertas. Possui uma mente ágil e independente, sempre buscando transformar ideias audaciosas em realidade.',
    traits: ['Inovador', 'Independente', 'Ousado', 'Visionário'],
    strengths: ['Criatividade excepcional', 'Resiliência diante de mudanças', 'Capacidade de inspirar equipes'],
    challenges: ['Impaciência com rotinas', 'Tendência a dispersão em múltiplos projetos'],
    idealMatch: 'O Estrategista Metódico',
    color: '#06B6D4', // Cyan
    scores: { NS: 85, HA: 30, RD: 50, P: 75, SD: 90, C: 65, ST: 70 },
  },
  {
    id: 'empata',
    name: 'O Guardião Empático',
    subtitle: 'Alta Dependência de Recompensa & Alta Cooperatividade',
    description: 'Profundamente compassivo(a) e dedicado(a) ao bem-estar coletivo. Sintoniza instantaneamente com as emoções alheias e constrói laços duradouros.',
    traits: ['Altruísta', 'Afetuoso', 'Colaborativo', 'Sensível'],
    strengths: ['Empatia genuína', 'Coesão de grupo', 'Comunicação acolhedora'],
    challenges: ['Vulnerabilidade a críticas', 'Dificuldade em impor limites saudáveis'],
    idealMatch: 'O Líder Inspirador',
    color: '#10B981', // Emerald
    scores: { NS: 45, HA: 55, RD: 90, P: 70, SD: 75, C: 95, ST: 60 },
  },
  {
    id: 'estrategista',
    name: 'O Estrategista Metódico',
    subtitle: 'Baixa Busca de Novidade & Alta Persistência / Autodireção',
    description: 'Disciplinado(a), analítico(a) e focado(a) em resultados de longo prazo. Prefere planejamento rigoroso e execuções impecáveis.',
    traits: ['Metódico', 'Disciplinado', 'Focado', 'Pragmático'],
    strengths: ['Constância inabalável', 'Planejamento estratégico', 'Resolução complexa de problemas'],
    challenges: ['Resistência a improvisos', 'Excesso de cautela'],
    idealMatch: 'O Explorador Visionário',
    color: '#3B82F6', // Blue
    scores: { NS: 25, HA: 40, RD: 40, P: 90, SD: 90, C: 70, ST: 35 },
  },
  {
    id: 'idealista',
    name: 'O Poeta Místico',
    subtitle: 'Alta Autotranscendência & Alta Evitação de Danos',
    description: 'Contemplativo(a), intuitivo(a) e dotado(a) de rica vida interior. Conecta-se com a arte, a filosofia e dimensões profundas da existência.',
    traits: ['Intuitivo', 'Contemplativo', 'Inspirado', 'Profundo'],
    strengths: ['Sensibilidade artística', 'Visão holística', 'Profundidade emocional'],
    challenges: ['Hipersensibilidade', 'Desconexão prática com o cotidiano'],
    idealMatch: 'O Guardião Empático',
    color: '#8B5CF6', // Purple
    scores: { NS: 60, HA: 75, RD: 65, P: 50, SD: 65, C: 80, ST: 95 },
  },
  {
    id: 'pragmatico',
    name: 'O Realista Resiliente',
    subtitle: 'Baixa Evitação de Danos & Alta Persistência',
    description: 'Firme, corajoso(a) e focado(a) em soluções práticas. Enfrenta adversidades com serenidade e mantém o rumo sem vacilar.',
    traits: ['Corajoso', 'Prático', 'Estável', 'Confiável'],
    strengths: ['Baixa ansiedade sob pressão', 'Determinação', 'Pragmatismo'],
    challenges: ['Pode parecer distante emocionalmente', 'Baixa tolerância com ineficiências'],
    idealMatch: 'O Guardião Empático',
    color: '#F59E0B', // Amber
    scores: { NS: 50, HA: 15, RD: 45, P: 85, SD: 85, C: 60, ST: 40 },
  },
];

export const PRESET_PROFILES: UserProfile[] = [
  {
    id: 'einstein',
    name: 'Albert Einstein (Simulação)',
    date: '2026-03-01',
    scores: { NS: 92, HA: 35, RD: 40, P: 88, SD: 95, C: 70, ST: 98 },
    archetype: 'O Explorador Visionário',
  },
  {
    id: 'marie_curie',
    name: 'Marie Curie (Simulação)',
    date: '2026-03-01',
    scores: { NS: 75, HA: 50, RD: 45, P: 98, SD: 95, C: 80, ST: 65 },
    archetype: 'O Estrategista Metódico',
  },
  {
    id: 'carl_jung',
    name: 'Carl Jung (Simulação)',
    date: '2026-03-01',
    scores: { NS: 88, HA: 60, RD: 55, P: 80, SD: 90, C: 75, ST: 96 },
    archetype: 'O Poeta Místico',
  },
  {
    id: 'frida_kahlo',
    name: 'Frida Kahlo (Simulação)',
    date: '2026-03-01',
    scores: { NS: 90, HA: 70, RD: 85, P: 85, SD: 70, C: 80, ST: 90 },
    archetype: 'O Poeta Místico',
  },
];
