import React from 'react';
import { Sparkles, Compass, User, Users, BookOpen, FileText } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasProfile: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, hasProfile }) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      {/* Zone 1: Brand title, one line */}
      <div 
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-2.5 cursor-pointer text-slate-900 whitespace-nowrap shrink-0 group"
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md group-hover:bg-emerald-700 transition-colors">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight">Affinitree</span>
          <span className="hidden sm:inline-block ml-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">TCI</span>
        </div>
      </div>

      {/* Zone 2: 4-5 nav links, single-line */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('home')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 ${
            activeTab === 'home' ? 'text-slate-900 font-semibold border-b-2 border-emerald-600' : ''
          }`}
        >
          Início
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 ${
            activeTab === 'quiz' ? 'text-slate-900 font-semibold border-b-2 border-emerald-600' : ''
          }`}
        >
          Questionário TCI
        </button>
        {hasProfile && (
          <button
            onClick={() => setActiveTab('profile')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 ${
              activeTab === 'profile' ? 'text-slate-900 font-semibold border-b-2 border-emerald-600' : ''
            }`}
          >
            Meu Perfil
          </button>
        )}
        <button
          onClick={() => setActiveTab('match')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 ${
            activeTab === 'match' ? 'text-slate-900 font-semibold border-b-2 border-emerald-600' : ''
          }`}
        >
          Afinidade & Comparação
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 ${
            activeTab === 'library' ? 'text-slate-900 font-semibold border-b-2 border-emerald-600' : ''
          }`}
        >
          Arquétipos
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setActiveTab('quiz')}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm whitespace-nowrap shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{hasProfile ? 'Refazer Teste' : 'Iniciar Avaliação'}</span>
        </button>
      </div>
    </header>
  );
};
