export type TciDimension = 'NS' | 'HA' | 'RD' | 'P' | 'SD' | 'C' | 'ST';

export interface TciScores {
  NS: number; // Busca de Novidade
  HA: number; // Evitação de Danos
  RD: number; // Dependência de Recompensa
  P: number;  // Persistência
  SD: number; // Autodireção
  C: number;  // Cooperatividade
  ST: number; // Autotranscendência
}

export interface Question {
  id: number;
  dimension: TciDimension;
  text: string;
  reverse?: boolean;
}

export interface Archetype {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  traits: string[];
  strengths: string[];
  challenges: string[];
  idealMatch: string;
  color: string;
  scores: TciScores;
}

export interface UserProfile {
  id: string;
  name: string;
  date: string;
  scores: TciScores;
  archetype: string;
  aiAnalysis?: {
    perfilPsicologico?: string;
    pontosFortes?: string[];
    desafiosCrescimento?: string[];
    dicasCarreiraRelacionamentos?: string[];
    reflexaoInspiradora?: string;
  };
}

export interface CompatibilityResult {
  compatibilidadeGeral: number;
  pontosFortes: string[];
  pontosAtencao: string[];
  conselhoComunicacao: string;
  resumoNarrativo: string;
}
