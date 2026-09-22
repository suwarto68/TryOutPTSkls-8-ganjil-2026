import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Key, 
  ArrowLeft, 
  Sparkles,
  ChevronRight,
  Calculator,
  Compass
} from 'lucide-react';
import { LEARNING_OBJECTIVES } from '../data/learningObjectives';

interface ObjectivesViewProps {
  onBack: () => void;
  onNavigateToMaterials: () => void;
  onStartExam: () => void;
}

export const ObjectivesView: React.FC<ObjectivesViewProps> = ({
  onBack,
  onNavigateToMaterials,
  onStartExam
}) => {
  const [activeTab, setActiveTab] = useState<string>('bab-1');

  const selectedObjective = LEARNING_OBJECTIVES.find(o => o.id === activeTab) || LEARNING_OBJECTIVES[0];

  return (
    <div className="min-h-[calc(100vh-110px)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            id="btn-back-home-from-objectives"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
          <div className="text-xs text-slate-500">
            Kurikulum Merdeka • Fase D Matematika SMP Kelas 8
          </div>
        </div>

        {/* Header Title */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold text-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Menu 1: Tujuan Pembelajaran</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Capaian dan Tujuan Pembelajaran Semester Ganjil
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
            Sesuai panduan kurikulum matematika SMP/MTs Kelas 8 Kemendikbudristek 2022, materi Penilaian Tengah Semester (PTS) TA 2026/2027 difokuskan pada penguasaan konsep <strong>Elemen Bilangan (Bilangan Berpangkat & Bentuk Akar)</strong> serta <strong>Elemen Geometri & Pengukuran (Teorema Pythagoras)</strong>.
          </p>

          {/* Chapter Tabs */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
            {LEARNING_OBJECTIVES.map((obj) => (
              <button
                key={obj.id}
                onClick={() => setActiveTab(obj.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === obj.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {obj.id === 'bab-1' ? <Calculator className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
                <span>{obj.chapter}: {obj.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Goals Column (2 cols) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Target Kompetensi yang Harus Dikuasai</span>
                </h3>
                <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-full">
                  {selectedObjective.goals.length} Indikator
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {selectedObjective.goals.map((goal, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-blue-50/50 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-700 leading-snug">{goal}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pertanyaan Pemantik */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-2xl p-6 border border-amber-200/70 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Pertanyaan Pemantik Berpikir Kritis</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-amber-950/90 pl-1">
                {selectedObjective.essentialQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Column (1 col) */}
          <div className="space-y-6">
            
            {/* Metadata Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-slate-400">
                Informasi Kurikulum
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-slate-500">Elemen:</div>
                  <div className="font-bold text-slate-800 text-sm">{selectedObjective.element}</div>
                </div>
                <div>
                  <div className="text-slate-500">Sub-Elemen:</div>
                  <div className="font-semibold text-slate-700">{selectedObjective.subElement}</div>
                </div>
                <div>
                  <div className="text-slate-500">Tingkat Kelas:</div>
                  <div className="font-semibold text-slate-700">SMP Kelas 8 (Fase D)</div>
                </div>
                <div>
                  <div className="text-slate-500">Tahun Ajaran:</div>
                  <div className="font-semibold text-blue-700 font-mono">2026/2027</div>
                </div>
              </div>
            </div>

            {/* Kata Kunci */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <Key className="w-4 h-4 text-indigo-600" />
                <span>Kata Kunci Utama</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedObjective.keywords.map((kw, idx) => (
                  <span 
                    key={idx} 
                    className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-indigo-100"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-blue-600 text-white rounded-2xl p-5 shadow-md space-y-3">
              <h4 className="font-bold text-sm">Siap Mempelajari Materi?</h4>
              <p className="text-xs text-blue-100">
                Akses rangkuman rumus, contoh soal, dan poster pembelajaran Bab ini.
              </p>
              <div className="pt-1 space-y-2">
                <button
                  onClick={onNavigateToMaterials}
                  className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Buka Materi & Poster</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onStartExam}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-blue-950 font-extrabold text-xs py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Uji Kemampuan di CBT ANBK</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
