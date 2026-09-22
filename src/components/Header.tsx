import React from 'react';
import { 
  GraduationCap, 
  Clock, 
  LogOut, 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  HelpCircle,
  Menu,
  X,
  Lock
} from 'lucide-react';
import { StudentUser } from '../types';

interface HeaderProps {
  currentView: 'home' | 'objectives' | 'materials' | 'exam' | 'admin' | 'result';
  onNavigate: (view: 'home' | 'objectives' | 'materials' | 'exam' | 'admin') => void;
  activeStudent: StudentUser | null;
  onLogoutStudent?: () => void;
  timerRemainingSeconds?: number;
  isExamActive?: boolean;
  sheetConnected?: boolean;
  onOpenAdminModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  activeStudent,
  onLogoutStudent,
  timerRemainingSeconds = 0,
  isExamActive = false,
  sheetConnected = false,
  onOpenAdminModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const formatTimer = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const isTimerWarning = timerRemainingSeconds > 0 && timerRemainingSeconds <= 600; // < 10 mins

  return (
    <header id="app-main-header" className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg sticky top-0 z-40">
      {/* Top Notification Bar for connection status and school motto */}
      <div className="bg-blue-950/80 px-4 py-1 text-xs text-blue-200 flex justify-between items-center border-b border-blue-800/40">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Portal Resmi CBT ANBK & LMS • SMP Negeri 1 Wanaraya (Kab. Barito Kuala)</span>
        </div>
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors"
            title={sheetConnected ? 'Terhubung ke Google Spreadsheet' : 'Google Spreadsheet Standby / Offline'}
          >
            {sheetConnected ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-medium hidden sm:inline">Database Spreadsheet Aktif</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-300 hidden sm:inline">Database Mode Lokal / Standby</span>
              </>
            )}
          </div>
          <span className="text-blue-400">|</span>
          <span className="font-semibold text-blue-100">TA 2026/2027</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: School Logo & Title */}
        <div 
          onClick={() => !isExamActive && onNavigate('home')} 
          className={`flex items-center gap-3 ${!isExamActive ? 'cursor-pointer hover:opacity-95' : ''} transition-opacity`}
        >
          {/* Logo with resilient fallback */}
          <div className="relative w-12 h-12 rounded-xl bg-white p-1 shadow-md flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-blue-300">
            <img 
              src="https://ibb.co.com/S4095CCm"
              alt="Logo SMPN 1 Wanaraya" 
              className="w-full h-full object-contain"
              onError={(e) => {
                // If direct link fails or blocked in sandbox, render SVG emblem fallback
                (e.target as HTMLElement).style.display = 'none';
                const parent = (e.target as HTMLElement).parentElement;
                if (parent) {
                  const fallbackDiv = parent.querySelector('.logo-fallback');
                  if (fallbackDiv) (fallbackDiv as HTMLElement).style.display = 'flex';
                }
              }}
            />
            <div className="logo-fallback hidden absolute inset-0 bg-blue-700 text-white flex-col items-center justify-center text-center font-bold text-[10px] leading-tight p-0.5">
              <span>SMPN 1</span>
              <span>WNR</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white leading-tight">
                SMP NEGERI 1 WANARAYA
              </h1>
              <span className="bg-amber-400/90 text-blue-950 font-bold text-[11px] px-2 py-0.5 rounded-full uppercase tracking-wider hidden md:inline">
                CBT ANBK
              </span>
            </div>
            <p className="text-xs text-blue-200 font-medium">
              Sistem Ujian Online & Belajar Jarak Jauh • PTS Matematika Kelas 8
            </p>
          </div>
        </div>

        {/* Center/Right Exam Timer (If exam is running) */}
        {isExamActive && (
          <div className="flex items-center gap-4 bg-blue-950/90 px-4 py-2 rounded-xl border border-blue-700 shadow-inner">
            <div className="flex items-center gap-2">
              <Clock className={`w-5 h-5 ${isTimerWarning ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-blue-300 font-semibold">Sisa Waktu</div>
                <div className={`text-xl sm:text-2xl font-mono font-extrabold ${isTimerWarning ? 'text-rose-400' : 'text-amber-300'}`}>
                  {formatTimer(timerRemainingSeconds)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation & Controls */}
        <div className="hidden lg:flex items-center gap-2">
          {!isExamActive && (
            <nav className="flex items-center gap-1 bg-blue-950/60 p-1 rounded-xl border border-blue-700/50">
              <button
                id="nav-btn-home"
                onClick={() => onNavigate('home')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'home' 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'text-blue-200 hover:text-white hover:bg-blue-800/60'
                }`}
              >
                Beranda
              </button>
              <button
                id="nav-btn-objectives"
                onClick={() => onNavigate('objectives')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'objectives' 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'text-blue-200 hover:text-white hover:bg-blue-800/60'
                }`}
              >
                Tujuan Pembelajaran
              </button>
              <button
                id="nav-btn-materials"
                onClick={() => onNavigate('materials')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'materials' 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'text-blue-200 hover:text-white hover:bg-blue-800/60'
                }`}
              >
                Materi & Poster
              </button>
              <button
                id="nav-btn-exam"
                onClick={() => onNavigate('exam')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  currentView === 'exam' 
                    ? 'bg-amber-500 text-blue-950 shadow font-bold' 
                    : 'bg-amber-400/90 text-blue-950 hover:bg-amber-300'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Kuis (Login CBT ANBK)</span>
              </button>
            </nav>
          )}

          {/* Student Profile & Logout (if logged in) */}
          {activeStudent && (
            <div className="flex items-center gap-3 pl-3 border-l border-blue-700">
              <div className="text-right">
                <div className="text-sm font-bold text-white leading-tight">{activeStudent.name}</div>
                <div className="text-xs text-amber-300 font-medium">Kelas {activeStudent.classRoom} • {activeStudent.code}</div>
              </div>
              {onLogoutStudent && (
                <button
                  id="btn-logout-student"
                  onClick={onLogoutStudent}
                  title="Keluar dari Akun Siswa"
                  className="bg-rose-600/90 hover:bg-rose-500 text-white p-2 rounded-lg transition-colors flex items-center justify-center shadow"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Admin Panel Button */}
          {!isExamActive && (
            <button
              id="btn-admin-access"
              onClick={onOpenAdminModal}
              className="ml-2 bg-blue-950/90 hover:bg-blue-900 text-blue-200 hover:text-white px-3 py-1.5 rounded-xl border border-blue-700/60 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Panel Guru & Proktor (Password Diperlukan)"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Admin / Guru</span>
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          {activeStudent && onLogoutStudent && (
            <button
              onClick={onLogoutStudent}
              title="Keluar"
              className="bg-rose-600 text-white p-2 rounded-lg text-xs"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
          {!isExamActive && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-blue-950 text-blue-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && !isExamActive && (
        <div className="lg:hidden bg-blue-950 border-t border-blue-800 px-4 py-3 space-y-2">
          <button
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-blue-100 hover:bg-blue-800"
          >
            Beranda
          </button>
          <button
            onClick={() => { onNavigate('objectives'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-blue-100 hover:bg-blue-800"
          >
            Tujuan Pembelajaran
          </button>
          <button
            onClick={() => { onNavigate('materials'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-blue-100 hover:bg-blue-800"
          >
            Materi & Poster
          </button>
          <button
            onClick={() => { onNavigate('exam'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-bold bg-amber-400 text-blue-950 flex items-center justify-between"
          >
            <span>Kuis (Login CBT ANBK)</span>
            <span className="text-[10px] bg-blue-950 text-amber-300 px-2 py-0.5 rounded font-mono">20 Soal</span>
          </button>
          <button
            onClick={() => { onOpenAdminModal(); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-blue-300 hover:bg-blue-900 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Admin / Guru</span>
          </button>
        </div>
      )}
    </header>
  );
};
