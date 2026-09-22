import React, { useState } from 'react';
import { 
  Question, 
  StudentUser, 
  StudentAnswer 
} from '../types';
import { 
  Grid, 
  AlertTriangle, 
  CheckSquare, 
  Square, 
  CheckCircle2, 
  HelpCircle, 
  Send, 
  ArrowLeft, 
  ArrowRight, 
  Type, 
  Flag,
  FileText,
  X,
  Clock,
  Layers
} from 'lucide-react';

interface ExamRoomProps {
  questions: Question[];
  student: StudentUser;
  studentAnswers: Record<number, StudentAnswer>;
  onAnswerChange: (questionId: number, answer: Partial<StudentAnswer>) => void;
  onSubmitExam: () => void;
  timerSeconds: number;
}

export const ExamRoom: React.FC<ExamRoomProps> = ({
  questions,
  student,
  studentAnswers,
  onAnswerChange,
  onSubmitExam,
  timerSeconds
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isQuestionListOpen, setIsQuestionListOpen] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState<boolean>(false);

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const currentAnswer = studentAnswers[currentQ.id] || {
    questionId: currentQ.id,
    type: currentQ.type,
    isDoubtful: false
  };

  // Calculate statistics
  const totalQuestions = questions.length;
  const answeredCount = questions.filter(q => {
    const a = studentAnswers[q.id];
    if (!a) return false;
    if (q.type === 'pg') return !!a.pgAnswer;
    if (q.type === 'pgk') return Array.isArray(a.pgkAnswers) && a.pgkAnswers.length > 0;
    if (q.type === 'bs') {
      const bsAns = a.bsAnswers || {};
      const requiredStatements = q.bsStatements || [];
      return requiredStatements.every(s => typeof bsAns[s.id] === 'boolean');
    }
    return false;
  }).length;

  const doubtfulCount = questions.filter(q => studentAnswers[q.id]?.isDoubtful).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Handlers for answers
  const handleSelectPG = (optionId: string) => {
    onAnswerChange(currentQ.id, {
      questionId: currentQ.id,
      type: 'pg',
      pgAnswer: optionId
    });
  };

  const handleTogglePGK = (optionId: string) => {
    const existing = currentAnswer.pgkAnswers || [];
    let updated: string[];
    if (existing.includes(optionId)) {
      updated = existing.filter(id => id !== optionId);
    } else {
      updated = [...existing, optionId];
    }
    onAnswerChange(currentQ.id, {
      questionId: currentQ.id,
      type: 'pgk',
      pgkAnswers: updated
    });
  };

  const handleSelectBS = (statementId: string, choice: boolean) => {
    const existing = currentAnswer.bsAnswers || {};
    const updated = {
      ...existing,
      [statementId]: choice
    };
    onAnswerChange(currentQ.id, {
      questionId: currentQ.id,
      type: 'bs',
      bsAnswers: updated
    });
  };

  const handleToggleDoubtful = () => {
    onAnswerChange(currentQ.id, {
      isDoubtful: !currentAnswer.isDoubtful
    });
  };

  // Text size classes
  const fontClassMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div id="cbt-anbk-viewport" className="min-h-[calc(100vh-100px)] bg-slate-100 flex flex-col justify-between">
      
      {/* ANBK Control Sub-Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 shadow-sm sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Question Badge & Level */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-700 text-white font-extrabold px-3 py-1 rounded-xl text-sm shadow-sm">
              SOAL NO. {currentIndex + 1}
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-lg border border-slate-200">
                {currentQ.type === 'pg' ? 'Pilihan Ganda' : currentQ.type === 'pgk' ? 'Pilihan Ganda Kompleks' : 'Benar / Salah'}
              </span>
              <span className="bg-indigo-50 text-indigo-700 font-medium px-2.5 py-1 rounded-lg border border-indigo-100">
                Level: {currentQ.level}
              </span>
            </div>
          </div>

          {/* Center: Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[11px] font-bold text-slate-600">
                Dijawab: <span className="text-blue-700">{answeredCount}</span> / {totalQuestions} Soal
              </span>
            </div>
            <div className="w-32 sm:w-44 bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700">{progressPercent}%</span>
          </div>

          {/* Right: Font Switcher & Daftar Soal Drawer Button */}
          <div className="flex items-center gap-2">
            {/* Font switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 rounded font-medium ${fontSize === 'sm' ? 'bg-white shadow text-blue-700 font-bold' : 'text-slate-600'}`}
                title="Ukuran Teks Kecil"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('md')}
                className={`px-2 py-1 rounded font-medium ${fontSize === 'md' ? 'bg-white shadow text-blue-700 font-bold' : 'text-slate-600'}`}
                title="Ukuran Teks Normal"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 rounded font-medium ${fontSize === 'lg' ? 'bg-white shadow text-blue-700 font-bold' : 'text-slate-600'}`}
                title="Ukuran Teks Besar"
              >
                A+
              </button>
            </div>

            {/* Daftar Soal Button */}
            <button
              id="btn-open-question-list"
              onClick={() => setIsQuestionListOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Grid className="w-4 h-4" />
              <span>Daftar Soal</span>
              {doubtfulCount > 0 && (
                <span className="bg-amber-400 text-blue-950 px-1.5 py-0.2 text-[10px] rounded-full font-bold">
                  {doubtfulCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ANBK Split Layout: Kiri Teks/Gambar Stimulus, Kanan Pilihan Jawaban */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* SISI KIRI (6 / 12 atau 7 / 12): Teks Stimulus, Infografis & Soal */}
          <div 
            id="cbt-stimulus-panel" 
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5"
          >
            {/* Stimulus Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                <FileText className="w-3.5 h-3.5" />
                <span>{currentQ.stimulusBadge || 'Stimulus Kontekstual'}</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Topik: {currentQ.topic} ({currentQ.subElement})
              </span>
            </div>

            {/* Stimulus Title */}
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
              {currentQ.stimulusTitle}
            </h3>

            {/* Stimulus Reading Text ~100 words */}
            <div className={`text-slate-700 leading-relaxed font-normal bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-100 text-justify ${fontClassMap[fontSize]}`}>
              {currentQ.stimulusText}
            </div>

            {/* Pertanyaan Inti */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Pertanyaan No. {currentIndex + 1}</span>
              </div>
              <p className={`font-bold text-slate-900 leading-snug ${fontClassMap[fontSize]}`}>
                {currentQ.questionText}
              </p>
            </div>
          </div>

          {/* SISI KANAN (5 / 12): Pilihan Jawaban */}
          <div 
            id="cbt-answers-panel" 
            className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4"
          >
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                Lembar Jawaban Peserta
              </h4>
              <span className="text-xs font-semibold text-slate-500">
                {currentQ.type === 'pg' ? '(Pilih 1 Opsi)' : currentQ.type === 'pgk' ? '(Centang Semua Jawaban Benar)' : '(Pilih Benar/Salah)'}
              </span>
            </div>

            {/* TIPE 1: PILIHAN GANDA (1 JAWABAN BENAR) */}
            {currentQ.type === 'pg' && currentQ.pgOptions && (
              <div className="space-y-3 pt-1">
                {currentQ.pgOptions.map((opt) => {
                  const isSelected = currentAnswer.pgAnswer === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectPG(opt.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-md ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-xl font-extrabold text-sm flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {opt.id}
                      </span>
                      <span className={`pt-1 font-medium ${fontClassMap[fontSize]}`}>
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* TIPE 2: PILIHAN GANDA KOMPLEKS (LEBIH DARI SATU JAWABAN BENAR) */}
            {currentQ.type === 'pgk' && currentQ.pgkOptions && (
              <div className="space-y-3 pt-1">
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                  Centang semua kotak pada pernyataan yang menurut Anda bernilai benar.
                </div>
                {currentQ.pgkOptions.map((opt) => {
                  const isChecked = (currentAnswer.pgkAnswers || []).includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleTogglePGK(opt.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="pt-0.5 text-blue-600 flex-shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 fill-blue-600 text-white" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-xs text-blue-700 uppercase tracking-wider block">
                          Pilihan {opt.id}
                        </span>
                        <span className={`font-medium ${fontClassMap[fontSize]}`}>
                          {opt.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* TIPE 3: BETUL BENAR - SALAH (3 PERNYATAAN DENGAN RADIO BENAR/SALAH) */}
            {currentQ.type === 'bs' && currentQ.bsStatements && (
              <div className="space-y-4 pt-1">
                <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-medium">
                  Tentukan apakah setiap pernyataan di bawah ini <strong>BENAR</strong> atau <strong>SALAH</strong>.
                </div>

                <div className="space-y-3">
                  {currentQ.bsStatements.map((stmt, sIdx) => {
                    const ans = (currentAnswer.bsAnswers || {})[stmt.id];
                    return (
                      <div 
                        key={stmt.id} 
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
                      >
                        <div className="text-xs font-bold text-indigo-800">
                          Pernyataan {sIdx + 1}:
                        </div>
                        <div className={`text-slate-800 font-medium ${fontClassMap[fontSize]}`}>
                          {stmt.statement}
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleSelectBS(stmt.id, true)}
                            className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border flex items-center justify-center gap-1.5 ${
                              ans === true
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-emerald-50'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>BENAR</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => handleSelectBS(stmt.id, false)}
                            className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border flex items-center justify-center gap-1.5 ${
                              ans === false
                                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-rose-50'
                            }`}
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>SALAH</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      {/* CBT ANBK FOOTER NAVIGATION: Merah (Sebelumnya), Kuning (Ragu-ragu), Biru (Berikutnya) */}
      <footer id="cbt-navigation-footer" className="bg-white border-t border-slate-200 px-4 sm:px-6 py-4 shadow-lg sticky bottom-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Tombol Merah: Soal Sebelumnya */}
          <button
            id="btn-cbt-prev"
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className={`px-5 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all flex items-center gap-2 ${
              currentIndex === 0
                ? 'bg-rose-300 cursor-not-allowed shadow-none'
                : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20 active:scale-95'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Soal Sebelumnya</span>
          </button>

          {/* Tombol Kuning: Ragu-Ragu (ANBK Style) */}
          <button
            id="btn-cbt-doubtful"
            onClick={handleToggleDoubtful}
            className={`px-5 py-3 rounded-xl font-extrabold text-sm transition-all flex items-center gap-2 shadow-md ${
              currentAnswer.isDoubtful
                ? 'bg-amber-400 text-blue-950 ring-4 ring-amber-300/50 shadow-amber-400/30'
                : 'bg-amber-300 hover:bg-amber-400 text-blue-950 shadow-amber-300/20'
            }`}
          >
            <Flag className={`w-4 h-4 ${currentAnswer.isDoubtful ? 'fill-blue-950' : ''}`} />
            <span>{currentAnswer.isDoubtful ? 'Tersimpan Ragu-Ragu' : 'Ragu-Ragu'}</span>
          </button>

          {/* Tombol Biru: Soal Berikutnya ATAU Tombol Selesai Ujian */}
          {currentIndex < totalQuestions - 1 ? (
            <button
              id="btn-cbt-next"
              onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Soal Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="btn-cbt-finish"
              onClick={() => setShowSubmitConfirmModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 active:scale-95 animate-bounce"
            >
              <Send className="w-4 h-4" />
              <span>Selesai & Kumpulkan</span>
            </button>
          )}

        </div>
      </footer>

      {/* MODAL DAFTAR SOAL (GRID 1 - 20 DENGAN WARNA ANBK) */}
      {isQuestionListOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6">
            
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Grid className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-lg text-slate-900">Daftar Nomor Soal Ujian</h3>
              </div>
              <button
                onClick={() => setIsQuestionListOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Color legend */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-blue-600 inline-block"></span>
                <span>Sudah Dijawab ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-amber-400 inline-block"></span>
                <span>Ragu-ragu ({doubtfulCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-white border border-slate-300 inline-block"></span>
                <span>Belum Dijawab ({totalQuestions - answeredCount})</span>
              </div>
            </div>

            {/* Grid 20 Buttons */}
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-3 max-h-72 overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const ans = studentAnswers[q.id];
                const isDoubt = !!ans?.isDoubtful;
                const isAns = (() => {
                  if (!ans) return false;
                  if (q.type === 'pg') return !!ans.pgAnswer;
                  if (q.type === 'pgk') return Array.isArray(ans.pgkAnswers) && ans.pgkAnswers.length > 0;
                  if (q.type === 'bs') {
                    const bsAns = ans.bsAnswers || {};
                    return (q.bsStatements || []).every(s => typeof bsAns[s.id] === 'boolean');
                  }
                  return false;
                })();

                const isCurrent = idx === currentIndex;

                let colorClasses = 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100';
                if (isDoubt) {
                  colorClasses = 'bg-amber-400 text-blue-950 font-extrabold border-amber-500 shadow-sm';
                } else if (isAns) {
                  colorClasses = 'bg-blue-600 text-white font-bold border-blue-700 shadow-sm';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsQuestionListOpen(false);
                    }}
                    className={`py-3 px-2 rounded-2xl border text-sm font-mono flex flex-col items-center justify-center transition-all ${colorClasses} ${
                      isCurrent ? 'ring-4 ring-blue-400/50 scale-105 font-black z-10' : ''
                    }`}
                  >
                    <span className="text-base font-bold">{idx + 1}</span>
                    <span className="text-[10px] uppercase font-sans opacity-80">
                      {isDoubt ? 'Ragu' : isAns ? 'Terjawab' : '-'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions inside modal */}
            <div className="pt-2 flex items-center justify-between border-t">
              <button
                onClick={() => setIsQuestionListOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
              >
                Tutup
              </button>

              <button
                onClick={() => {
                  setIsQuestionListOpen(false);
                  setShowSubmitConfirmModal(true);
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow"
              >
                Kumpulkan Ujian Sekarang
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI PENGUMPULAN UJIAN */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-xl font-extrabold text-slate-900">
                Konfirmasi Selesai Ujian
              </h3>
              <p className="text-xs text-slate-600">
                Apakah Anda yakin ingin mengakhiri sesi ujian ini? Setelah dikumpulkan, jawaban tidak dapat diubah kembali.
              </p>
            </div>

            {/* Warning summary if empty or doubtful */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Nama Siswa:</span>
                <span className="font-bold text-slate-900">{student.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Soal Terjawab:</span>
                <span className="font-bold text-emerald-600">{answeredCount} dari {totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Status Ragu-Ragu:</span>
                <span className={`font-bold ${doubtfulCount > 0 ? 'text-amber-600' : 'text-slate-600'}`}>
                  {doubtfulCount} Soal
                </span>
              </div>

              {doubtfulCount > 0 && (
                <div className="p-2 rounded-lg bg-amber-50 text-amber-800 text-[11px] font-medium border border-amber-200">
                  ⚠️ Peringatan: Masih ada {doubtfulCount} nomor dengan status ragu-ragu. Jawaban tetap akan dinilai.
                </div>
              )}

              {answeredCount < totalQuestions && (
                <div className="p-2 rounded-lg bg-rose-50 text-rose-800 text-[11px] font-medium border border-rose-200">
                  ⚠️ Ada {totalQuestions - answeredCount} soal yang belum dijawab sama sekali.
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirmModal(false)}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Cek Kembali
              </button>

              <button
                id="btn-confirm-final-submit"
                type="button"
                onClick={() => {
                  setShowSubmitConfirmModal(false);
                  onSubmitExam();
                }}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/25 transition-all"
              >
                Ya, Kumpulkan Jawaban
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
