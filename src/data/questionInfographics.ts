import { InfographicData } from '../types';
import imgJembatanRumpiang from '../assets/images/jembatan_rumpiang_1790053506063.jpg';
import imgKebunSawit from '../assets/images/kebun_sawit_barito_1790053521101.jpg';
import imgSungaiBarito from '../assets/images/sungai_barito_jukung_1790053534190.jpg';
import imgAnyamanPurun from '../assets/images/anyaman_purun_batola_1790053550649.jpg';

export const QUESTION_INFOGRAPHICS: Record<number, InfographicData> = {
  // ===================== SOAL 1 =====================
  1: {
    title: 'Arsitektur Memori Server ANBK SMPN 1 Wanaraya',
    contextTag: 'Digitalisasi Pendidikan & Server Sekolah di Wanaraya',
    questionPrompt: 'Berapakah ukuran kapasitas arsip data server sebesar 16 MB tersebut jika dinyatakan dalam satuan Byte dengan basis 2?',
    themeColor: 'blue',
    visualType: 'default',
    localLocation: 'Lab Komputer SMPN 1 Wanaraya, Barito Kuala',
    inquiryNotes: 'Petunjuk Penyelidikan: Gunakan sifat perkalian eksponen basis 2 dengan menyederhanakan 16 = 2⁴.',
    parameters: [
      { label: 'Kapasitas Arsip', value: '16 Megabyte (MB)' },
      { label: 'Rasio 1 MB', value: '2¹⁰ Kilobyte (KB)' },
      { label: 'Rasio 1 KB', value: '2¹⁰ Byte' },
      { label: 'Total Byte (Basis 2)', value: '2ⁿ Byte', isUnknown: true, hint: 'Cari nilai n' }
    ]
  },

  // ===================== SOAL 2 =====================
  2: {
    title: 'Pemeliharaan Kawat Baja Pancang Jembatan Rumpiang',
    contextTag: 'Infrastruktur Ikonik Barito Kuala Melintasi Sungai Barito',
    questionPrompt: 'Berapakah panjang kawat baja penguat hipotenusa yang harus disiapkan oleh teknisi jembatan?',
    themeColor: 'amber',
    visualType: 'pythagoras-bridge',
    imageUrl: imgJembatanRumpiang,
    localLocation: 'Jembatan Rumpiang, Marabahan, Barito Kuala',
    inquiryNotes: 'Petunjuk Geometri: Segitiga siku-siku antara tiang pylon tegak (24 m) dan lantai jembatan horizontal (7 m).',
    parameters: [
      { label: 'Tinggi Tiang Pylon', value: '24 meter' },
      { label: 'Jarak Dasar ke Angker', value: '7 meter' },
      { label: 'Sudut Tiang - Lantai', value: '90° (Siku-siku)' },
      { label: 'Panjang Kabel Baja (c)', value: '??? meter', isUnknown: true, hint: 'Hitung c = √(a² + b²)' }
    ]
  },

  // ===================== SOAL 3 =====================
  3: {
    title: 'Rancangan Kisi-Kisi Ukiran Kayu Ulin Rumah Bubungan Tinggi',
    contextTag: 'Kearifan Lokal Arsitektur Tradisional Banjar',
    questionPrompt: 'Bagaimanakah bentuk rasional paling sederhana dari ukuran panjang ventilasi ukiran kayu tersebut?',
    themeColor: 'emerald',
    visualType: 'default',
    localLocation: 'Kawasan Rumah Tradisional Marabahan, Batola',
    inquiryNotes: 'Petunjuk Aljabar: Luas = Panjang × Lebar, sehingga Panjang = 12 ÷ (√7 + √3). Kalikan dengan bentuk sekawannya.',
    parameters: [
      { label: 'Luas Bidang Ventilasi', value: '12 cm²' },
      { label: 'Lebar Terukur', value: '(√7 + √3) cm' },
      { label: 'Material Kayu', value: 'Kayu Ulin Barito' },
      { label: 'Panjang Rasional', value: '??? cm', isUnknown: true, hint: 'Rasionalkan bentuk akar' }
    ]
  },

  // ===================== SOAL 4 =====================
  4: {
    title: 'Pengamatan Menara Suar ke Tongkang Batubara Sungai Barito',
    contextTag: 'Lalu Lintas Pelayaran Sungai Terbesar Kalimantan',
    questionPrompt: 'Berapakah jarak garis lurus dari puncak menara suar ke posisi haluan kapal tongkang tersebut?',
    themeColor: 'cyan',
    visualType: 'default',
    localLocation: 'Muara Alur Pelayaran Sungai Barito, Batola',
    inquiryNotes: 'Petunjuk Trigonometri: Pada segitiga 30°-60°-90°, panjang sisi miring adalah dua kali panjang sisi di hadapan sudut 30°.',
    parameters: [
      { label: 'Tinggi Menara Suar', value: '40 meter' },
      { label: 'Sudut Depresi Pengamat', value: '30°' },
      { label: 'Rasio Sisi 30°-60°-90°', value: '1 : √3 : 2' },
      { label: 'Jarak Pandang Langsung', value: '??? meter', isUnknown: true, hint: 'Hitung hipotenusa garis lurus' }
    ]
  },

  // ===================== SOAL 5 =====================
  5: {
    title: 'Rekapitulasi Panen Kelapa Sawit Rakyat Wanaraya',
    contextTag: 'Sentra Agroindustri Perkebunan Sawit Barito Kuala',
    questionPrompt: 'Penulisan berat panen kelapa sawit tersebut dalam bentuk baku (notasi ilmiah) matematika yang tepat adalah...',
    themeColor: 'emerald',
    visualType: 'sawit-harvest',
    imageUrl: imgKebunSawit,
    localLocation: 'Perkebunan Sawit Wanaraya, Barito Kuala',
    inquiryNotes: 'Petunjuk Notasi Ilmiah: Format baku a × 10ⁿ memiliki batasan ketat 1 ≤ a < 10 dengan n bilangan bulat.',
    parameters: [
      { label: 'Total Hasil Panen TBS', value: '14.800.000 kg' },
      { label: 'Format Notasi Baku', value: 'a × 10ⁿ' },
      { label: 'Syarat Koefisien a', value: '1 ≤ a < 10' },
      { label: 'Bentuk Baku Notasi', value: '??? kg', isUnknown: true, hint: 'Geser koma desimal 7 kali ke kiri' }
    ]
  },

  // ===================== SOAL 6 =====================
  6: {
    title: 'Uji Geometri Kerangka Kuda-Kuda Balai Desa Wanaraya',
    contextTag: 'Pertukangan Bangunan Kayu Ulin Tradisional Barito',
    questionPrompt: 'Berdasarkan ukuran ketiga batang kayu ulin tersebut, jenis segitiga rangka kuda-kuda yang terbentuk adalah...',
    themeColor: 'amber',
    visualType: 'default',
    localLocation: 'Balai Warga Desa Wanaraya, Barito Kuala',
    inquiryNotes: 'Petunjuk Kebalikan Pythagoras: Bandingkan c² dengan (a² + b²) untuk menentukan siku-siku, lancip, atau tumpul.',
    parameters: [
      { label: 'Panjang Kayu Alas (a)', value: '10 dm' },
      { label: 'Panjang Kayu Tegak (b)', value: '24 dm' },
      { label: 'Balok Miring (c)', value: '26 dm' },
      { label: 'Klasifikasi Segitiga', value: '???', isUnknown: true, hint: 'Uji nilai 26² terhadap 10² + 24²' }
    ]
  },

  // ===================== SOAL 7 =====================
  7: {
    title: 'Debit Pompa Air Irigasi Persawahan Pasang Surut Batola',
    contextTag: 'Pengelolaan Air Pertanian Padi Pasang Surut Barito Kuala',
    questionPrompt: 'Berapakah nilai akhir dari hasil operasi bilangan pangkat pecahan debit pompa air tersebut?',
    themeColor: 'teal',
    visualType: 'default',
    localLocation: 'Saluran Irigasi Primer Pertanian Wanaraya, Batola',
    inquiryNotes: 'Petunjuk Eksponen Pecahan: Faktorkan bilangan pokok menjadi bilangan prima: 32 = 2⁵ dan 81 = 3⁴.',
    parameters: [
      { label: 'Faktor Daya Pompa A', value: '32^(3/5)' },
      { label: 'Faktor Daya Pompa B', value: '81^(1/4)' },
      { label: 'Penyederhanaan Basis', value: '(2⁵)^(3/5) × (3⁴)^(1/4)' },
      { label: 'Nilai Efisiensi Akhir', value: '???', isUnknown: true, hint: 'Kalikan kedua hasil penyederhanaan' }
    ]
  },

  // ===================== SOAL 8 =====================
  8: {
    title: 'Jalur Gelombang Radio Dermaga Feri Marabahan - Pos Wanaraya',
    contextTag: 'Konektivitas Wilayah Sungai & Mitigasi Banjir Batola',
    questionPrompt: 'Berapakah jarak lurus udara antara Dermaga Marabahan dan Pos Wanaraya berdasarkan peta koordinat tersebut?',
    themeColor: 'indigo',
    visualType: 'default',
    localLocation: 'Dermaga Feri Marabahan - Pos Wanaraya, Batola',
    inquiryNotes: 'Petunjuk Geometri Analitik: Formula jarak d = √[(x₂ - x₁)² + (y₂ - y₁)²] berbasis teorema Pythagoras.',
    parameters: [
      { label: 'Titik Dermaga Feri (P)', value: 'Koordinat (-2, 3)' },
      { label: 'Titik Pos Pantau (Q)', value: 'Koordinat (6, -3)' },
      { label: 'Skala Peta Digital', value: '1 Satuan = 1 Kilometer' },
      { label: 'Jarak Lurus Udara (d)', value: '??? kilometer', isUnknown: true, hint: 'Hitung selisih x dan y lalu kuadratkan' }
    ]
  },

  // ===================== SOAL 9 =====================
  9: {
    title: 'Pertumbuhan Bakteri Pengurai Lahan Gambut Sidomulyo',
    contextTag: 'Penelitian Sains Lahan Basah & Pertanian Gambut Wanaraya',
    questionPrompt: 'Manakah dari pernyataan operasi bilangan berpangkat perkembangbiakan bakteri berikut yang bernilai BENAR?',
    themeColor: 'emerald',
    visualType: 'default',
    localLocation: 'Desa Sidomulyo, Wanaraya, Barito Kuala',
    inquiryNotes: 'Petunjuk Eksponen: Evaluasi sifat perkalian aᵐ × aⁿ = aᵐ⁺ⁿ, pembagian aᵐ ÷ aⁿ = aᵐ⁻ⁿ, dan pemangkatan (aᵐ)ⁿ = aᵐⁿ.',
    parameters: [
      { label: 'Koloni Bakteri Awal', value: '2³ Koloni' },
      { label: 'Pola Pembelahan', value: '2 Kali Lipat Tiap 20 Menit' },
      { label: 'Aturan Eksponen Dasar', value: 'aᵐ × aⁿ = aᵐ⁺ⁿ' },
      { label: 'Opsi Jawaban Benar', value: 'Pilihan Ganda Kompleks', isUnknown: true, hint: 'Pilihlah lebih dari satu jawaban benar' }
    ]
  },

  // ===================== SOAL 10 =====================
  10: {
    title: 'Standar Sudut 90° Rangka Kusen Jendela SMPN 1 Wanaraya',
    contextTag: 'Pertukangan Kayu Konstruksi Sarana Sekolah',
    questionPrompt: 'Manakah dari kelompok tiga ukuran sisi batang kayu berikut yang BENAR merupakan Tripel Pythagoras?',
    themeColor: 'orange',
    visualType: 'default',
    localLocation: 'Pembangunan Ruang Kelas SMPN 1 Wanaraya, Batola',
    inquiryNotes: 'Petunjuk Tripel Pythagoras: Uji tiap pasangan tiga bilangan apakah c² tepat sama dengan a² + b².',
    parameters: [
      { label: 'Kelompok Uji A', value: '6 cm, 8 cm, 10 cm' },
      { label: 'Kelompok Uji B', value: '5 cm, 12 cm, 13 cm' },
      { label: 'Kelompok Uji C', value: '8 cm, 15 cm, 17 cm' },
      { label: 'Tripel Pythagoras Sah', value: '???', isUnknown: true, hint: 'Pilih semua kelompok yang membentuk siku-siku' }
    ]
  },

  // ===================== SOAL 11 =====================
  11: {
    title: 'Pagar Keliling Taman TOGA Adiwiyata SMPN 1 Wanaraya',
    contextTag: 'Lingkungan Sekolah Ramah Anak & Tanaman Obat Keluarga Batola',
    questionPrompt: 'Tentukan kebenaran dari pernyataan-pernyataan penyederhanaan ukuran sisi taman obat berikut!',
    themeColor: 'teal',
    visualType: 'default',
    localLocation: 'Taman Adiwiyata SMPN 1 Wanaraya, Barito Kuala',
    inquiryNotes: 'Petunjuk Bentuk Akar: Tarik faktor kuadrat sempurna: 12 = 4×3, 27 = 9×3, 48 = 16×3, dan 75 = 25×3.',
    parameters: [
      { label: 'Sisi Pagar AB', value: '2√12 meter' },
      { label: 'Sisi Pagar BC', value: '3√27 meter' },
      { label: 'Sisi Pagar CD', value: '√48 meter' },
      { label: 'Keliling Pagar Total', value: '??? meter', isUnknown: true, hint: 'Jumlahkan seluruh suku sejenis berakar √3' }
    ]
  },

  // ===================== SOAL 12 =====================
  12: {
    title: 'Bilah Bambu Diagonal Etalase Kain Sasirangan Marabahan',
    contextTag: 'Seni Kriya Tekstil Warisan Budaya Banjar di Batola',
    questionPrompt: 'Jika panjang sisi bingkai persegi tersebut adalah 20 cm, manakah pernyataan berikut yang BENAR?',
    themeColor: 'rose',
    visualType: 'default',
    localLocation: 'Sentra Sasirangan Marabahan, Barito Kuala',
    inquiryNotes: 'Petunjuk Segitiga 45°-45°-90°: Segitiga siku-siku sama kaki memiliki rasio sisi : diagonal = 1 : √2.',
    parameters: [
      { label: 'Panjang Sisi Persegi (s)', value: '20 cm' },
      { label: 'Sudut Diagonal Rangka', value: '45°' },
      { label: 'Rasio Sisi Persegi', value: '1 : 1 : √2' },
      { label: 'Panjang Diagonal Bambu', value: '??? cm', isUnknown: true, hint: 'Hitung d = s√2' }
    ]
  },

  // ===================== SOAL 13 =====================
  13: {
    title: 'Sensor Partikel Debu Karhutla Musim Kemarau Barito Kuala',
    contextTag: 'Pemantauan Kualitas Lingkungan & Kesehatan Masyarakat Lahan Basah',
    questionPrompt: 'Berdasarkan analisis bilangan berpangkat negatif, manakah pernyataan perbandingan ukuran partikel yang BENAR?',
    themeColor: 'amber',
    visualType: 'default',
    localLocation: 'Stasiun Pengukur Kualitas Udara Batola',
    inquiryNotes: 'Petunjuk Pangkat Negatif: 10⁻ⁿ = 1 / 10ⁿ. Bandingkan nilai 2,5 × 10⁻⁶ m dengan 5 × 10⁻⁵ m.',
    parameters: [
      { label: 'Partikel Debu Halus PM2.5', value: '2,5 × 10⁻⁶ meter' },
      { label: 'Partikel Asap Lain', value: '5 × 10⁻⁵ meter' },
      { label: 'Definisi Pangkat Negatif', value: '10⁻⁶ = 0,000001' },
      { label: 'Perbandingan Skala (Rasio)', value: '??? kali lipat', isUnknown: true, hint: 'Bagi nilai partikel asap dengan partikel debu' }
    ]
  },

  // ===================== SOAL 14 =====================
  14: {
    title: 'Lintasan Menyeberang Perahu Jukung Terbawa Arus Sungai Barito',
    contextTag: 'Dinamika Transportasi Perahu Tradisional Masyarakat Batola',
    questionPrompt: 'Berdasarkan pergerakan perahu jukung tersebut, manakah analisis lintasan aktual yang BENAR?',
    themeColor: 'blue',
    visualType: 'pythagoras-river',
    imageUrl: imgSungaiBarito,
    localLocation: 'Penyeberangan Sungai Wanaraya, Barito Kuala',
    inquiryNotes: 'Petunjuk Vektor Geometri: Lebar sungai 60 m arah timur dan hanyutan arus 80 m arah selatan membentuk sudut 90°.',
    parameters: [
      { label: 'Lebar Sungai (Timur)', value: '60 meter' },
      { label: 'Hanyutan Arus (Selatan)', value: '80 meter' },
      { label: 'Sudut Aliran Sungai', value: '90° (Tegak Lurus)' },
      { label: 'Lintasan Riil Jukung (c)', value: '??? meter', isUnknown: true, hint: 'Hitung c = √(60² + 80²)' }
    ]
  },

  // ===================== SOAL 15 =====================
  15: {
    title: 'Dimensi Anyaman Tikar Purun Tradisional Pengrajin Wanaraya',
    contextTag: 'Sentra Kerajinan Tumbuhan Purun Rawa Danau Barito Kuala',
    questionPrompt: 'Manakah dari pernyataan berikut yang BENAR mengenai perhitungan ukuran dan luas tikar purun tersebut?',
    themeColor: 'amber',
    visualType: 'purun-mat',
    imageUrl: imgAnyamanPurun,
    localLocation: 'Pengrajin Purun Wanaraya, Barito Kuala',
    inquiryNotes: 'Petunjuk Aljabar: Bentuk sekawan (a + b)(a - b) = a² - b². Sederhanakan (4√5)² dan (2√3)²',
    parameters: [
      { label: 'Panjang Tikar (p)', value: '(4√5 + 2√3) cm' },
      { label: 'Lebar Tikar (l)', value: '(4√5 - 2√3) cm' },
      { label: 'Rumus Luas Persegi Panjang', value: 'L = p × l' },
      { label: 'Luas Anyaman Purun', value: '??? cm²', isUnknown: true, hint: 'Kurangkan (4√5)² dengan (2√3)²' }
    ]
  },

  // ===================== SOAL 16 =====================
  16: {
    title: 'Tali Tambat Perahu Jukung di Pasar Terapung Batola',
    contextTag: 'Kearifan Lokal Budaya Pasar Terapung Kalimantan Selatan',
    questionPrompt: 'Berdasarkan perbandingan sisi pada sudut istimewa 30°-60°-90°, manakah pernyataan ukuran yang BENAR?',
    themeColor: 'cyan',
    visualType: 'floating-market',
    localLocation: 'Pasar Terapung Lok Baintan, Batola - Banjar',
    inquiryNotes: 'Petunjuk Segitiga 30°-60°-90°: Panjang tali 12 m adalah hipotenusa. Tinggi patok di hadapan 30°, jarak di hadapan 60°.',
    parameters: [
      { label: 'Panjang Tali Tambat', value: '12 meter (Hipotenusa)' },
      { label: 'Sudut Kemiringan Tali', value: '30° terhadap air' },
      { label: 'Rasio Segitiga Khusus', value: '1 : √3 : 2' },
      { label: 'Tinggi Patok & Jarak Horisontal', value: '??? meter', isUnknown: true, hint: 'Tinggi = 12/2, Jarak = Tinggi × √3' }
    ]
  },

  // ===================== SOAL 17 =====================
  17: {
    title: 'Evaluasi Konsep Persamaan Aljabar Eksponen Kelas 8',
    contextTag: 'Pembelajaran Matematika Berdiferensiasi SMPN 1 Wanaraya',
    questionPrompt: 'Tentukan apakah masing-masing pernyataan aljabar bilangan berpangkat berikut BENAR atau SALAH!',
    themeColor: 'indigo',
    visualType: 'default',
    localLocation: 'Ruang Belajar Kelas 8 SMPN 1 Wanaraya, Batola',
    inquiryNotes: 'Petunjuk Aljabar: Cermati perbedaan tanda minus di dalam dan di luar tanda kurung pada (-3)⁴ vs -3⁴.',
    parameters: [
      { label: 'Pernyataan S1', value: '(-3)⁴ = 81 vs -3⁴ = -81' },
      { label: 'Pernyataan S2', value: 'x⁻⁵ senilai dengan -x⁵' },
      { label: 'Pernyataan S3', value: '(4a³) × (2a⁴) = 8a⁷' },
      { label: 'Tugas Penyelidikan', value: 'Validasi Benar / Salah', isUnknown: true, hint: 'Tentukan status validitas tiap pernyataan' }
    ]
  },

  // ===================== SOAL 18 =====================
  18: {
    title: 'Eksplorasi Formula Pembuat Tripel Pythagoras di Laboratorium',
    contextTag: 'Penalaran Matematika & Geometri SMPN 1 Wanaraya',
    questionPrompt: 'Ujilah kebenaran tiga pernyataan hasil perhitungan tripel Pythagoras berikut dengan memilih BENAR atau SALAH!',
    themeColor: 'orange',
    visualType: 'default',
    localLocation: 'Lab Matematika SMPN 1 Wanaraya, Barito Kuala',
    inquiryNotes: 'Petunjuk Rumus Tripel Kuno: Sisi a = p² - q², sisi b = 2pq, dan hipotenusa c = p² + q² dengan p > q.',
    parameters: [
      { label: 'Formula Sisi Alas (a)', value: 'p² - q²' },
      { label: 'Formula Sisi Tegak (b)', value: '2pq' },
      { label: 'Formula Hipotenusa (c)', value: 'p² + q²' },
      { label: 'Pengujian Nilai p & q', value: 'Validasi Benar / Salah', isUnknown: true, hint: 'Substitusi p=3, q=2 dan p=4, q=1' }
    ]
  },

  // ===================== SOAL 19 =====================
  19: {
    title: 'Rasionalisasi Kemiringan Tangga Beton Ramah Disabilitas',
    contextTag: 'Pembangunan Infrastruktur Inklusif Sekolah di Wanaraya',
    questionPrompt: 'Tentukan apakah masing-masing kesimpulan bentuk penyederhanaan ukuran tangga berikut BENAR atau SALAH!',
    themeColor: 'rose',
    visualType: 'default',
    localLocation: 'Halaman Gedung SMPN 1 Wanaraya, Barito Kuala',
    inquiryNotes: 'Petunjuk Operasi Akar: Sederhanakan pembagian √72 ÷ 3√2, rasionalisasi 4 / √8, dan perkalian 3√5 × 5√10.',
    parameters: [
      { label: 'Operasi Kasus 1', value: '√72 ÷ 3√2 = 2' },
      { label: 'Operasi Kasus 2', value: 'Bentuk Rasional 4 / √8' },
      { label: 'Operasi Kasus 3', value: '3√5 × 5√10 = 75√2' },
      { label: 'Status Uji Proyek', value: 'Validasi Benar / Salah', isUnknown: true, hint: 'Uji keabsahan tiap perhitungan' }
    ]
  },

  // ===================== SOAL 20 =====================
  20: {
    title: 'Klasifikasi Jenis Sudut Pondasi Gazebo Taman Sekolah',
    contextTag: 'Arsitektur Lansekap & Area Belajar Luar Ruang SMPN 1 Wanaraya',
    questionPrompt: 'Tentukan kebenaran dari pengujian tiga desain segitiga gazebo berikut dengan memilih BENAR atau SALAH!',
    themeColor: 'emerald',
    visualType: 'default',
    localLocation: 'Taman Gazebo SMPN 1 Wanaraya, Barito Kuala',
    inquiryNotes: 'Petunjuk Klasifikasi Sudut: Jika c² < a²+b² (Lancip), c² = a²+b² (Siku-siku), dan c² > a²+b² (Tumpul).',
    parameters: [
      { label: 'Rencana Pondasi 1', value: 'Sisi 4 m, 5 m, 6 m' },
      { label: 'Rencana Pondasi 2', value: 'Sisi 8 cm, 15 cm, 18 cm' },
      { label: 'Rencana Pondasi 3', value: 'Sisi 9 m, 12 m, 16 m' },
      { label: 'Hasil Pengujian Sudut', value: 'Validasi Benar / Salah', isUnknown: true, hint: 'Cek relasi kuadrat sisi terpanjang' }
    ]
  }
};
