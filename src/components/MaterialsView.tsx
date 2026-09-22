import React, { useState } from 'react';
import { 
  Layers, 
  ArrowLeft, 
  ExternalLink, 
  Calculator, 
  Compass, 
  Check, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  Maximize2,
  Minimize2,
  AlertCircle
} from 'lucide-react';
import { MATERIALS_DATA } from '../data/materialsData';

interface MaterialsViewProps {
  onBack: () => void;
  onGoToExam: () => void;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({
  onBack,
  onGoToExam
}) => {
  const [activeTab, setActiveTab] = useState<string>('materi-bab-1');
  const [isPosterExpanded, setIsPosterExpanded] = useState<boolean>(false);

  // Interactive Tool 1: Tripel Pythagoras & Triangle Checker
  const [sideA, setSideA] = useState<number>(3);
  const [sideB, setSideB] = useState<number>(4);
  const [sideC, setSideC] = useState<number>(5);

  // Interactive Tool 2: Bentuk Baku Converter
  const [numberInput, setNumberInput] = useState<string>('45000000');

  const currentTopic = MATERIALS_DATA.find(m => m.id === activeTab) || MATERIALS_DATA[0];

  // Helper for triangle classification
  const evaluateTriangle = () => {
    const sides = [Number(sideA), Number(sideB), Number(sideC)].sort((x, y) => x - y);
    const [a, b, c] = sides;
    if (a <= 0 || b <= 0 || c <= 0) return { type: 'Tidak Valid', desc: 'Sisi harus lebih besar dari 0', badge: 'bg-rose-100 text-rose-800' };
    if (a + b <= c) return { type: 'Bukan Segitiga', desc: 'Jumlah dua sisi terpendek harus lebih panjang dari sisi terpanjang.', badge: 'bg-rose-100 text-rose-800' };
    
    const lhs = Math.round(c * c * 100) / 100;
    const rhs = Math.round((a * a + b * b) * 100) / 100;

    if (Math.abs(lhs - rhs) < 0.001) {
      return { 
        type: 'Segitiga Siku-Siku (Tripel Pythagoras)', 
        desc: `c² = a² + b² (${lhs} = ${rhs}). Membentuk sudut siku-siku 90°.`,
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      };
    } else if (lhs < rhs) {
      return { 
        type: 'Segitiga Lancip', 
        desc: `c² < a² + b² (${lhs} < ${rhs}). Ketiga sudutnya lancip (< 90°).`,
        badge: 'bg-sky-100 text-sky-800 border-sky-300'
      };
    } else {
      return { 
        type: 'Segitiga Tumpul', 
        desc: `c² > a² + b² (${lhs} > ${rhs}). Memiliki satu sudut tumpul (> 90°).`,
        badge: 'bg-amber-100 text-amber-800 border-amber-300'
      };
    }
  };

  // Helper for Scientific Notation converter
  const evaluateScientificNotation = () => {
    const val = parseFloat(numberInput.replace(/,/g, '.'));
    if (isNaN(val) || val <= 0) return 'Masukkan bilangan positif valid';
    const exponent = Math.floor(Math.log10(val));
    const coefficient = (val / Math.pow(10, exponent)).toFixed(3);
    return `${coefficient} × 10${exponent !== 0 ? (exponent > 0 ? `^${exponent}` : `^(${exponent})`) : '^0'}`;
  };

  const triangleResult = evaluateTriangle();

  return (
    <div className="min-h-[calc(100vh-110px)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            id="btn-back-home-from-materials"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
          
          <button
            id="btn-go-to-exam-from-materials"
            onClick={onGoToExam}
            className="inline-flex items-center gap-2 text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-blue-950 px-4 py-2 rounded-xl shadow transition-all"
          >
            <span>Uji Pemahaman di CBT ANBK</span>
            <span className="bg-blue-950 text-white px-2 py-0.5 rounded-full text-[10px]">20 Soal</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="tab-materi-bab-1"
              onClick={() => setActiveTab('materi-bab-1')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'materi-bab-1'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Bab 1: Bilangan Berpangkat & Bentuk Akar</span>
            </button>
            <button
              id="tab-materi-bab-2"
              onClick={() => setActiveTab('materi-bab-2')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'materi-bab-2'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Bab 2: Teorema Pythagoras & Segitiga Istimewa</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Buku Siswa Matematika Kelas VIII Kemdikbudristek 2022
          </div>
        </div>

        {/* Poster Card Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Infografis & Media Pembelajaran Visual</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Poster Resmi: {currentTopic.title}
              </h3>
              <p className="text-xs text-blue-200">
                Tautan Sumber Poster Pengajaran: <code className="bg-blue-900/60 px-2 py-0.5 rounded text-blue-100">{currentTopic.posterUrl}</code>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={currentTopic.posterUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow"
              >
                <span>Buka Link Poster Asli</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setIsPosterExpanded(!isPosterExpanded)}
                className="p-2 rounded-xl bg-slate-800 text-blue-200 hover:text-white transition-colors"
                title={isPosterExpanded ? 'Kecilkan Tampilan' : 'Perbesar Tampilan'}
              >
                {isPosterExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Poster Preview Container */}
          <div className={`p-6 bg-slate-100 border-b border-slate-200 transition-all ${isPosterExpanded ? 'max-h-[850px]' : 'max-h-[480px]'} overflow-hidden relative flex flex-col items-center justify-center`}>
            {/* Visual Digital Infographic Board */}
            <div className="w-full max-w-4xl bg-white rounded-2xl p-6 shadow-inner border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  <span className="font-bold text-slate-800 text-sm">{currentTopic.chapter}: {currentTopic.title}</span>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-mono">
                  SMPN 1 Wanaraya 2026/2027
                </span>
              </div>

              {activeTab === 'materi-bab-1' ? (
                /* Poster Infographic Content Bab 1 */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-2">
                    <h5 className="font-bold text-blue-900 text-sm">Sifat Eksponen Utama</h5>
                    <div className="space-y-1 font-mono text-slate-800 text-[11px]">
                      <div className="p-1.5 bg-white rounded border">aᵐ × aⁿ = aᵐ⁺ⁿ</div>
                      <div className="p-1.5 bg-white rounded border">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</div>
                      <div className="p-1.5 bg-white rounded border">(aᵐ)ⁿ = aᵐⁿ</div>
                      <div className="p-1.5 bg-white rounded border">a⁰ = 1  |  a⁻ⁿ = 1/aⁿ</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                    <h5 className="font-bold text-emerald-900 text-sm">Operasi Bentuk Akar</h5>
                    <div className="space-y-1 font-mono text-slate-800 text-[11px]">
                      <div className="p-1.5 bg-white rounded border">a√m ± b√m = (a ± b)√m</div>
                      <div className="p-1.5 bg-white rounded border">√a × √b = √(a × b)</div>
                      <div className="p-1.5 bg-white rounded border">a / √b = (a√b) / b</div>
                      <div className="p-1.5 bg-white rounded border">Sekawan: (a+√b)(a-√b) = a²-b</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                    <h5 className="font-bold text-amber-900 text-sm">Bentuk Baku (Notasi Ilmiah)</h5>
                    <p className="text-[11px] text-amber-950">
                      Format: <strong>a × 10ⁿ</strong> (1 ≤ a &lt; 10)
                    </p>
                    <div className="space-y-1 text-[11px] text-slate-700">
                      <div className="p-1.5 bg-white rounded border">1 KB = 2¹⁰ Byte = 1.024 Byte</div>
                      <div className="p-1.5 bg-white rounded border">45.000.000 = 4,5 × 10⁷</div>
                      <div className="p-1.5 bg-white rounded border">0,000025 = 2,5 × 10⁻⁵</div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Poster Infographic Content Bab 2 */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 space-y-2">
                    <h5 className="font-bold text-indigo-900 text-sm">Dalil Pythagoras</h5>
                    <div className="p-2.5 bg-white rounded-lg border font-mono text-center text-sm font-bold text-indigo-700">
                      c² = a² + b²
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Pada segitiga siku-siku, luas persegi pada sisi miring sama dengan jumlah luas persegi kedua sisi siku-sikunya.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                    <h5 className="font-bold text-amber-900 text-sm">Tripel Pythagoras Populer</h5>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-center">
                      <span className="p-1 bg-white rounded border">(3, 4, 5)</span>
                      <span className="p-1 bg-white rounded border">(5, 12, 13)</span>
                      <span className="p-1 bg-white rounded border">(7, 24, 25)</span>
                      <span className="p-1 bg-white rounded border">(8, 15, 17)</span>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Rumus parameter: a = p²-q², b = 2pq, c = p²+q² (p &gt; q)
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200 space-y-2">
                    <h5 className="font-bold text-sky-900 text-sm">Segitiga Istimewa</h5>
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="p-1.5 bg-white rounded border">
                        <strong className="text-sky-700">45°-45°-90°:</strong> 1 : 1 : √2
                      </div>
                      <div className="p-1.5 bg-white rounded border">
                        <strong className="text-sky-700">30°-60°-90°:</strong> 1 : √3 : 2
                      </div>
                      <div className="p-1.5 bg-white rounded border text-[10px]">
                        Jarak Titik: d = √[(Δx)² + (Δy)²]
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center pt-2">
                <a
                  href={currentTopic.posterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline inline-flex items-center gap-1"
                >
                  Lihat poster resolusi penuh di server postimages &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections (Sesuai Buku Matematika Kelas 8 Kemendikbud) */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Rangkuman Materi & Pembahasan Konsep</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentTopic.sections.map((section, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <h4 className="text-base font-bold text-slate-900 border-b pb-2">
                  {section.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {section.description}
                </p>

                {section.formula && (
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl font-mono text-xs text-blue-900 font-semibold whitespace-pre-line">
                    {section.formula}
                  </div>
                )}

                {section.examples && section.examples.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contoh Soal & Solusi:</div>
                    {section.examples.map((ex, exIdx) => (
                      <div key={exIdx} className="bg-slate-50/70 p-3 rounded-xl text-xs space-y-1 border border-slate-100">
                        <div className="font-semibold text-slate-800">Q: {ex.problem}</div>
                        <div className="text-emerald-700 font-medium">Jawab: {ex.solution}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Lab / Calculators */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-blue-800/60 pb-4">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-amber-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Laboratorium Eksplorasi Mandiri Siswa</h3>
              <p className="text-xs text-blue-200">Uji langsung angka dan rumus untuk membuktikan kebenaran sifat matematika</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tool 1: Uji Jenis Segitiga & Tripel Pythagoras */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-amber-300">Uji Teorema & Tripel Pythagoras</h4>
                <span className="text-[11px] text-blue-200">Bab 2</span>
              </div>
              <p className="text-xs text-blue-100">
                Masukkan 3 sisi segitiga untuk memeriksa apakah membentuk segitiga siku-siku, lancip, atau tumpul.
              </p>

              <div className="grid grid-cols-3 gap-2 text-slate-800">
                <div>
                  <label className="block text-[10px] font-bold text-blue-200 mb-1">Sisi a</label>
                  <input
                    type="number"
                    value={sideA}
                    onChange={(e) => setSideA(Number(e.target.value))}
                    className="w-full bg-white rounded-lg px-2.5 py-1.5 text-xs font-bold border text-slate-800 focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-blue-200 mb-1">Sisi b</label>
                  <input
                    type="number"
                    value={sideB}
                    onChange={(e) => setSideB(Number(e.target.value))}
                    className="w-full bg-white rounded-lg px-2.5 py-1.5 text-xs font-bold border text-slate-800 focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-blue-200 mb-1">Sisi c</label>
                  <input
                    type="number"
                    value={sideC}
                    onChange={(e) => setSideC(Number(e.target.value))}
                    className="w-full bg-white rounded-lg px-2.5 py-1.5 text-xs font-bold border text-slate-800 focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>
              </div>

              <div className="pt-1">
                <div className={`p-3 rounded-xl border text-xs space-y-1 ${triangleResult.badge}`}>
                  <div className="font-bold">{triangleResult.type}</div>
                  <div className="text-[11px] opacity-90">{triangleResult.desc}</div>
                </div>
              </div>
            </div>

            {/* Tool 2: Kalkulator Bentuk Baku */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-amber-300">Generator Bentuk Baku (Notasi Ilmiah)</h4>
                <span className="text-[11px] text-blue-200">Bab 1</span>
              </div>
              <p className="text-xs text-blue-100">
                Ubah bilangan besar atau desimal kecil menjadi notasi baku <code>a × 10ⁿ</code> (1 ≤ a &lt; 10).
              </p>

              <div>
                <label className="block text-[10px] font-bold text-blue-200 mb-1">Ketikkan Bilangan Biasa</label>
                <input
                  type="text"
                  value={numberInput}
                  onChange={(e) => setNumberInput(e.target.value)}
                  placeholder="Contoh: 14800000 atau 0.000025"
                  className="w-full bg-white rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-800 border focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>

              <div className="p-3 bg-blue-950/70 border border-blue-700/50 rounded-xl space-y-1">
                <div className="text-[10px] uppercase font-bold text-blue-300">Hasil Notasi Ilmiah:</div>
                <div className="text-base font-mono font-extrabold text-amber-300">
                  {evaluateScientificNotation()}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
