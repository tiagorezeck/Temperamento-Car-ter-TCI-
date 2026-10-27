import React, { useState } from 'react';
import { UserProfile } from '../types';
import { TCI_ARCHETYPES } from '../data/archetypes';
import { RadarChart } from './RadarChart';
import { Sparkles, Award, ArrowRight, RefreshCw, CheckCircle, BookOpen, Share2 } from 'lucide-react';

interface ProfileResultsProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onRetake: () => void;
  onGoToMatch: () => void;
}

export const ProfileResults: React.FC<ProfileResultsProps> = ({
  profile,
  onUpdateProfile,
  onRetake,
  onGoToMatch,
}) => {
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const matchedArchetype = TCI_ARCHETYPES.find((a) => a.name === profile.archetype) || TCI_ARCHETYPES[0];

  const handleGenerateAiAnalysis = async () => {
    setLoadingAi(true);
    setAiError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scores: profile.scores,
          profileName: profile.name,
          archetype: profile.archetype,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar análise com IA.');
      }

      const updated: UserProfile = {
        ...profile,
        aiAnalysis: data.result,
      };
      onUpdateProfile(updated);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Falha ao conectar com o serviço de IA.');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <span>Avaliação Concluída</span>
            <span aria-hidden="true">·</span>
            <span>{profile.date}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Olá, {profile.name}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Seu perfil psicobiológico TCI foi classificado no arquétipo principal abaixo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRetake}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refazer Teste</span>
          </button>
          <button
            onClick={onGoToMatch}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
          >
            <span>Testar Afinidade</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Chart & Archetype Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Radar Chart Column */}
        <div className="lg:col-span-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Gráfico de Radar TCI</h2>
          <div className="flex-1 flex items-center justify-center">
            <RadarChart scores={profile.scores} size={340} />
          </div>
        </div>

        {/* Archetype Details Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full pointer-events-none"
              style={{ backgroundColor: matchedArchetype.color }}
            />

            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 font-mono">
                {matchedArchetype.subtitle}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-3">{matchedArchetype.name}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {matchedArchetype.description}
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Pontos Fortes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {matchedArchetype.strengths.map((str, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-emerald-50 text-emerald-800 px-3 py-1 rounded-lg border border-emerald-100"
                    >
                      {str}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Desafios de Desenvolvimento
                </h4>
                <div className="flex flex-wrap gap-2">
                  {matchedArchetype.challenges.map((chal, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-amber-50 text-amber-800 px-3 py-1 rounded-lg border border-amber-100"
                    >
                      {chal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Analysis Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Análise Psicológica Avançada (Powered by Gemini)</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Retrato Comportamental Personalizado</h2>
          </div>

          {!profile.aiAnalysis && (
            <button
              onClick={handleGenerateAiAnalysis}
              disabled={loadingAi}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{loadingAi ? 'Gerando Análise com IA...' : 'Gerar Análise com IA'}</span>
            </button>
          )}
        </div>

        {aiError && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl mb-6">
            {aiError}
          </div>
        )}

        {loadingAi && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-slate-600">
              Analisando dimensões psicobiológicas com Inteligência Artificial...
            </p>
          </div>
        )}

        {profile.aiAnalysis && !loadingAi && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Perfil Psicológico
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                {profile.aiAnalysis.perfilPsicologico}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Fortalezas Principais
                </h3>
                <ul className="space-y-2">
                  {profile.aiAnalysis.pontosFortes?.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Áreas de Crescimento
                </h3>
                <ul className="space-y-2">
                  {profile.aiAnalysis.desafiosCrescimento?.map((ch, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Dicas para Carreira e Relacionamentos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.aiAnalysis.dicasCarreiraRelacionamentos?.map((dica, i) => (
                  <div key={i} className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs text-slate-700 leading-relaxed">
                    {dica}
                  </div>
                ))}
              </div>
            </div>

            {profile.aiAnalysis.reflexaoInspiradora && (
              <div className="p-4 bg-slate-900 text-white rounded-xl text-sm italic text-center font-medium">
                "{profile.aiAnalysis.reflexaoInspiradora}"
              </div>
            )}
          </div>
        )}

        {!profile.aiAnalysis && !loadingAi && (
          <div className="text-center py-8 text-slate-400 text-sm">
            Clique no botão acima para criar uma análise psicológica profunda personalizada com inteligência artificial baseada nas suas pontuações TCI.
          </div>
        )}
      </div>
    </div>
  );
};
