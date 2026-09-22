import React, { useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet, 
  Home, 
  RotateCcw, 
  ShieldCheck, 
  User,
  ArrowRight,
  Printer,
  RefreshCw,
  HelpCircle,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExamResult } from '../types';

interface ExamResultViewProps {
  result: ExamResult;
  onGoHome: () => void;
  onRetrySyncToSheet: () => Promise<void>;
  isSyncing: boolean;
}

export const ExamResultView: React.FC<ExamResultViewProps> = ({
  result,
  onGoHome,
  onRetrySyncToSheet,
  isSyncing
}) => {
  useEffect(() => {
    // Fire confetti for student completion
    if (result.score >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [result.score]);

  const durationMin = Math.floor(result.durationSeconds / 60);
  const durationSec = result.durationSeconds % 60;

  const getPredicate = (score: number) => {
    if (score >= 85) return { text: 'Sangat Memuaskan (Capaian Mahir)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 70) return { text: 'Baik (Capaian Cakap)', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (score >= 50) return { text: 'Cukup (Capaian Dasar)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { text: 'Perlu Pendampingan Khusus', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const predicate = getPredicate(result.score);

  return (
    <div className="min-h-[calc(100vh-110px)] bg-gradient-to-b from-blue-50/50 via-slate-50 to-sky-50 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Main Certificate Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 text-center relative overflow-hidden">
          
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-900 flex items-center justify-center mx-auto shadow-lg shadow-amber-400/20">
            <Award className="w-11 h-11" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full uppercase tracking-wider">
              Ujian Selesai Dikerjakan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Hasil Penilaian Tengah Semester (PTS) CBT ANBK
            </h2>
            <p className="text-sm text-slate-600">
              SMP Negeri 1 Wanaraya • Tahun Ajaran 2026/2027
            </p>
          </div>

          {/* Score Display */}
          <div className="py-4">
            <div className="inline-flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-blue-950 text-white px-10 py-6 rounded-3xl shadow-inner border border-blue-800">
              <span className="text-xs uppercase tracking-widest text-blue-200 font-semibold mb-1">
                Skor Akhir Siswa
              </span>
              <div className="text-5xl sm:text-6xl font-extrabold font-mono text-amber-400 tracking-tight">
                {result.score}
              </div>
              <span className="text-xs text-blue-300 mt-1 font-medium">
                Skala Maksimal 100
              </span>
            </div>
          </div>

          {/* Predicate */}
          <div className={`inline-block px-4 py-2 rounded-2xl border text-xs sm:text-sm font-bold ${predicate.color}`}>
            Kategori: {predicate.text}
          </div>

          {/* Student & Metrics Detail Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">Nama Peserta</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">{result.name}</div>
              <div className="text-[10px] text-blue-600 font-semibold">{result.studentCode}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">Kelas / Rombel</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">Kelas {result.classRoom}</div>
              <div className="text-[10px] text-slate-500">Matematika Fase D</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">Jawaban Benar</div>
              <div className="text-xs sm:text-sm font-bold text-emerald-600">
                {result.totalCorrect} / {result.totalQuestions} Soal
              </div>
              <div className="text-[10px] text-slate-500">
                {Math.round((result.totalCorrect / result.totalQuestions) * 100)}% Ketepatan
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">Waktu Pengerjaan</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                {durationMin}m {durationSec}s
              </div>
              <div className="text-[10px] text-slate-500">Alokasi 80 Menit</div>
            </div>
          </div>

          {/* Google Spreadsheet Integration Status */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sinkronisasi Google Spreadsheet (Sheet "JawabanUjian")</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Data nilai, durasi, dan rincian jawaban nomor 1-20 telah dicatat di database panitia PTS.
                </p>
              </div>
            </div>

            <button
              onClick={onRetrySyncToSheet}
              disabled={isSyncing}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-white px-3 py-1.5 rounded-lg border border-emerald-300 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Kirim Ulang Data</span>
            </button>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Hasil</span>
            </button>

            <button
              onClick={onGoHome}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
