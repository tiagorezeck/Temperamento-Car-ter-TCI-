import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Questionnaire } from './components/Questionnaire';
import { ProfileResults } from './components/ProfileResults';
import { CompatibilityMatch } from './components/CompatibilityMatch';
import { ArchetypeLibrary } from './components/ArchetypeLibrary';
import { UserProfile } from './types';
import { PRESET_PROFILES } from './data/archetypes';
import { Compass, Sparkles, Shield, Users, ArrowRight, Brain, Cpu, Heart, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('affinitree_user_profile');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('affinitree_user_profile', JSON.stringify(userProfile));
    } else {
      localStorage.removeItem('affinitree_user_profile');
    }
  }, [userProfile]);

  const handleCompleteQuiz = (profile: UserProfile) => {
    setUserProfile(profile);
    setActiveTab('profile');
  };

  const handleSelectPresetAsUser = (preset: UserProfile) => {
    setUserProfile({
      ...preset,
      id: 'user_sim_' + Date.now(),
      name: preset.name.replace(' (Simulação)', ''),
      date: new Date().toISOString().split('T')[0],
    });
    setActiveTab('profile');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasProfile={Boolean(userProfile)}
      />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
        {activeTab === 'home' && (
          <div className="space-y-16 py-6">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-xs font-semibold text-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Baseado no Modelo Psicobiológico de Cloninger (TCI)</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Descubra sua <span className="text-emerald-600">Árvore de Afinidades</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Explore a ciência dos traços de temperamento e caráter. Analise sua personalidade através de gráficos de radar interativos e descubra sua compatibilidade interpessoal com inteligência artificial.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Iniciar Avaliação TCI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {userProfile && (
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-2xl transition-all border border-slate-200 shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Ver Meu Perfil Salvo</span>
                  </button>
                )}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Inventário TCI Científico</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Avaliação detalhada medindo 4 dimensões temperamentais biológicas e 3 dimensões de caráter maduro.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">IA Gemini Integrada</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Gere relatórios psicológicos profundos e conselhos personalizados de carreira e relacionamento em tempo real.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Affinitree Match</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Compare seu perfil com amigos ou figuras históricas para calcular índices de afinidade e sinergia interpessoal.
                </p>
              </div>
            </div>

            {/* Quick Demo Section */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Explorar com Perfis de Referência</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Prefere testar instantaneamente? Carregue um perfil simulado de figuras históricas:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PRESET_PROFILES.map((preset) => (
                  <div
                    key={preset.id}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-600 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{preset.name}</h3>
                      <p className="text-xs text-emerald-700 font-mono mt-1">{preset.archetype}</p>
                    </div>
                    <button
                      onClick={() => handleSelectPresetAsUser(preset)}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>Simular este Perfil</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <Questionnaire
            onComplete={handleCompleteQuiz}
            onCancel={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'profile' && userProfile && (
          <ProfileResults
            profile={userProfile}
            onUpdateProfile={(updated) => setUserProfile(updated)}
            onRetake={() => setActiveTab('quiz')}
            onGoToMatch={() => setActiveTab('match')}
          />
        )}

        {activeTab === 'match' && (
          <CompatibilityMatch
            userProfile={userProfile}
            onGoToQuiz={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'library' && <ArchetypeLibrary />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-6 text-center text-xs text-slate-500">
        <p>Affinitree — Inventário de Temperamento e Caráter (TCI). Traduzido e adaptado para o português do Brasil.</p>
      </footer>
    </div>
  );
}
