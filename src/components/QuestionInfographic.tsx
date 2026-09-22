import React, { useState } from 'react';
import { 
  HelpCircle, 
  MapPin, 
  Compass, 
  Maximize2, 
  X, 
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import { InfographicData } from '../types';

interface QuestionInfographicProps {
  data: InfographicData;
  questionNumber: number;
}

export const QuestionInfographic: React.FC<QuestionInfographicProps> = ({ data, questionNumber }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const themeClasses = {
    blue: {
      border: 'border-blue-200',
      bg: 'bg-gradient-to-br from-blue-50/90 via-sky-50/50 to-white',
      badge: 'bg-blue-600 text-white',
      tag: 'bg-blue-100 text-blue-800 border-blue-200',
      accent: 'text-blue-700',
      questionBg: 'bg-blue-900 text-white border-blue-700'
    },
    emerald: {
      border: 'border-emerald-200',
      bg: 'bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white',
      badge: 'bg-emerald-600 text-white',
      tag: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      accent: 'text-emerald-700',
      questionBg: 'bg-emerald-950 text-white border-emerald-700'
    },
    amber: {
      border: 'border-amber-200',
      bg: 'bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-white',
      badge: 'bg-amber-600 text-white',
      tag: 'bg-amber-100 text-amber-900 border-amber-200',
      accent: 'text-amber-800',
      questionBg: 'bg-amber-950 text-white border-amber-700'
    },
    indigo: {
      border: 'border-indigo-200',
      bg: 'bg-gradient-to-br from-indigo-50/90 via-slate-50/50 to-white',
      badge: 'bg-indigo-600 text-white',
      tag: 'bg-indigo-100 text-indigo-900 border-indigo-200',
      accent: 'text-indigo-800',
      questionBg: 'bg-indigo-950 text-white border-indigo-700'
    },
    rose: {
      border: 'border-rose-200',
      bg: 'bg-gradient-to-br from-rose-50/90 via-pink-50/50 to-white',
      badge: 'bg-rose-600 text-white',
      tag: 'bg-rose-100 text-rose-900 border-rose-200',
      accent: 'text-rose-800',
      questionBg: 'bg-rose-950 text-white border-rose-700'
    },
    teal: {
      border: 'border-teal-200',
      bg: 'bg-gradient-to-br from-teal-50/90 via-cyan-50/50 to-white',
      badge: 'bg-teal-600 text-white',
      tag: 'bg-teal-100 text-teal-900 border-teal-200',
      accent: 'text-teal-800',
      questionBg: 'bg-teal-950 text-white border-teal-700'
    },
    orange: {
      border: 'border-orange-200',
      bg: 'bg-gradient-to-br from-orange-50/90 via-amber-50/50 to-white',
      badge: 'bg-orange-600 text-white',
      tag: 'bg-orange-100 text-orange-900 border-orange-200',
      accent: 'text-orange-800',
      questionBg: 'bg-orange-950 text-white border-orange-700'
    },
    cyan: {
      border: 'border-cyan-200',
      bg: 'bg-gradient-to-br from-cyan-50/90 via-blue-50/50 to-white',
      badge: 'bg-cyan-600 text-white',
      tag: 'bg-cyan-100 text-cyan-900 border-cyan-200',
      accent: 'text-cyan-800',
      questionBg: 'bg-cyan-950 text-white border-cyan-700'
    }
  }[data.themeColor || 'blue'];

  // Render SVG diagram representation for each visual type
  const renderDiagram = () => {
    switch (data.visualType) {
      case 'pythagoras-bridge':
        return (
          <div className="relative w-full h-48 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-slate-800">
            <svg viewBox="0 0 400 180" className="w-full h-full max-h-44">
              {/* Sungai Barito water */}
              <rect x="0" y="145" width="400" height="35" fill="#0f172a" />
              <path d="M0 145 Q100 140 200 145 T400 145 L400 180 L0 180 Z" fill="#1e3a8a" opacity="0.6" />
              
              {/* Jembatan Rumpiang deck */}
              <line x1="20" y1="140" x2="380" y2="140" stroke="#94a3b8" strokeWidth="6" />
              <line x1="20" y1="144" x2="380" y2="144" stroke="#64748b" strokeWidth="2" />
              
              {/* Tiang Pylon Tegak 24 m */}
              <line x1="80" y1="140" x2="80" y2="25" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
              <rect x="74" y="20" width="12" height="12" fill="#d97706" rx="2" />
              
              {/* Sudut Siku-Siku */}
              <path d="M80 125 L95 125 L95 140" fill="none" stroke="#e2e8f0" strokeWidth="2" />
              <circle cx="87" cy="132" r="2" fill="#e2e8f0" />
              
              {/* Jarak Horizontal 7 m */}
              <line x1="80" y1="140" x2="250" y2="140" stroke="#38bdf8" strokeWidth="4" />
              <circle cx="250" cy="140" r="5" fill="#38bdf8" />
              
              {/* Kabel Pancang Hipotenusa (Target: ?) */}
              <line x1="80" y1="25" x2="250" y2="140" stroke="#ef4444" strokeWidth="3.5" strokeDasharray="6 4" />
              
              {/* Labels */}
              <text x="35" y="85" fill="#f59e0b" fontSize="13" fontWeight="bold">Tinggi = 24 m</text>
              <text x="135" y="160" fill="#38bdf8" fontSize="13" fontWeight="bold">Alas = 7 m</text>
              
              {/* Target Hipotenusa Clue */}
              <rect x="160" y="60" width="130" height="28" rx="6" fill="#ef4444" opacity="0.9" />
              <text x="225" y="78" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Kabel (c) = ??? meter
              </text>
              
              <text x="200" y="20" fill="#94a3b8" fontSize="10" textAnchor="middle">
                Skema Segitiga Siku-siku Jembatan Rumpiang Batola
              </text>
            </svg>
          </div>
        );

      case 'sawit-harvest':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-emerald-950 to-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-emerald-800">
            <svg viewBox="0 0 400 180" className="w-full h-full max-h-44">
              {/* Trucks & Palm Oil Bunches */}
              <rect x="25" y="35" width="350" height="110" rx="14" fill="#064e3b" stroke="#10b981" strokeWidth="2" opacity="0.4" />
              
              {/* Total Panen Real */}
              <text x="200" y="65" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">
                TOTAL PRODUKSI TANDAN BUAH SEGAR (TBS) WANARAYA:
              </text>
              <text x="200" y="98" fill="#34d399" fontSize="22" fontWeight="900" textAnchor="middle" letterSpacing="1">
                14.800.000 kg
              </text>
              
              {/* Inquiry target */}
              <rect x="70" y="115" width="260" height="28" rx="8" fill="#047857" stroke="#6ee7b7" strokeWidth="1.5" />
              <text x="200" y="133" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Format Baku Ilmiah: a × 10ⁿ = [ ??? ]
              </text>
              
              <text x="200" y="162" fill="#94a3b8" fontSize="10" textAnchor="middle">
                Syarat Notasi Baku: 1 ≤ a &lt; 10, berapa nilai a dan eksponen n?
              </text>
            </svg>
          </div>
        );

      case 'pythagoras-river':
        return (
          <div className="relative w-full h-48 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-slate-800">
            <svg viewBox="0 0 400 180" className="w-full h-full max-h-44">
              {/* Aliran Sungai Barito */}
              <rect x="50" y="20" width="300" height="140" fill="#0c4a6e" rx="10" opacity="0.5" />
              <path d="M70 40 Q200 30 330 40" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              <path d="M70 90 Q200 80 330 90" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              <path d="M70 140 Q200 130 330 140" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              
              {/* Tepi Barat (Start) */}
              <circle cx="80" cy="50" r="7" fill="#22c55e" />
              <text x="45" y="55" fill="#22c55e" fontSize="11" fontWeight="bold">Start</text>
              
              {/* Lebar Sungai 60 m */}
              <line x1="80" y1="50" x2="280" y2="50" stroke="#e2e8f0" strokeWidth="2.5" strokeDasharray="4 3" />
              <text x="180" y="42" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">
                Lebar Sungai = 60 m (Arah Timur)
              </text>
              
              {/* Hanyut ke Selatan 80 m */}
              <line x1="280" y1="50" x2="280" y2="145" stroke="#f59e0b" strokeWidth="3" />
              <text x="335" y="100" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                Hanyut = 80 m
              </text>
              <text x="335" y="115" fill="#f59e0b" fontSize="9" textAnchor="middle">(Arus Selatan)</text>
              
              {/* Sudut Siku-Siku */}
              <path d="M265 50 L265 65 L280 65" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
              
              {/* Lintasan Aktual Jukung (Hipotenusa) */}
              <line x1="80" y1="50" x2="280" y2="145" stroke="#ef4444" strokeWidth="3.5" />
              <circle cx="280" cy="145" r="7" fill="#ef4444" />
              <text x="295" y="155" fill="#ef4444" fontSize="11" fontWeight="bold">Posisi Mendarat</text>
              
              {/* Target Clue */}
              <rect x="110" y="90" width="130" height="26" rx="6" fill="#ef4444" />
              <text x="175" y="107" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                Lintasan Riil = ??? meter
              </text>
            </svg>
          </div>
        );

      case 'purun-mat':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-amber-950 to-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-amber-800">
            <svg viewBox="0 0 400 180" className="w-full h-full max-h-44">
              {/* Tikar Anyaman Purun */}
              <rect x="60" y="30" width="280" height="110" rx="6" fill="#78350f" stroke="#fbbf24" strokeWidth="3" />
              
              {/* Motif Anyaman Grid */}
              <g stroke="#92400e" strokeWidth="1" opacity="0.6">
                <line x1="100" y1="30" x2="100" y2="140" />
                <line x1="140" y1="30" x2="140" y2="140" />
                <line x1="180" y1="30" x2="180" y2="140" />
                <line x1="220" y1="30" x2="220" y2="140" />
                <line x1="260" y1="30" x2="260" y2="140" />
                <line x1="300" y1="30" x2="300" y2="140" />
                <line x1="60" y1="60" x2="340" y2="60" />
                <line x1="60" y1="85" x2="340" y2="85" />
                <line x1="60" y1="110" x2="340" y2="110" />
              </g>
              
              {/* Ukuran Panjang */}
              <text x="200" y="22" fill="#fde68a" fontSize="12" fontWeight="bold" textAnchor="middle">
                Panjang (p) = (4√5 + 2√3) cm
              </text>
              
              {/* Ukuran Lebar */}
              <text x="45" y="88" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="end">
                Lebar (l) =
              </text>
              <text x="45" y="103" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="end">
                (4√5 - 2√3) cm
              </text>
              
              {/* Target Luas */}
              <rect x="130" y="70" width="140" height="32" rx="8" fill="#b45309" stroke="#fcd34d" strokeWidth="1.5" />
              <text x="200" y="91" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Luas Bidang = ??? cm²
              </text>
              
              <text x="200" y="162" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                Bentuk Sekawan Aljabar: Luas = (a + b)(a - b) = a² - b²
              </text>
            </svg>
          </div>
        );

      case 'floating-market':
        return (
          <div className="relative w-full h-48 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-cyan-800">
            <svg viewBox="0 0 400 180" className="w-full h-full max-h-44">
              {/* Air Sungai */}
              <rect x="0" y="130" width="400" height="50" fill="#0e7490" opacity="0.4" />
              <line x1="0" y1="130" x2="400" y2="130" stroke="#06b6d4" strokeWidth="2" />
              
              {/* Dermaga / Patok Tepi Sungai */}
              <rect x="30" y="40" width="24" height="90" fill="#78350f" rx="3" stroke="#b45309" strokeWidth="2" />
              <circle cx="42" cy="40" r="5" fill="#f59e0b" />
              
              {/* Perahu Jukung */}
              <path d="M280 130 L370 130 L350 150 L260 150 Z" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />
              <text x="315" y="145" fill="#ffffff" fontSize="9" textAnchor="middle">Jukung</text>
              
              {/* Tali Tambat 12 meter (Sisi Miring) */}
              <line x1="42" y1="40" x2="280" y2="130" stroke="#f43f5e" strokeWidth="3" />
              
              {/* Sudut Elevasi 30 Derajat */}
              <path d="M240 130 A 40 40 0 0 0 248 117" fill="none" stroke="#fde047" strokeWidth="2" />
              <text x="220" y="124" fill="#fde047" fontSize="12" fontWeight="bold">30°</text>
              
              {/* Tinggi Patok (Target ?) */}
              <line x1="20" y1="40" x2="20" y2="130" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              <text x="18" y="90" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="end">
                Tinggi (h) = ??? m
              </text>
              
              {/* Jarak Horizontal (Target ?) */}
              <line x1="42" y1="140" x2="280" y2="140" stroke="#22c55e" strokeWidth="2" strokeDasharray="3 3" />
              <text x="160" y="156" fill="#22c55e" fontSize="11" fontWeight="bold" textAnchor="middle">
                Jarak Horizontal = ??? m
              </text>
              
              {/* Tali Tambat Label */}
              <rect x="120" y="65" width="110" height="24" rx="6" fill="#be123c" />
              <text x="175" y="81" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                Tali Tambat = 12 m
              </text>
            </svg>
          </div>
        );

      default:
        // Diagram geometri umum / data card
        return (
          <div className="relative w-full h-44 bg-slate-900 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-4 border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                Parameter Data Lapangan Batola
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-lg">
              {data.parameters.map((param, pIdx) => (
                <div 
                  key={pIdx}
                  className={`p-2 rounded-xl text-center border ${
                    param.isUnknown 
                      ? 'bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500/50' 
                      : 'bg-slate-800/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 truncate">{param.label}</div>
                  <div className="text-xs font-mono font-bold mt-0.5">
                    {param.isUnknown ? '??? (Dihitung)' : param.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
              <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{data.inquiryNotes}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`rounded-3xl border ${themeClasses.border} ${themeClasses.bg} p-4 sm:p-5 shadow-sm space-y-3.5 transition-all`}>
      {/* Header Infografis */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${themeClasses.badge}`}>
            Infografis Soal {questionNumber}
          </span>
          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${themeClasses.tag}`}>
            <MapPin className="w-3 h-3" />
            <span>{data.localLocation}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 bg-white/80 hover:bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs transition-all cursor-pointer"
          title="Perbesar Infografis"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Perbesar</span>
        </button>
      </div>

      {/* Judul Infografis & Tag Konteks */}
      <div>
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          <span>Konteks: {data.contextTag}</span>
        </div>
        <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
          {data.title}
        </h4>
      </div>

      {/* Optional Real Photographic Asset if available */}
      {data.imageUrl && (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-inner group">
          <img 
            src={data.imageUrl} 
            alt={data.title}
            referrerPolicy="no-referrer"
            className="w-full h-44 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
            <div className="text-white text-xs">
              <span className="font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                {data.localLocation}
              </span>
              <p className="text-[11px] text-slate-200 mt-0.5 line-clamp-1">{data.contextTag}</p>
            </div>
          </div>
        </div>
      )}

      {/* Area Diagram Visual Infografis */}
      <div className="rounded-2xl overflow-hidden shadow-sm">
        {renderDiagram()}
      </div>

      {/* Parameter Kontekstual Soal */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {data.parameters.map((p, idx) => (
          <div 
            key={idx}
            className={`p-2.5 rounded-xl border text-xs transition-all ${
              p.isUnknown 
                ? 'bg-rose-50/90 border-rose-300 text-rose-900 shadow-2xs font-bold' 
                : 'bg-white/90 border-slate-200 text-slate-700'
            }`}
          >
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold truncate">
              {p.label}
            </div>
            <div className="text-sm font-mono font-extrabold mt-0.5 truncate">
              {p.isUnknown ? '??? (Dihitung)' : p.value}
            </div>
            {p.hint && (
              <div className="text-[9px] text-slate-400 mt-0.5 truncate">{p.hint}</div>
            )}
          </div>
        ))}
      </div>

      {/* KALIMAT TANYA DI GAMBAR INFOGRAFIS (Sesuai Permintaan User: Jangan ada jawaban, ditambahi kalimat tanya) */}
      <div className={`rounded-2xl p-3.5 sm:p-4 border shadow-md flex items-start gap-3 ${themeClasses.questionBg}`}>
        <div className="p-1.5 rounded-xl bg-white/20 text-white shrink-0 mt-0.5">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Teka-Teki Investigasi Lapangan:</span>
          </div>
          <p className="text-sm sm:text-base font-extrabold leading-snug text-white">
            "{data.questionPrompt}"
          </p>
          <p className="text-[11px] text-slate-300 italic pt-0.5">
            ⚠️ Infografis ini menyajikan data dan skema situasi riil di Barito Kuala tanpa mencantumkan kunci jawaban. Silakan hitung jawaban dengan teliti.
          </p>
        </div>
      </div>

      {/* MODAL ZOOM PREVIEW INFOGRAFIS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                  Infografis Lengkap No. {questionNumber}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{data.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  {data.localLocation} — {data.contextTag}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {data.imageUrl && (
              <div className="rounded-2xl overflow-hidden border">
                <img 
                  src={data.imageUrl} 
                  alt={data.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover" 
                />
              </div>
            )}

            <div>
              {renderDiagram()}
            </div>

            <div className={`p-4 rounded-2xl ${themeClasses.questionBg}`}>
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                Kalimat Tanya Penyelidikan:
              </div>
              <div className="text-lg font-bold text-white leading-relaxed">
                "{data.questionPrompt}"
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {data.parameters.map((p, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border rounded-xl">
                  <div className="text-[11px] text-slate-500 font-semibold">{p.label}</div>
                  <div className="text-base font-mono font-bold text-slate-900 mt-0.5">
                    {p.isUnknown ? '??? (Dicari)' : p.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow transition-all cursor-pointer"
              >
                Tutup Tampilan Infografis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
