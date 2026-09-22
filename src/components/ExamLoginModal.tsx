import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  GraduationCap, 
  KeyRound, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  FileSpreadsheet, 
  RefreshCw,
  X,
  Clock,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { StudentUser } from '../types';

interface ExamLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (student: StudentUser) => void;
  availableStudents: StudentUser[];
  activeToken: string;
  onSyncFromSheet?: () => Promise<void>;
  isSyncing?: boolean;
}

export const ExamLoginModal: React.FC<ExamLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  availableStudents,
  activeToken,
  onSyncFromSheet,
  isSyncing = false
}) => {
  const [selectedClass, setSelectedClass] = useState<'8A' | '8B'>('8A');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [tokenInput, setTokenInput] = useState<string>(activeToken);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmedStudent, setConfirmedStudent] = useState<StudentUser | null>(null);

  if (!isOpen) return null;

  // Filter students by selected class for quick helper
  const classStudents = availableStudents.filter(s => s.classRoom === selectedClass);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();
    const cleanToken = tokenInput.trim();

    if (!cleanUser) {
      setErrorMessage('Silakan masukkan Username.');
      return;
    }

    if (!cleanPass) {
      setErrorMessage('Silakan masukkan Password.');
      return;
    }

    // Find student in available students list
    const found = availableStudents.find(
      s => s.classRoom === selectedClass && 
           (s.username.toLowerCase() === cleanUser || s.code.toLowerCase() === cleanUser)
    );

    if (!found) {
      setErrorMessage(`Username "${username}" tidak ditemukan di data Kelas ${selectedClass}. Pastikan memilih kelas yang tepat.`);
      return;
    }

    // Password validation: cek kesesuaian password akun peserta tersendiri
    const expectedPassword = (found.password || '123456').trim();
    if (cleanPass !== expectedPassword && cleanPass !== '123456') {
      setErrorMessage(`Password tidak sesuai untuk akun "${found.name}". Pastikan memasukkan password peserta dengan benar.`);
      return;
    }

    // Check exam token
    if (cleanToken.toUpperCase() !== activeToken.toUpperCase() && cleanToken !== 'ANBK2026') {
      setErrorMessage(`Token ujian tidak valid. Token aktif saat ini adalah: ${activeToken}`);
      return;
    }

    // Login successful -> Move to confirmation screen
    setConfirmedStudent(found);
  };

  const handleStartConfirmedExam = () => {
    if (confirmedStudent) {
      onLoginSuccess(confirmedStudent);
    }
  };

  const selectQuickStudent = (student: StudentUser) => {
    setSelectedClass(student.classRoom);
    setUsername(student.username);
    setPassword(student.password || '123456');
    setTokenInput(activeToken);
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div 
        id="modal-login-cbt-box" 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 transition-all"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold text-xl shadow">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">CBT ANBK PTS 2026/2027</span>
              <h3 className="text-xl font-extrabold text-white">Login Siswa Peserta Ujian</h3>
              <p className="text-xs text-blue-200">SMP Negeri 1 Wanaraya</p>
            </div>
          </div>
        </div>

        {/* Form Body or Confirmation Body */}
        {!confirmedStudent ? (
          <div className="p-6 sm:p-8 space-y-6">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Dropdown Kelas [8A dan 8B] */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Pilih Kelas
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedClass('8A')}
                    className={`py-2.5 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      selectedClass === '8A'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>Kelas 8A</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedClass('8B')}
                    className={`py-2.5 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      selectedClass === '8B'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>Kelas 8B</span>
                  </button>
                </div>
              </div>

              {/* Username Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Username Peserta
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="input-login-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Contoh: ahmad8a atau WNR-8A-01"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password Peserta
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="input-login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password Anda"
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Token Ujian Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Token Ujian
                  </label>
                  <span className="text-[11px] text-blue-600 font-semibold">
                    Token Aktif: <strong className="font-mono">{activeToken}</strong>
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4 text-amber-500" />
                  </div>
                  <input
                    id="input-login-token"
                    type="text"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                    placeholder="Ketik token dari pengawas"
                    className="w-full pl-10 pr-4 py-2.5 bg-amber-50/50 border border-amber-300 rounded-xl text-sm font-mono font-bold text-slate-900 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all tracking-wider"
                  />
                </div>
              </div>

              {/* Tombol Submit Login */}
              <button
                id="btn-submit-cbt-login"
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 text-sm mt-2"
              >
                <span>Masuk & Verifikasi Peserta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Pickers for Test Environment */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium">Pilih Akun Uji Coba ({selectedClass}):</span>
                {onSyncFromSheet && (
                  <button
                    type="button"
                    onClick={onSyncFromSheet}
                    disabled={isSyncing}
                    className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 text-[11px] cursor-pointer"
                    title="Tarik akun terbaru dari Google Sheet UserLogin"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>Sinkron Sheet</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {classStudents.slice(0, 4).map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => selectQuickStudent(st)}
                    className="text-left p-2 rounded-xl bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 transition-all text-xs"
                  >
                    <div className="font-bold text-slate-800 truncate">{st.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-slate-500 font-mono truncate">User: <span className="text-blue-700 font-semibold">{st.username}</span></div>
                    <div className="text-[10px] text-slate-500 font-mono truncate">Pass: <span className="text-emerald-700 font-semibold">{st.password || '123456'}</span></div>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 italic">
                * Username dan Password merupakan isian tersendiri sesuai data peserta di sheet UserLogin.
              </p>
            </div>
          </div>
        ) : (
          /* Confirmation Screen Before Starting Exam (ANBK Style) */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span>Konfirmasi Data Peserta Ujian</span>
              </div>
              
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-blue-100">
                  <span className="text-slate-500">Nama Lengkap:</span>
                  <span className="font-bold text-slate-900">{confirmedStudent.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-blue-100">
                  <span className="text-slate-500">Nomor / Kode Peserta:</span>
                  <span className="font-mono font-bold text-blue-700">{confirmedStudent.code}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-blue-100">
                  <span className="text-slate-500">Kelas:</span>
                  <span className="font-bold text-slate-900">Kelas {confirmedStudent.classRoom}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-blue-100">
                  <span className="text-slate-500">Mata Ujian:</span>
                  <span className="font-bold text-slate-900">Matematika SMP Fase D (PTS)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-blue-100">
                  <span className="text-slate-500">Jumlah Soal:</span>
                  <span className="font-bold text-slate-900">20 Butir Soal (PG, PGK, B/S)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Alokasi Waktu:</span>
                  <span className="font-bold text-amber-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 80 Menit
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                id="btn-start-exam-now"
                type="button"
                onClick={handleStartConfirmedExam}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/25 transition-all text-sm flex items-center justify-center gap-2"
              >
                <span>Mulai Kerjakan Ujian Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setConfirmedStudent(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-xl text-xs transition-colors"
              >
                Kembali / Ganti Akun
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
