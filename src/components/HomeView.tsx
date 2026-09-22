import React from 'react';
import { 
  BookOpen, 
  Layers, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  FileSpreadsheet, 
  HelpCircle, 
  Clock, 
  Award,
  ExternalLink
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: 'objectives' | 'materials' | 'exam' | 'admin') => void;
  onOpenExamLogin: () => void;
  sheetConnected: boolean;
  onOpenAdmin: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenExamLogin,
  sheetConnected,
  onOpenAdmin
}) => {
  return (
    <div className="min-h-[calc(100vh-110px)] bg-gradient-to-b from-sky-50 via-white to-blue-50/40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Salam Pembuka - Bright & Cheerful Hero Section */}
        <section 
          id="home-hero-greeting" 
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 text-white p-8 sm:p-12 shadow-xl shadow-blue-500/15"
        >
          {/* Decorative geometric patterns */}
          <div className="absolute -right-16 -bottom-16 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute right-1/4 -top-12 w-48 h-48 bg-amber-300/20 rounded-full blur-xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tahun Ajaran 2026/2027 • Kurikulum Merdeka</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
              Salam Belajar Jarak Jauh
            </h1>

            <p className="text-base sm:text-lg text-blue-100 font-normal leading-relaxed">
              Selamat datang di portal pembelajaran digital dan Penilaian Tengah Semester (PTS) berbasis 
              <strong className="text-white font-semibold"> Computer Based Test (CBT ANBK)</strong> SMP Negeri 1 Wanaraya. 
              Tingkatkan literasi numerasi matematika Fase D dengan materi interaktif dan evaluasi terstandar nasional.
            </p>

            {/* Status Info Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <div className="bg-blue-900/50 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-blue-400/30 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>Waktu Ujian: <strong>80 Menit</strong> (20 Soal)</span>
              </div>
              <div className="bg-blue-900/50 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-blue-400/30 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
                <span>Google Sheets: <strong>{sheetConnected ? 'Terhubung Otomatis' : 'Mode Lokal Siap'}</strong></span>
              </div>
              <div className="bg-blue-900/50 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-blue-400/30 flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-200" />
                <span>Target: <strong>Kelas 8A & 8B</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Menu Utama Sesuai Spesifikasi */}
        <section id="main-navigation-menu" className="space-y-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-2xl font-bold text-slate-800">Menu Utama Pembelajaran</h2>
            <p className="text-sm text-slate-600">Pilih menu kegiatan di bawah ini untuk memulai belajar atau mengikuti evaluasi PTS CBT.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* 1. Menu Tujuan Pembelajaran */}
            <div 
              id="card-menu-tujuan"
              onClick={() => onNavigate('objectives')}
              className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Menu 1</div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    Tujuan Pembelajaran
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                    Pelajari capaian kompetensi dasar matematika Fase D Kelas 8 mencakup Bilangan Berpangkat, Bentuk Akar, dan Teorema Pythagoras.
                  </p>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-500 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>Capaian Elemen Bilangan & Geometri</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>Pertanyaan Pemantik & Kata Kunci</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-blue-600">
                <span>Buka Tujuan Belajar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 2. Menu Materi */}
            <div 
              id="card-menu-materi"
              onClick={() => onNavigate('materials')}
              className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-emerald-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                  <Layers className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Menu 2</div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    Materi & Poster
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                    Rangkuman lengkap Bab 1 (Bilangan Berpangkat) dan Bab 2 (Teorema Pythagoras) dilengkapi poster infografis dan kalkulator interaktif.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-slate-500 pt-1">
                  <div className="flex items-center justify-between bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                    <span className="font-medium text-slate-700">Poster Eksponen</span>
                    <span className="text-[11px] text-blue-600 flex items-center gap-1 font-semibold">Tersedia <ExternalLink className="w-3 h-3" /></span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                    <span className="font-medium text-slate-700">Poster Pythagoras</span>
                    <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold">Tersedia <ExternalLink className="w-3 h-3" /></span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-emerald-600">
                <span>Pelajari Materi Lengkap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 3. Menu Kuis (CBT ANBK PTS) */}
            <div 
              id="card-menu-kuis"
              onClick={onOpenExamLogin}
              className="group relative bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center font-bold text-xl group-hover:bg-white group-hover:text-amber-600 transition-all shadow-sm">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-200 uppercase tracking-wider">Menu 3</div>
                  <h3 className="text-xl font-bold text-white">
                    Kuis / CBT ANBK PTS
                  </h3>
                  <p className="text-sm text-amber-100 mt-2">
                    Ujian Matematika Fase D standar Asesmen Nasional. 20 Soal (PG, PGK, Benar-Salah) dengan stimulus kontekstual Kalimantan Selatan.
                  </p>
                </div>
                <div className="bg-black/15 p-3 rounded-xl space-y-1 text-xs text-amber-100">
                  <div className="flex justify-between">
                    <span>Durasi:</span>
                    <span className="font-bold text-white">80 Menit</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Kelas:</span>
                    <span className="font-bold text-white">8A & 8B</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fitur:</span>
                    <span className="font-bold text-white">Ragu-ragu & Timer</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-sm font-bold text-white">
                <span>Masuk Ruang Ujian</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>

        {/* Informasi Ujian & Alur Kerja */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Petunjuk Pelaksanaan CBT ANBK Online</h3>
              <p className="text-xs text-slate-500">Tata tertib dan panduan pengerjaan ujian PTS SMP Negeri 1 Wanaraya</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1.5">
              <div className="text-xs font-bold text-blue-700">Langkah 1</div>
              <div className="font-semibold text-slate-800">Login Peserta</div>
              <p className="text-xs text-slate-600">Pilih kelas (8A atau 8B), masukkan username, password dan konfirmasi token ujian.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1.5">
              <div className="text-xs font-bold text-blue-700">Langkah 2</div>
              <div className="font-semibold text-slate-800">Cermati Stimulus</div>
              <p className="text-xs text-slate-600">Baca narasi stimulus ~100 kata tentang data sosial, kearifan lokal Kalimantan Selatan, dan tabel soal.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1.5">
              <div className="text-xs font-bold text-blue-700">Langkah 3</div>
              <div className="font-semibold text-slate-800">Fitur ANBK</div>
              <p className="text-xs text-slate-600">Gunakan tombol <strong>Kuning (Ragu-ragu)</strong> jika belum yakin, dan pantau status pada <strong>Daftar Soal</strong>.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1.5">
              <div className="text-xs font-bold text-blue-700">Langkah 4</div>
              <div className="font-semibold text-slate-800">Kirim Otomatis</div>
              <p className="text-xs text-slate-600">Jawaban dan skor otomatis terkirim dan tersimpan ke <strong>Google Spreadsheet (sheet JawabanUjian)</strong>.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-slate-500">
            <span>Dikelola oleh Panitia Penilaian Tengah Semester (PTS) SMPN 1 Wanaraya</span>
            <button
              onClick={onOpenAdmin}
              className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              Rekap Nilai &amp; Panel Proktor (Khusus Guru/Admin) &rarr;
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
