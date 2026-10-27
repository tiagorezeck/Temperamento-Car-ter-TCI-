import React, { useState } from 'react';
import { UserProfile, CompatibilityResult } from '../types';
import { PRESET_PROFILES, TCI_ARCHETYPES } from '../data/archetypes';
import { Users, Sparkles, CheckCircle, ArrowRight, HeartHandshake, ShieldAlert } from 'lucide-react';

interface CompatibilityMatchProps {
  userProfile: UserProfile | null;
  onGoToQuiz: () => void;
}

export const CompatibilityMatch: React.FC<CompatibilityMatchProps> = ({ userProfile, onGoToQuiz }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_PROFILES[0].id);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedPreset = PRESET_PROFILES.find((p) => p.id === selectedPresetId) || PRESET_PROFILES[0];

  const handleRunCompatibility = async () => {
    if (!userProfile) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scores: userProfile.scores,
          profileName: userProfile.name,
          archetype: userProfile.archetype,
          comparisonProfile: selectedPreset,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao calcular compatibilidade.');
      }

      setResult(data.result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Falha ao conectar com o serviço de IA.');
    } finally {
      setLoading(false);
    }
  };

  if (!userProfile) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-2xl border border-slate-200 text-center shadow-sm">
        <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Avaliação Necessária</h2>
        <p className="text-sm text-slate-600 mb-6">
          Para realizar a análise de afinidade e compatibilidade entre perfis, você primeiro precisa concluir seu questionário TCI.
        </p>
        <button
          onClick={onGoToQuiz}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-md inline-flex items-center gap-2"
        >
          <span>Fazer Avaliação TCI Agora</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
          <HeartHandshake className="w-4 h-4" />
          <span>Affinitree Match</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Comparador de Afinidade e Relacionamentos
        </h1>
        <p className="text-sm text-slate-600">
          Compare o seu perfil ({userProfile.name}) com figuras históricas ou perfis de referência para entender a dinâmica de compatibilidade interpessoal segundo o TCI.
        </p>
      </div>

      {/* Profile Selection */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Selecione o Perfil para Comparação
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRESET_PROFILES.map((preset) => {
              const isSelected = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPresetId(preset.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{preset.name}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{preset.archetype}</p>
                  </div>
                  {isSelected && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleRunCompatibility}
          disabled={loading}
          className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{loading ? 'Calculando Afinidade com IA...' : `Analisar Afinidade com ${selectedPreset.name}`}</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl">
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-600">Cruzando dimensões de temperamento e caráter...</p>
        </div>
      )}

      {result && !loading && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8 animate-fadeIn">
          {/* General Compatibility Score */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-50 p-6 rounded-2xl border border-slate-100 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Índice Geral de Afinidade</span>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">
                {userProfile.name} & {selectedPreset.name}
              </h3>
            </div>
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-4xl font-black text-emerald-600 font-mono tabular-nums">
                {result.compatibilidadeGeral}%
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase">Afinidade<br/>TCI</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Resumo da Dinâmica
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
              {result.resumoNarrativo}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Pontos Fortes na Sinergia
              </h3>
              <ul className="space-y-2">
                {result.pontosFortes?.map((pf, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pf}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Pontos de Atenção & Atrito
              </h3>
              <ul className="space-y-2">
                {result.pontosAtencao?.map((pa, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{pa}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
              Conselho Prático de Comunicação
            </h3>
            <p className="text-sm text-emerald-950">{result.conselhoComunicacao}</p>
          </div>
        </div>
      )}
    </div>
  );
};
