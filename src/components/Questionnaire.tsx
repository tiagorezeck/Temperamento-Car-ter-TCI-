import React, { useState } from 'react';
import { TCI_QUESTIONS } from '../data/tciQuestions';
import { TciScores, UserProfile } from '../types';
import { TCI_ARCHETYPES } from '../data/archetypes';
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

interface QuestionnaireProps {
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [userName, setUserName] = useState('');
  const [isNaming, setIsNaming] = useState(false);

  const currentQuestion = TCI_QUESTIONS[currentIndex];
  const totalQuestions = TCI_QUESTIONS.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    } else {
      setIsNaming(true);
    }
  };

  const calculateScoresAndFinish = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = userName.trim() || 'Participante';

    // Group answers by dimension
    const dimSums: Record<string, { total: number; count: number }> = {
      NS: { total: 0, count: 0 },
      HA: { total: 0, count: 0 },
      RD: { total: 0, count: 0 },
      P: { total: 0, count: 0 },
      SD: { total: 0, count: 0 },
      C: { total: 0, count: 0 },
      ST: { total: 0, count: 0 },
    };

    TCI_QUESTIONS.forEach((q) => {
      let val = answers[q.id] || 3; // default neutral 3 if skipped
      if (q.reverse) {
        // Reverse score: 1->5, 2->4, 3->3, 4->2, 5->1
        val = 6 - val;
      }
      // Convert 1-5 scale to 0-100 percentage: ((val - 1) / 4) * 100
      const normalized = ((val - 1) / 4) * 100;
      dimSums[q.dimension].total += normalized;
      dimSums[q.dimension].count += 1;
    });

    const scores: TciScores = {
      NS: Math.round(dimSums.NS.total / dimSums.NS.count),
      HA: Math.round(dimSums.HA.total / dimSums.HA.count),
      RD: Math.round(dimSums.RD.total / dimSums.RD.count),
      P: Math.round(dimSums.P.total / dimSums.P.count),
      SD: Math.round(dimSums.SD.total / dimSums.SD.count),
      C: Math.round(dimSums.C.total / dimSums.C.count),
      ST: Math.round(dimSums.ST.total / dimSums.ST.count),
    };

    // Determine closest archetype
    let closestArchetype = TCI_ARCHETYPES[0].name;
    let minDiff = Infinity;

    TCI_ARCHETYPES.forEach((arch) => {
      let diff = 0;
      Object.keys(scores).forEach((key) => {
        const k = key as keyof TciScores;
        diff += Math.abs(scores[k] - arch.scores[k]);
      });
      if (diff < minDiff) {
        minDiff = diff;
        closestArchetype = arch.name;
      }
    });

    const newProfile: UserProfile = {
      id: 'user_' + Date.now(),
      name: finalName,
      date: new Date().toISOString().split('T')[0],
      scores,
      archetype: closestArchetype,
    };

    onComplete(newProfile);
  };

  const dimensionNames: Record<string, string> = {
    NS: 'Busca de Novidade (Temperamento)',
    HA: 'Evitação de Danos (Temperamento)',
    RD: 'Dependência de Recompensa (Temperamento)',
    P: 'Persistência (Temperamento)',
    SD: 'Autodireção (Caráter)',
    C: 'Cooperatividade (Caráter)',
    ST: 'Autotranscendência (Caráter)',
  };

  if (isNaming) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-2xl border border-slate-200 shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-6 mx-auto">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Questionário Concluído!</h2>
        <p className="text-sm text-slate-600 text-center mb-8">
          Suas respostas foram processadas com sucesso através do modelo psicobiológico TCI. Insira seu nome para salvar seu perfil e visualizar sua análise completa.
        </p>

        <form onSubmit={calculateScoresAndFinish} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Seu Nome ou Apelido
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Ana Silva"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Gerar Meu Perfil de Personalidade</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-lg">
      {/* Header progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold">
          {dimensionNames[currentQuestion.dimension]}
        </span>
        <span className="text-xs font-mono tabular-nums text-slate-500">
          Questão {currentIndex + 1} de {totalQuestions}
        </span>
      </div>

      <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
        <div
          className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Text */}
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8 leading-snug">
        {currentQuestion.text}
      </h3>

      {/* Rating Options */}
      <div className="space-y-3 mb-8">
        {[
          { val: 1, label: 'Discordo Totalmente' },
          { val: 2, label: 'Discordo Parcialmente' },
          { val: 3, label: 'Neutro / Indiferente' },
          { val: 4, label: 'Concordo Parcialmente' },
          { val: 5, label: 'Concordo Totalmente' },
        ].map((opt) => {
          const isSelected = answers[currentQuestion.id] === opt.val;
          return (
            <button
              key={opt.val}
              onClick={() => handleSelectOption(opt.val)}
              className={`w-full text-left px-5 py-3.5 rounded-xl border transition-all flex items-center justify-between font-medium text-sm ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
              }`}
            >
              <span>{opt.label}</span>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {opt.val}
              </span>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <button
          onClick={onCancel}
          className="text-xs text-slate-400 hover:text-slate-600 underline"
        >
          Cancelar Avaliação
        </button>

        <button
          onClick={() => currentIndex < totalQuestions - 1 && setCurrentIndex(currentIndex + 1)}
          disabled={currentIndex === totalQuestions - 1}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentIndex === totalQuestions - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>Próxima</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
