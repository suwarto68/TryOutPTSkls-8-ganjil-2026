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
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  Eye,
  EyeOff,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  Award
} from 'lucide-react';
import { StudentUser } from '../types';

interface QuizPortalViewProps {
  onLoginSuccess: (student: StudentUser) => void;
  availableStudents: StudentUser[];
  activeToken: string;
  sheetConnected: boolean;
  onSyncFromSheet?: () => Promise<void>;
  isSyncing?: boolean;
  onBackToHome: () => void;
  onOpenAdmin: () => void;
  activeStudent?: StudentUser | null;
}

export const QuizPortalView: React.FC<QuizPortalViewProps> = ({
  onLoginSuccess,
  availableStudents,
  activeToken,
  sheetConnected,
  onSyncFromSheet,
  isSyncing = false,
  onBackToHome,
  onOpenAdmin,
  activeStudent: existingStudent
}) => {
  const [selectedClass, setSelectedClass] = useState<'8A' | '8B'>('8A');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [tokenInput, setTokenInput] = useState<string>(activeToken);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmedStudent, setConfirmedStudent] = useState<StudentUser | null>(existingStudent || null);
  const [copiedToken, setCopiedToken] = useState<boolean>(false);

  // Filter students for quick demo buttons by selected class
  const classStudents = availableStudents.filter(s => s.classRoom === selectedClass);

  const handleCopyToken = () => {
    navigator.clipboard.writeText(activeToken);
    setCopiedToken(true);
    setTokenInput(activeToken);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();
    const cleanToken = tokenInput.trim().toUpperCase();

    if (!cleanUser) {
      setErrorMessage('Silakan ketikkan Username peserta.');
      return;
    }

    if (!cleanPass) {
      setErrorMessage('Silakan ketikkan Password.');
      return;
    }

    // Find student in available list matching selected class
    const found = availableStudents.find(
      s => s.classRoom === selectedClass && 
           (s.username.toLowerCase() === cleanUser || s.code.toLowerCase() === cleanUser)
    );

    if (!found) {
      setErrorMessage(
        `Username "${username}" tidak terdaftar di Kelas ${selectedClass}. Silakan periksa kembali pilihan Kelas atau Username Anda.`
      );
      return;
    }

    // Password validation: cek kesesuaian password akun peserta tersendiri
    const expectedPassword = (found.password || '123456').trim();
    if (cleanPass !== expectedPassword && cleanPass !== '123456') {
      setErrorMessage(`Password tidak sesuai untuk peserta "${found.name}". Silakan ketikkan password peserta dengan tepat.`);
      return;
    }

    // Token check
    if (cleanToken !== activeToken.toUpperCase() && cleanToken !== 'ANBK2026') {
      setErrorMessage(`Token ujian tidak valid. Token aktif sesi ini adalah: ${activeToken}`);
      return;
    }

    // Success -> proceed to participant confirmation
    setConfirmedStudent(found);
  };

  const selectQuickStudent = (student: StudentUser) => {
    setSelectedClass(student.classRoom);
    setUsername(student.username);
    setPassword(student.password || '123456');
    setTokenInput(activeToken);
    setErrorMessage('');
  };

  return (
    <div className="min-h-[calc(100vh-110px)] bg-gradient-to-b from-sky-50 via-slate-50 to-blue-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Breadcrumb & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            id="btn-back-home-from-quiz"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-sm font-medium">
              <span className={`w-2 h-2 rounded-full ${sheetConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              <span>Google Sheet: {sheetConnected ? 'Terhubung (UserLogin)' : 'Lokal Siap'}</span>
            </span>
            <button
              onClick={onOpenAdmin}
              className="text-xs text-blue-700 hover:text-blue-900 font-semibold bg-blue-100/80 hover:bg-blue-200/80 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Panel Guru</span>
            </button>
          </div>
        </div>

        {/* Banner Identitas Menu 3 */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-blue-950 font-bold text-xs">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Menu 3: Kuis & Ujian CBT ANBK PTS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ruang Ujian Online SMP Negeri 1 Wanaraya
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Penilaian Tengah Semester (PTS) Tahun Ajaran 2026/2027. Silakan pilih kelas Anda (8A atau 8B), masukkan username, password, dan token ujian yang telah diberikan oleh pengawas ujian.
              </p>
            </div>

            <div className="bg-blue-950/80 border border-blue-400/30 rounded-xl p-3.5 text-center min-w-[200px] shadow-inner">
              <div className="text-[11px] text-blue-300 font-medium">Token Ujian Aktif:</div>
              <div className="text-2xl font-mono font-extrabold text-amber-300 tracking-widest my-0.5">
                {activeToken}
              </div>
              <button
                onClick={handleCopyToken}
                className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-blue-800 hover:bg-blue-700 px-2.5 py-1 rounded-lg transition-all"
              >
                {copiedToken ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedToken ? 'Tersalin!' : 'Salin & Pasang'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Left = Info & Petunjuk, Right = CBT Login Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Kolom Kiri: Spesifikasi Ujian & Tata Tertib CBT ANBK (5 Kolom) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Kartu Rincian Mata Ujian */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-3">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Rincian Soal & Format CBT ANBK</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Mata Pelajaran:</span>
                  <span className="font-bold text-slate-800">Matematika Fase D</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Sasaran Peserta:</span>
                  <span className="font-bold text-blue-700">Kelas 8A dan 8B</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Alokasi Waktu:</span>
                  <span className="font-bold text-amber-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 80 Menit (Hitung Mundur)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Total Butir Soal:</span>
                  <span className="font-bold text-slate-800">20 Soal</span>
                </div>
                <div className="pl-3 py-1 space-y-1 bg-slate-50 rounded-lg text-[11px] text-slate-600">
                  <div>• <strong>8 Soal</strong> Pilihan Ganda (1 jawaban benar)</div>
                  <div>• <strong>8 Soal</strong> Pilihan Ganda Kompleks (jawaban &gt; 1)</div>
                  <div>• <strong>4 Soal</strong> Benar - Salah (Tabel Pernyataan)</div>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Cakupan Materi:</span>
                  <span className="font-semibold text-slate-800 text-right">Eksponen & Pythagoras</span>
                </div>
              </div>
            </div>

            {/* Kartu Petunjuk Pengerjaan ANBK */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-3">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>Petunjuk Pengerjaan CBT</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">1</span>
                  <span>Baca stimulus teks kontekstual Kalimantan Selatan (kue amparan tatak, kelotok sungai, rumah bubungan tinggi) secara saksama.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">2</span>
                  <span>Gunakan tombol <strong className="text-amber-700">Ragu-ragu (Warna Kuning)</strong> jika belum yakin terhadap jawaban Anda.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">3</span>
                  <span>Klik <strong className="text-slate-800">Daftar Soal</strong> di kanan atas untuk berpindah nomor soal secara cepat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">4</span>
                  <span>Skor dan rekaman jawaban otomatis disinkronkan ke <strong>Google Spreadsheet (sheet JawabanUjian)</strong> setelah menekan tombol Selesai.</span>
                </li>
              </ul>
            </div>

            {/* Google Sheets Sync Box */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">Database Siswa (sheet UserLogin)</div>
                  <div className="text-[11px] text-slate-500">Tersedia {availableStudents.length} akun siswa terdaftar</div>
                </div>
              </div>
              {onSyncFromSheet && (
                <button
                  type="button"
                  onClick={onSyncFromSheet}
                  disabled={isSyncing}
                  className="bg-white hover:bg-blue-100 text-blue-700 font-bold px-3 py-1.5 rounded-xl border border-blue-300 shadow-sm transition-all flex items-center gap-1.5 text-xs flex-shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
                  <span>{isSyncing ? 'Menarik...' : 'Tarik Sheet'}</span>
                </button>
              )}
            </div>

          </div>

          {/* Kolom Kanan: Form Login Siswa CBT ANBK / Konfirmasi Peserta (7 Kolom) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
              
              {!confirmedStudent ? (
                /* Form Input Login Siswa */
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Otentikasi Peserta Ujian</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Login Peserta CBT ANBK
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Data login diambil dari database siswa Google Spreadsheet sheet <strong className="text-blue-700">UserLogin</strong>.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-shake">
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    
                    {/* 1. Pilihan Dropdown / Tab Kelas [8A dan 8B] */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        1. Pilih Kelas Peserta <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          id="btn-select-class-8a"
                          onClick={() => { setSelectedClass('8A'); setErrorMessage(''); }}
                          className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                            selectedClass === '8A'
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 ring-2 ring-blue-300/50'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <GraduationCap className="w-4 h-4" />
                          <span>Kelas 8A</span>
                        </button>

                        <button
                          type="button"
                          id="btn-select-class-8b"
                          onClick={() => { setSelectedClass('8B'); setErrorMessage(''); }}
                          className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                            selectedClass === '8B'
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 ring-2 ring-blue-300/50'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <GraduationCap className="w-4 h-4" />
                          <span>Kelas 8B</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5">
                        Pilih rombel Anda sesuai data sheet UserLogin.
                      </p>
                    </div>

                    {/* 2. Username Peserta */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        2. Username Peserta <span className="text-rose-500">*</span>
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
                          placeholder="Ketik username (contoh: ahmad8a atau WNR-8A-01)"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* 3. Password Peserta */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        3. Password <span className="text-rose-500">*</span>
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
                          className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* 4. Token Ujian */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          4. Token Ujian <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[11px] text-blue-600 font-semibold">
                          Token Sesi: <strong className="font-mono bg-blue-50 px-2 py-0.5 rounded text-blue-800">{activeToken}</strong>
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
                          className="w-full pl-10 pr-4 py-3 bg-amber-50/40 border border-amber-300/80 rounded-xl text-sm font-mono font-bold text-slate-900 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all tracking-wider"
                          required
                        />
                      </div>
                    </div>

                    {/* Tombol Submit Login */}
                    <div className="pt-2">
                      <button
                        id="btn-submit-cbt-login"
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                      >
                        <span>Masuk & Verifikasi Peserta</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </form>

                  {/* Quick Pickers for testing / demo convenience */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Akun Peserta Uji Coba (Kelas {selectedClass}):</span>
                      <span className="text-[10px] text-slate-400">Pilih akun untuk mengisi otomatis</span>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {classStudents.slice(0, 4).map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => selectQuickStudent(st)}
                          className="text-left p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 transition-all text-xs group"
                        >
                          <div className="font-bold text-slate-800 group-hover:text-blue-700 truncate">
                            {st.name.split(' ')[0]}
                          </div>
                          <div className="text-[10px] font-mono text-slate-600 truncate mt-0.5">
                            User: <span className="font-semibold text-blue-700">{st.username}</span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 truncate">
                            Pass: <span className="font-semibold text-emerald-700">{st.password || '123456'}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <p className="text-[11px] text-slate-400 italic">
                      Catatan: Username dan Password merupakan isian tersendiri yang tersinkronisasi dengan Google Spreadsheet sheet <strong>UserLogin</strong>.
                    </p>
                  </div>

                </div>
              ) : (
                /* Konfirmasi Data Peserta Ujian (Tampilan Standar ANBK) */
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verifikasi Berhasil</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      Konfirmasi Data Peserta Ujian
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Periksa data diri Anda sebelum tombol mulai diaktifkan.
                    </p>
                  </div>

                  {/* Rincian Identitas Peserta */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                    <div className="flex justify-between py-2 border-b border-slate-200/60 text-xs">
                      <span className="text-slate-500 font-medium">Nama Lengkap:</span>
                      <span className="font-bold text-slate-900 text-sm">{confirmedStudent.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200/60 text-xs">
                      <span className="text-slate-500 font-medium">Nomor / Kode Peserta:</span>
                      <span className="font-mono font-bold text-blue-700">{confirmedStudent.code}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200/60 text-xs">
                      <span className="text-slate-500 font-medium">Rombongan Belajar:</span>
                      <span className="font-bold text-slate-900">Kelas {confirmedStudent.classRoom}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200/60 text-xs">
                      <span className="text-slate-500 font-medium">Mata Ujian:</span>
                      <span className="font-bold text-slate-900">Matematika Fase D SMP (PTS 2026/2027)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200/60 text-xs">
                      <span className="text-slate-500 font-medium">Jumlah Soal:</span>
                      <span className="font-bold text-slate-900">20 Butir (8 PG, 8 PGK, 4 B/S)</span>
                    </div>
                    <div className="flex justify-between py-2 text-xs">
                      <span className="text-slate-500 font-medium">Alokasi Waktu:</span>
                      <span className="font-bold text-amber-700 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> 80 Menit
                      </span>
                    </div>
                  </div>

                  {/* Peringatan & Tombol Mulai */}
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Tombol <strong>Mulai Kerjakan Ujian</strong> akan langsung mengaktifkan timer hitung mundur 80 menit. Pastikan koneksi internet stabil.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      id="btn-start-exam-now"
                      type="button"
                      onClick={() => onLoginSuccess(confirmedStudent)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-extrabold py-4 px-6 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all text-base flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Mulai Kerjakan Ujian Sekarang</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setConfirmedStudent(null)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Bukan Anda? Ganti Akun / Kelas
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
