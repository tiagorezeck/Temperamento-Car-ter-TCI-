import React from 'react';
import { TCI_ARCHETYPES } from '../data/archetypes';
import { BookOpen, Award, CheckCircle } from 'lucide-react';

export const ArchetypeLibrary: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Biblioteca TCI</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Arquétipos de Personalidade & O Modelo Psicobiológico
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          O Inventário de Temperamento e Caráter (TCI), desenvolvido por C. Robert Cloninger, avalia 4 dimensões temperamentais (hereditárias e automáticas) e 3 dimensões de caráter (maturidade e autodesenvolvimento socioemocional). Conheça os principais arquétipos resultantes dessa combinação.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TCI_ARCHETYPES.map((arch) => (
          <div
            key={arch.id}
            className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden"
          >
            <div
              className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-bl-full pointer-events-none"
              style={{ backgroundColor: arch.color }}
            />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 font-mono">
                  {arch.subtitle}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{arch.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {arch.description}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Traços Principais
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {arch.traits.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Fortalezas
                  </h4>
                  <ul className="space-y-1">
                    {arch.strengths.map((str, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Par ideal sugerido:</span>
              <span className="font-semibold text-slate-900">{arch.idealMatch}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
