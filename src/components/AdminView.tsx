import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  FileSpreadsheet, 
  Settings, 
  Key, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Upload, 
  RefreshCw, 
  Plus, 
  Copy, 
  Check, 
  ArrowLeft, 
  Trash2, 
  ExternalLink,
  BookOpen,
  Wifi,
  WifiOff,
  Eye,
  EyeOff,
  Lock,
  Search,
  Filter,
  Printer
} from 'lucide-react';
import { StudentUser, ExamResult, ExamConfig, Question } from '../types';
import { COMPLETE_GOOGLE_APPS_SCRIPT, saveStudentToSheet } from '../services/sheetService';

interface AdminViewProps {
  isAuthenticated: boolean;
  onAuthenticate: (password: string) => boolean;
  onBack: () => void;
  students: StudentUser[];
  onAddStudent: (newStudent: StudentUser) => void;
  onDeleteStudent: (id: string) => void;
  onSyncStudentsFromSheet: () => Promise<void>;
  isSyncingStudents: boolean;
  examResults: ExamResult[];
  onClearResults: () => void;
  config: ExamConfig;
  onUpdateConfig: (newConfig: ExamConfig) => void;
  onTestConnection: (url?: string) => Promise<{ connected: boolean; message: string }>;
  isTestingConnection: boolean;
  sheetConnected: boolean;
  connectionMessage: string;
  questions: Question[];
  initialTab?: 'users' | 'results' | 'settings' | 'script';
  onLock?: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  isAuthenticated,
  onAuthenticate,
  onBack,
  students,
  onAddStudent,
  onDeleteStudent,
  onSyncStudentsFromSheet,
  isSyncingStudents,
  examResults,
  onClearResults,
  config,
  onUpdateConfig,
  onTestConnection,
  isTestingConnection,
  sheetConnected,
  connectionMessage,
  questions,
  initialTab = 'users',
  onLock
}) => {
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'users' | 'results' | 'settings' | 'script'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  
  // Student modal
  const [showAddStudentModal, setShowAddStudentModal] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>('');
  const [newStudentClass, setNewStudentClass] = useState<'8A' | '8B'>('8A');
  const [newStudentUsername, setNewStudentUsername] = useState<string>('');
  const [newStudentPassword, setNewStudentPassword] = useState<string>('');
  const [newStudentToken, setNewStudentToken] = useState<string>(config.activeToken || 'ANBK2026');
  const [isSavingStudentToCloud, setIsSavingStudentToCloud] = useState<boolean>(false);

  // Settings form
  const [tempGasUrl, setTempGasUrl] = useState<string>(config.googleAppScriptUrl);
  const [tempDuration, setTempDuration] = useState<number>(config.durationMinutes);
  const [tempToken, setTempToken] = useState<string>(config.activeToken);
  const [tempRandomize, setTempRandomize] = useState<boolean>(config.randomizeQuestions);
  const [tempAdminPass, setTempAdminPass] = useState<string>(config.adminPassword || 'ANBK2026');
  const [showSettingsPass, setShowSettingsPass] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [settingsSaveSuccess, setSettingsSaveSuccess] = useState<boolean>(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = onAuthenticate(passwordInput);
    if (!success) {
      setAuthError('Kata sandi salah. Silakan periksa kembali atau gunakan sandi proktor sekolah.');
    } else {
      setPasswordInput('');
    }
  };

  const handleSaveSettings = () => {
    onUpdateConfig({
      googleAppScriptUrl: tempGasUrl.trim(),
      durationMinutes: Number(tempDuration) || 80,
      activeToken: tempToken.trim() || 'ANBK2026',
      randomizeQuestions: tempRandomize,
      adminPassword: tempAdminPass.trim() || 'ANBK2026'
    });
    setSettingsSaveSuccess(true);
    setTimeout(() => setSettingsSaveSuccess(false), 3500);
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const code = `WNR-${newStudentClass}-${String(students.filter(s => s.classRoom === newStudentClass).length + 1).padStart(2, '0')}`;
    const generatedUsername = newStudentUsername.trim().toLowerCase() || newStudentName.trim().toLowerCase().split(' ')[0] + newStudentClass.toLowerCase();
    const generatedPassword = newStudentPassword.trim() || '123456';

    const created: StudentUser = {
      id: String(Date.now()),
      code,
      name: newStudentName.trim(),
      username: generatedUsername,
      password: generatedPassword,
      classRoom: newStudentClass,
      token: newStudentToken.trim() || config.activeToken
    };

    onAddStudent(created);

    // Also attempt pushing to sheet if connected
    if (config.googleAppScriptUrl) {
      setIsSavingStudentToCloud(true);
      await saveStudentToSheet(created, config.googleAppScriptUrl);
      setIsSavingStudentToCloud(false);
    }

    setNewStudentName('');
    setNewStudentUsername('');
    setNewStudentPassword('');
    setShowAddStudentModal(false);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(COMPLETE_GOOGLE_APPS_SCRIPT);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const exportResultsToCSV = () => {
    if (examResults.length === 0) {
      alert('Belum ada data hasil ujian untuk diekspor.');
      return;
    }

    const headers = ['ID', 'Waktu', 'Kode Peserta', 'Nama Siswa', 'Kelas', 'Skor Akhir', 'Benar', 'Total Soal', 'Durasi (detik)'];
    const rows = examResults.map(r => [
      r.id,
      `"${r.timestamp}"`,
      r.studentCode,
      `"${r.name}"`,
      r.classRoom,
      r.score,
      r.totalCorrect,
      r.totalQuestions,
      r.durationSeconds
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Hasil_CBT_ANBK_SMPN1_Wanaraya_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // IF NOT AUTHENTICATED: Show Password Gateway
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-110px)] bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm bg-blue-100 text-blue-800">
            <ShieldCheck className="w-9 h-9" />
          </div>

          <div className="text-center space-y-1.5">
            <div className="inline-block">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                Panel Administrator
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Panel Administrator / Proktor
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Pengaturan CBT, manajemen siswa, rekapitulasi nilai, dan integrasi spreadsheet.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600 mt-0.5" />
              <div>
                <span className="font-semibold">{authError}</span>
              </div>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Kata Sandi Khusus Guru / Proktor
                </label>
                <span className="text-[10px] text-slate-400">Tersembunyi</span>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold tracking-wider text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-mono"
                  autoFocus
                />
                <button
                  type="button"
                  id="btn-toggle-password-visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                  title={showPassword ? "Sembunyikan Kata Sandi" : "Tampilkan Kata Sandi"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Secure Notice without displaying the password */}
              <p className="text-[11px] text-slate-500 mt-2.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>Akses terproteksi khusus Dewan Guru &amp; Proktor berwenang.</span>
              </p>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={onBack}
                className="w-1/3 py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                Kembali
              </button>
              <button
                type="submit"
                id="btn-submit-admin-password"
                className="w-2/3 py-2.5 px-3 rounded-xl text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Buka Panel Admin</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // IF AUTHENTICATED: Full Admin Dashboard
  return (
    <div className="min-h-[calc(100vh-110px)] bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Breadcrumb & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </button>

            {onLock && (
              <button
                id="btn-lock-session"
                onClick={onLock}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl border border-rose-200 shadow-sm transition-all"
                title="Kunci kembali sesi proktor"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Kunci Kembali Sesi</span>
              </button>
            )}
          </div>

          {/* Connection Status Badge */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm text-xs">
            {sheetConnected ? (
              <>
                <Wifi className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span className="font-bold text-emerald-700">Google Sheet Terhubung</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-amber-700">Penyimpanan Lokal Aktif (Offline Mode)</span>
              </>
            )}
            <button
              onClick={() => onTestConnection()}
              disabled={isTestingConnection}
              className="ml-2 text-blue-600 hover:underline font-bold flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${isTestingConnection ? 'animate-spin' : ''}`} />
              <span>Cek Ping</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="admin-tab-users"
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'users'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Data Pengguna ({students.length})</span>
            </button>

            <button
              id="admin-tab-results"
              onClick={() => setActiveTab('results')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'results'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Hasil Ujian Siswa ({examResults.length})</span>
            </button>

            <button
              id="admin-tab-settings"
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Pengaturan & Token</span>
            </button>

            <button
              id="admin-tab-script"
              onClick={() => setActiveTab('script')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'script'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Script Google Apps Script</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            Proktor SMPN 1 Wanaraya
          </span>
        </div>

        {/* TAB 1: DATA PENGGUNA / SISWA */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Data Login Siswa (Sheet "UserLogin")</h3>
                <p className="text-xs text-slate-500">
                  Daftar akun peserta ujian kelas 8A dan 8B yang dapat masuk ke ruang ujian.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Tombol Tarik dari Spreadsheet Sesuai Spesifikasi */}
                <button
                  id="btn-pull-from-spreadsheet"
                  onClick={onSyncStudentsFromSheet}
                  disabled={isSyncingStudents}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow transition-all"
                  title="Ambil data siswa terbaru dari Google Spreadsheet sheet UserLogin"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingStudents ? 'animate-spin' : ''}`} />
                  <span>Tarik dari Spreadsheet</span>
                </button>

                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Siswa</span>
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">No</th>
                    <th className="p-3.5">Kode Peserta</th>
                    <th className="p-3.5">Nama Peserta</th>
                    <th className="p-3.5">Username</th>
                    <th className="p-3.5">Password</th>
                    <th className="p-3.5">Kelas</th>
                    <th className="p-3.5">Token Ujian</th>
                    <th className="p-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {students.map((st, idx) => (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 text-slate-400">{idx + 1}</td>
                      <td className="p-3.5 font-mono font-bold text-blue-700">{st.code}</td>
                      <td className="p-3.5 font-semibold text-slate-900">{st.name}</td>
                      <td className="p-3.5 font-mono text-blue-800 font-semibold">{st.username}</td>
                      <td className="p-3.5 font-mono text-emerald-700 bg-emerald-50/40 font-semibold px-2 rounded">
                        {st.password || '123456'}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-lg font-bold text-[10px] ${
                          st.classRoom === '8A' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          Kelas {st.classRoom}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-amber-600">{st.token}</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => onDeleteStudent(st.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Siswa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: HASIL UJIAN SISWA */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Rekap Nilai Siswa (Sheet "JawabanUjian")</h3>
                <p className="text-xs text-slate-500">
                  Hasil pengerjaan 20 soal PTS matematika yang telah dikumpulkan.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportResultsToCSV}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Ekspor CSV</span>
                </button>
                {examResults.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Yakin ingin mereset seluruh riwayat hasil ujian siswa di aplikasi lokal?')) {
                        onClearResults();
                      }
                    }}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-3.5 py-2 rounded-xl text-xs font-bold border border-rose-200 transition-colors"
                  >
                    Reset Rekap
                  </button>
                )}
              </div>
            </div>

            {examResults.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <FileSpreadsheet className="w-12 h-12 mx-auto text-slate-300" />
                <p className="text-sm font-medium">Belum ada siswa yang menyelesaikan ujian.</p>
                <p className="text-xs">Data nilai akan otomatis terakumulasi setelah peserta menekan tombol selesai di CBT.</p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Waktu</th>
                      <th className="p-3.5">Kode</th>
                      <th className="p-3.5">Nama Siswa</th>
                      <th className="p-3.5">Kelas</th>
                      <th className="p-3.5">Skor Akhir</th>
                      <th className="p-3.5">Benar</th>
                      <th className="p-3.5">Durasi</th>
                      <th className="p-3.5">Status Sheet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {examResults.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 text-slate-500 font-mono text-[11px]">{res.timestamp}</td>
                        <td className="p-3.5 font-mono font-bold text-blue-700">{res.studentCode}</td>
                        <td className="p-3.5 font-bold text-slate-900">{res.name}</td>
                        <td className="p-3.5">
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-bold">
                            Kelas {res.classRoom}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 rounded-xl font-mono font-extrabold text-sm ${
                            res.score >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {res.score}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-600 font-semibold">{res.totalCorrect} / {res.totalQuestions}</td>
                        <td className="p-3.5 font-mono text-slate-500">{Math.round(res.durationSeconds / 60)}m</td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Tersimpan</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PENGATURAN UJIAN & KONEKSI GOOGLE SHEETS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold text-slate-900">Pengaturan Ujian & Koneksi Google Spreadsheet</h3>
              <p className="text-xs text-slate-500">
                Konfigurasi durasi ujian, token ANBK aktif, dan URL Web App Google Apps Script.
              </p>
            </div>

            <div className="max-w-2xl space-y-5 text-xs sm:text-sm">
              {/* URL Google Apps Script */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-xs">
                  URL Web App Google Apps Script (Database)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={tempGasUrl}
                    onChange={(e) => setTempGasUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => onTestConnection(tempGasUrl)}
                    disabled={isTestingConnection}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 flex-shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTestingConnection ? 'animate-spin' : ''}`} />
                    <span>Uji Ping</span>
                  </button>
                </div>
                {connectionMessage && (
                  <p className={`text-xs font-semibold mt-1 ${sheetConnected ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {connectionMessage}
                  </p>
                )}
                <p className="text-[11px] text-slate-400">
                  Dapatkan URL ini dari menu <strong>Deploy &gt; New deployment &gt; Web app (Anyone)</strong> di editor Google Apps Script.
                </p>
              </div>

              {/* Durasi Ujian */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-800 uppercase tracking-wider text-xs">
                    Alokasi Waktu Ujian (Menit)
                  </label>
                  <input
                    type="number"
                    value={tempDuration}
                    onChange={(e) => setTempDuration(Number(e.target.value))}
                    min={10}
                    max={180}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                  <span className="text-[11px] text-slate-400">Standar PTS: 80 Menit</span>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-800 uppercase tracking-wider text-xs">
                    Token Ujian Aktif
                  </label>
                  <input
                    type="text"
                    value={tempToken}
                    onChange={(e) => setTempToken(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-extrabold text-blue-700 tracking-wider focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                  <span className="text-[11px] text-slate-400">Token sesi yang dibagikan proktor ke peserta ujian saat tes dimulai.</span>
                </div>
              </div>

              {/* Randomize toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tempRandomize}
                    onChange={(e) => setTempRandomize(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div>
                    <div className="font-bold text-slate-800 text-xs">Acak Urutan Soal untuk Setiap Siswa</div>
                    <div className="text-[11px] text-slate-500">Mencegah kecurangan dengan mengacak nomor urut soal bagi setiap peserta.</div>
                  </div>
                </label>
              </div>

              {/* Kata Sandi Proktor */}
              <div className="space-y-1.5 pt-2">
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-xs">
                  Kata Sandi Proktor
                </label>
                <div className="relative">
                  <input
                    type={showSettingsPass ? 'text' : 'password'}
                    value={tempAdminPass}
                    onChange={(e) => setTempAdminPass(e.target.value)}
                    placeholder="Masukkan kata sandi baru..."
                    className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSettingsPass(!showSettingsPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    title={showSettingsPass ? "Sembunyikan Kata Sandi" : "Tampilkan Kata Sandi"}
                  >
                    {showSettingsPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[11px] text-slate-400">Kata sandi rahasia untuk memproteksi Panel Admin dari akses siswa.</span>
              </div>

              {/* Save Button & Feedback */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all"
                >
                  Simpan Perubahan Pengaturan
                </button>
                {settingsSaveSuccess && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Pengaturan berhasil disimpan!</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PANDUAN & SCRIPT GOOGLE APPS SCRIPT (Menjawab pertanyaan 1, 2, 3) */}
        {activeTab === 'script' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b pb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Kode Google Apps Script & Panduan Koneksi Database</h3>
                <p className="text-xs text-slate-500">
                  Kode otomatis untuk menghubungkan Spreadsheet dengan CBT ANBK (UserLogin &amp; JawabanUjian).
                </p>
              </div>

              <button
                onClick={handleCopyScript}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow flex items-center gap-2 transition-all"
              >
                {copiedScript ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedScript ? 'Kode Tersalin!' : 'Salin Seluruh Kode Script'}</span>
              </button>
            </div>

            {/* Jawaban Poin 1, 2, 3 User */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2">
                <h5 className="font-bold text-blue-900 text-sm">1. Indikator Koneksi</h5>
                <p className="text-slate-700">
                  Fungsi <code>doGet</code> dengan parameter <code>action=ping</code> mengirimkan status <code>status: 'ok'</code> yang secara visual menyalakan indikator hijau "Database Spreadsheet Aktif" di aplikasi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                <h5 className="font-bold text-emerald-900 text-sm">2. Simpan Nilai & Jawaban</h5>
                <p className="text-slate-700">
                  Fungsi <code>doPost</code> dengan <code>action: 'saveResult'</code> otomatis menyimpan: Waktu Ujian, Kode Peserta, Nama Siswa, Kelas, Skor Akhir, Jawaban nomor 1-20 ke sheet <strong>JawabanUjian</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-2">
                <h5 className="font-bold text-purple-900 text-sm">3. Smart Header Data Siswa</h5>
                <p className="text-slate-700">
                  Data <strong>Username</strong> dan <strong>Password</strong> tersendiri disinkronkan dengan sheet <strong>UserLogin</strong>. Script dilengkapi <em>Smart Header Detection</em> sehingga otomatis mengenali variasi nama kolom (misal: "User Name", "Kata Sandi", "Sandi", "Nama Siswa").
                </p>
              </div>
            </div>

            {/* Rekomendasi Format Header Spreadsheet */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Susunan Header Kolom Sheet "UserLogin" yang Didukung Otomatis:</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] font-mono border-collapse">
                  <thead>
                    <tr className="bg-slate-200 text-slate-800">
                      <th className="border border-slate-300 px-2.5 py-1">No</th>
                      <th className="border border-slate-300 px-2.5 py-1">Kode Peserta</th>
                      <th className="border border-slate-300 px-2.5 py-1 text-blue-700">Username</th>
                      <th className="border border-slate-300 px-2.5 py-1 text-emerald-700">Password</th>
                      <th className="border border-slate-300 px-2.5 py-1">Nama Peserta</th>
                      <th className="border border-slate-300 px-2.5 py-1">Kelas</th>
                      <th className="border border-slate-300 px-2.5 py-1">Token Ujian</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white text-slate-600">
                      <td className="border border-slate-300 px-2.5 py-1">1</td>
                      <td className="border border-slate-300 px-2.5 py-1">WNR-8A-01</td>
                      <td className="border border-slate-300 px-2.5 py-1 font-bold text-blue-700">ahmad8a</td>
                      <td className="border border-slate-300 px-2.5 py-1 font-bold text-emerald-700">wnr8a01</td>
                      <td className="border border-slate-300 px-2.5 py-1">Ahmad Rizky Pratama</td>
                      <td className="border border-slate-300 px-2.5 py-1">8A</td>
                      <td className="border border-slate-300 px-2.5 py-1 font-bold text-amber-600">ANBK2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500">
                💡 <em>Sistem cerdas mendeteksi kolom: Jika kolom 'No' ada di depan atau urutan kolom dibalik, script otomatis memetakan data dengan benar tanpa tertukar.</em>
              </p>
            </div>

            {/* Script Code Block */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>File: Code.gs (Google Apps Script)</span>
                <span className="text-slate-400">Siap Salin &amp; Tempel</span>
              </div>
              <pre className="bg-slate-900 text-emerald-300 p-5 rounded-2xl text-xs font-mono overflow-x-auto max-h-96 leading-relaxed border border-slate-800">
                {COMPLETE_GOOGLE_APPS_SCRIPT}
              </pre>
            </div>
          </div>
        )}

      </div>

      {/* MODAL TAMBAH SISWA */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <h3 className="text-lg font-bold text-slate-900">Tambah Akun Siswa Baru</h3>
            
            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Contoh: Rian Pratama"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pilih Kelas</label>
                <select
                  value={newStudentClass}
                  onChange={(e) => setNewStudentClass(e.target.value as '8A' | '8B')}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs"
                >
                  <option value="8A">Kelas 8A</option>
                  <option value="8B">Kelas 8B</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Username Peserta</label>
                <input
                  type="text"
                  value={newStudentUsername}
                  onChange={(e) => setNewStudentUsername(e.target.value)}
                  placeholder="rian8a (bawaan nama depan + kelas jika dikosongkan)"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Password Peserta (Isian Tersendiri)</label>
                <input
                  type="text"
                  value={newStudentPassword}
                  onChange={(e) => setNewStudentPassword(e.target.value)}
                  placeholder="wnr8a07 (bawaan '123456' jika dikosongkan)"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Token Ujian</label>
                <input
                  type="text"
                  value={newStudentToken}
                  onChange={(e) => setNewStudentToken(e.target.value.toUpperCase())}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-mono font-bold"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingStudentToCloud}
                  className="w-1/2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow"
                >
                  {isSavingStudentToCloud ? 'Menyimpan...' : 'Simpan Siswa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
