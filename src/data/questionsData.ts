import { Question } from '../types';

export const EXAM_QUESTIONS: Question[] = [
  // ===================== BAGIAN 1: PILIHAN GANDA (8 SOAL) =====================
  {
    id: 1,
    number: 1,
    type: 'pg',
    topic: 'Bilangan Berpangkat',
    subElement: 'Eksponen dan Rasio Data',
    level: 'Pemahaman',
    stimulusBadge: 'Digitalisasi Pendidikan Wanaraya',
    stimulusTitle: 'Penyimpanan Data Server ANBK SMPN 1 Wanaraya',
    stimulusText: 'Dalam rangka persiapan pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK) tahun ajaran 2026/2027 di SMP Negeri 1 Wanaraya, tim proktor menyiapkan perangkat server lokal untuk menampung bank soal dan rekaman audio listening. Setiap file paket soal dikemas dalam ukuran memori digital tertentu. Berdasarkan International System of Units (SI) dalam komputasi biner, kapasitas memori dinyatakan dalam kelipatan eksponen basis 2, di mana 1 Kilobyte (KB) = 2¹⁰ Byte. Jika server sekolah menyimpan arsip cadangan sebesar 16 Megabyte (MB) dan diketahui 1 MB = 2¹⁰ KB, maka kapasitas data tersebut perlu dinyatakan dalam bentuk bilangan berpangkat paling sederhana.',
    questionText: 'Berapakah ukuran kapasitas arsip server sebesar 16 MB tersebut jika dinyatakan dalam satuan Byte dengan basis 2?',
    pgOptions: [
      { id: 'A', text: '2²² Byte' },
      { id: 'B', text: '2²⁴ Byte' },
      { id: 'C', text: '2²⁶ Byte' },
      { id: 'D', text: '2²⁸ Byte' }
    ],
    correctPgAnswer: 'B',
    explanation: '16 MB = 16 × 1 MB = 16 × 2¹⁰ KB = 16 × 2¹⁰ × 2¹⁰ Byte. Karena 16 = 2⁴, maka 2⁴ × 2¹⁰ × 2¹⁰ = 2^(4 + 10 + 10) = 2²⁴ Byte. Jawaban yang benar adalah B.'
  },
  {
    id: 2,
    number: 2,
    type: 'pg',
    topic: 'Teorema Pythagoras',
    subElement: 'Konstruksi & Segitiga Siku-siku',
    level: 'Aplikasi',
    stimulusBadge: 'Infrastruktur Kalimantan Selatan',
    stimulusTitle: 'Pemeriksaan Tiang Penyangga Jembatan Rumpiang Barito Kuala',
    stimulusText: 'Jembatan Rumpiang yang melintasi Sungai Barito di Kabupaten Barito Kuala memerlukan pemeliharaan kabel pancang baja secara berkala. Seorang teknisi jembatan dari Dinas PUPR memasang kabel baja penguat dari puncak tiang utama ke titik angker di atas lantai jembatan. Tinggi tiang penyangga tegak lurus lantai jembatan adalah 24 meter, sedangkan jarak horizontal dari dasar tiang ke titik pengait angker kabel di lantai jembatan berjarak 7 meter. Untuk memastikan kekuatan tarikan terhadap hembusan angin sungai, teknisi harus memotong kawat baja sesuai panjang hipotenusa yang tepat.',
    questionText: 'Berdasarkan ilustrasi di atas, berapakah panjang kabel baja penguat yang harus disiapkan oleh teknisi tersebut?',
    pgOptions: [
      { id: 'A', text: '25 meter' },
      { id: 'B', text: '26 meter' },
      { id: 'C', text: '28 meter' },
      { id: 'D', text: '31 meter' }
    ],
    correctPgAnswer: 'A',
    explanation: 'Segitiga siku-siku memiliki sisi tegak a = 24 m dan sisi alas b = 7 m. Dengan Teorema Pythagoras: c² = a² + b² = 24² + 7² = 576 + 49 = 625. c = √625 = 25 meter. Kelompok (7, 24, 25) merupakan tripel Pythagoras. Jawaban yang benar adalah A.'
  },
  {
    id: 3,
    number: 3,
    type: 'pg',
    topic: 'Bilangan Bentuk Akar',
    subElement: 'Merasionalkan Penyebut',
    level: 'Aplikasi',
    stimulusBadge: 'Kearifan Lokal Banjar',
    stimulusTitle: 'Desain Ventilasi Ukiran Rumah Adat Bubungan Tinggi',
    stimulusText: 'Rumah Adat Banjar jenis Bubungan Tinggi memiliki ornamen kisi-kisi angin tradisional yang dibuat oleh pengrajin kayu di Kalimantan Selatan. Seorang arsitek lokal merancang bingkai ventilasi berbentuk persegi panjang dengan luas bidang 12 cm². Karena variasi pemasangan rangka kayu ulin, lebar ventilasi tersebut terukur sepanjang (√7 + √3) cm. Untuk menentukan panjang ventilasi secara presisi pada mesin potong numerik, nilai perbandingan panjang = Luas ÷ Lebar harus disederhanakan dengan merasionalkan bentuk akar pada penyebutnya.',
    questionText: 'Bentuk rasional paling sederhana dari ukuran panjang ventilasi kayu tersebut adalah...',
    pgOptions: [
      { id: 'A', text: '3(√7 - √3) cm' },
      { id: 'B', text: '4(√7 - √3) cm' },
      { id: 'C', text: '6(√7 + √3) cm' },
      { id: 'D', text: '2(√7 - √3) cm' }
    ],
    correctPgAnswer: 'A',
    explanation: 'Panjang = Luas / Lebar = 12 / (√7 + √3). Kalikan sekawan (√7 - √3) / (√7 - √3): [12(√7 - √3)] / [(√7)² - (√3)²] = [12(√7 - √3)] / (7 - 3) = [12(√7 - √3)] / 4 = 3(√7 - √3) cm. Jawaban yang benar adalah A.'
  },
  {
    id: 4,
    number: 4,
    type: 'pg',
    topic: 'Teorema Pythagoras',
    subElement: 'Segitiga Istimewa 30°-60°-90°',
    level: 'Penalaran',
    stimulusBadge: 'Pelayaran Sungai Barito',
    stimulusTitle: 'Navigasi Kapal Tongkang Batubara di Muara Barito',
    stimulusText: 'Sebuah kapal tunda (tugboat) menarik tongkang batubara melintasi alur pelayaran muara Sungai Barito menuju Laut Jawa. Petugas menara suar setinggi 40 meter di atas permukaan air mengamati posisi haluan kapal dengan sudut depresi 30° terhadap garis mendatar. Dalam geometri trigonometri dan segitiga istimewa dengan sudut 30°-60°-90°, perbandingan sisi di hadapan sudut 30°, sisi di hadapan 60°, dan hipotenusa adalah 1 : √3 : 2. Petugas suar ingin memprediksi jarak garis lurus (jarak pandang langsung) dari puncak menara ke haluan kapal.',
    questionText: 'Berapakah jarak garis lurus dari puncak menara suar ke posisi haluan kapal tersebut?',
    pgOptions: [
      { id: 'A', text: '60 meter' },
      { id: 'B', text: '80 meter' },
      { id: 'C', text: '40√3 meter' },
      { id: 'D', text: '80√3 meter' }
    ],
    correctPgAnswer: 'B',
    explanation: 'Tinggi menara h = 40 m berada di hadapan sudut 30°. Pada segitiga siku-siku 30°-60°-90°, rasio sisi: sisi hadap 30° : sisi hadap 60° : hipotenusa = 1 : √3 : 2. Jarak garis lurus puncak menara ke kapal adalah hipotenusa = 2 × (sisi hadap 30°) = 2 × 40 m = 80 meter. Jawaban yang benar adalah B.'
  },
  {
    id: 5,
    number: 5,
    type: 'pg',
    topic: 'Bilangan Berpangkat',
    subElement: 'Notasi Ilmiah / Bentuk Baku',
    level: 'Aplikasi',
    stimulusBadge: 'Agroindustri Barito Kuala',
    stimulusTitle: 'Produksi Kelapa Sawit di Kecamatan Wanaraya',
    stimulusText: 'Kecamatan Wanaraya di Kabupaten Barito Kuala dikenal sebagai salah satu sentra perkebunan kelapa sawit rakyat dan plasma mandiri. Berdasarkan data rekapitulasi gabungan kelompok tani tahun 2026, total estimasi hasil tandan buah segar (TBS) kelapa sawit yang dipanen dalam satu musim panen mencapai 14.800.000 kilogram. Untuk keperluan laporan digital statistik pertanian tingkat provinsi Kalimantan Selatan, data kuantitas produksi tersebut wajib diformat ke dalam bentuk baku (notasi ilmiah) a × 10ⁿ dengan batasan baku 1 ≤ a < 10.',
    questionText: 'Penulisan berat panen kelapa sawit tersebut dalam bentuk baku matematika yang tepat adalah...',
    pgOptions: [
      { id: 'A', text: '1,48 × 10⁶ kg' },
      { id: 'B', text: '14,8 × 10⁶ kg' },
      { id: 'C', text: '1,48 × 10⁷ kg' },
      { id: 'D', text: '0,148 × 10⁸ kg' }
    ],
    correctPgAnswer: 'C',
    explanation: '14.800.000 kg memiliki tanda koma digeser ke kiri sebanyak 7 tempat agar memenuhi 1 ≤ a < 10, sehingga a = 1,48 dan eksponen n = 7. Maka bentuk bakunya adalah 1,48 × 10⁷ kg. Jawaban yang benar adalah C.'
  },
  {
    id: 6,
    number: 6,
    type: 'pg',
    topic: 'Teorema Pythagoras',
    subElement: 'Kebalikan Pythagoras & Jenis Segitiga',
    level: 'Penalaran',
    stimulusBadge: 'Pertukangan Bangunan',
    stimulusTitle: 'Verifikasi Kerangka Kuda-Kuda Atap Balai Desa Wanaraya',
    stimulusText: 'Dalam renovasi balai pertemuan warga di Wanaraya, seorang mandor tukang mengukur panjang tiga batang kayu ulin yang akan disambung menjadi satu segitiga rangka kuda-kuda atap. Tiga batang kayu tersebut masing-masing berukuran panjang 10 dm, 24 dm, dan 26 dm. Agar beban atap seng gelombang terdistribusi dengan stabil, sudut pertemuan antar kayu harus dipastikan memenuhi kriteria apakah membentuk segitiga siku-siku, lancip, atau tumpul sesuai prinsip kebalikan Teorema Pythagoras c² terhadap (a² + b²).',
    questionText: 'Berdasarkan ukuran ketiga batang kayu ulin tersebut, jenis segitiga rangka kuda-kuda yang terbentuk adalah...',
    pgOptions: [
      { id: 'A', text: 'Segitiga siku-siku karena 26² = 10² + 24²' },
      { id: 'B', text: 'Segitiga lancip karena 26² < 10² + 24²' },
      { id: 'C', text: 'Segitiga tumpul karena 26² > 10² + 24²' },
      { id: 'D', text: 'Bukan segitiga karena sisi terpanjang melebihi jumlah sisi lainnya' }
    ],
    correctPgAnswer: 'A',
    explanation: 'Sisi terpanjang c = 26. Hitung c² = 26² = 676. Sisi siku-siku a = 10 dan b = 24. a² + b² = 10² + 24² = 100 + 576 = 676. Karena c² = a² + b² (676 = 676), maka segitiga tersebut adalah segitiga siku-siku (Tripel Pythagoras kelipatan dari 5, 12, 13). Jawaban yang benar adalah A.'
  },
  {
    id: 7,
    number: 7,
    type: 'pg',
    topic: 'Bilangan Berpangkat',
    subElement: 'Operasi Eksponen Pecahan',
    level: 'Pemahaman',
    stimulusBadge: 'Matematika Terapan',
    stimulusTitle: 'Penyederhanaan Perhitungan Debit Pompa Irigasi Rawa Pasang Surut',
    stimulusText: 'Lahan pertanian di wilayah pasang surut Barito Kuala memanfaatkan pompa air listrik untuk mengalirkan air irigasi ke saluran primer persawahan pasang surut. Rumus teknis efisiensi daya pompa melibatkan perhitungan nilai eksponen pecahan (32^(3/5)) × (81^(1/4)). Siswa kelas 8 SMP Negeri 1 Wanaraya diminta membantu menghitung hasil perkalian bilangan pangkat pecahan tersebut dengan mengubah setiap bilangan pokok (basis) menjadi bilangan prima berpangkat terkecil terlebih dahulu.',
    questionText: 'Berapakah nilai akhir dari hasil operasi bilangan pangkat pecahan tersebut?',
    pgOptions: [
      { id: 'A', text: '18' },
      { id: 'B', text: '24' },
      { id: 'C', text: '32' },
      { id: 'D', text: '36' }
    ],
    correctPgAnswer: 'B',
    explanation: '32 = 2⁵, sehingga 32^(3/5) = (2⁵)^(3/5) = 2^(5 × 3/5) = 2³ = 8. Selanjutnya 81 = 3⁴, sehingga 81^(1/4) = (3⁴)^(1/4) = 3^(4 × 1/4) = 3¹ = 3. Maka hasil perkaliannya adalah 8 × 3 = 24. Jawaban yang benar adalah B.'
  },
  {
    id: 8,
    number: 8,
    type: 'pg',
    topic: 'Teorema Pythagoras',
    subElement: 'Koordinat Kartesius & Jarak Dua Titik',
    level: 'Penalaran',
    stimulusBadge: 'Pemetaan Geografis',
    stimulusTitle: 'Jarak GPS Dermaga Feri Marabahan ke Pos Pantau Wanaraya',
    stimulusText: 'Pada peta koordinat digital BMKG Kalimantan Selatan dengan skala 1 satuan = 1 kilometer, Dermaga Feri Penyeberangan Marabahan terletak pada titik koordinat P(-2, 3), sedangkan Pos Pengamatan Pengendalian Banjir Wanaraya terletak pada titik Q(6, -3). Dinas Perhubungan ingin merencanakan jalur komunikasi gelombang radio langsung antara Dermaga P dan Pos Q. Panjang garis hubung langsung dihitung menggunakan formula jarak dua titik pada bidang koordinat Kartesius yang berbasis teorema Pythagoras: d = √[(x₂ - x₁)² + (y₂ - y₁)²].',
    questionText: 'Berapakah jarak lurus udara antara Dermaga Marabahan dan Pos Wanaraya berdasarkan peta tersebut?',
    pgOptions: [
      { id: 'A', text: '8 kilometer' },
      { id: 'B', text: '10 kilometer' },
      { id: 'C', text: '12 kilometer' },
      { id: 'D', text: '14 kilometer' }
    ],
    correctPgAnswer: 'B',
    explanation: 'Titik P(x₁, y₁) = (-2, 3) dan Q(x₂, y₂) = (6, -3). Selisih x = 6 - (-2) = 8. Selisih y = -3 - 3 = -6. d = √[8² + (-6)²] = √[64 + 36] = √100 = 10 kilometer. Jawaban yang benar adalah B.'
  },

  // ===================== BAGIAN 2: PILIHAN GANDA KOMPLEKS (8 SOAL) =====================
  {
    id: 9,
    number: 9,
    type: 'pgk',
    topic: 'Bilangan Berpangkat',
    subElement: 'Sifat-Sifat Operasi Eksponen',
    level: 'Aplikasi',
    stimulusBadge: 'Eksperimen Sains SMP',
    stimulusTitle: 'Pertumbuhan Populasi Bakteri Pengurai Gambut Kalimantan',
    stimulusText: 'Laboratorium Biologi SMPN 1 Wanaraya melakukan penelitian terhadap bakteri pengurai tanah gambut yang diambil dari lahan pertanian Desa Sidomulyo Wanaraya. Awalnya terdapat 2³ koloni bakteri. Setiap 20 menit, koloni tersebut membelah diri menjadi 2 kali lipat sehingga mengikuti pola perpangkatan eksponen 2ⁿ. Dalam kegiatan diskusi matematika, siswa menganalisis berbagai sifat operasi perkalian dan pembagian bilangan berpangkat untuk memprediksi jumlah bakteri pada beberapa fase pengamatan.',
    questionText: 'Berdasarkan konsep sifat-sifat bilangan berpangkat aᵐ × aⁿ = aᵐ⁺ⁿ dan (aᵐ)ⁿ = aᵐⁿ, manakah pernyataan di bawah ini yang bernilai BENAR? (Pilihlah lebih dari satu jawaban yang benar!)',
    pgkOptions: [
      { id: 'A', text: 'Perkalian 2³ × 2⁵ setara dengan 2⁸ koloni bakteri', isCorrect: true },
      { id: 'B', text: 'Bentuk pembagian 2⁸ ÷ 2² menghasilkan 2⁶ = 64 koloni', isCorrect: true },
      { id: 'C', text: 'Perpangkatan berulang (2²)³ sama nilainya dengan 2⁵ = 32', isCorrect: false },
      { id: 'D', text: 'Jika koloni dikalikan dengan 2⁰, jumlah koloni tidak berubah karena 2⁰ = 1', isCorrect: true }
    ],
    explanation: 'Pernyataan A benar (2³ × 2⁵ = 2³⁺⁵ = 2⁸). Pernyataan B benar (2⁸ ÷ 2² = 2⁸⁻² = 2⁶ = 64). Pernyataan C salah karena (2²)³ = 2^(2×3) = 2⁶ = 64, bukan 2⁵. Pernyataan D benar karena 2⁰ = 1 sehingga pengali 1 tidak merubah nilai. Pilihan benar: A, B, D.'
  },
  {
    id: 10,
    number: 10,
    type: 'pgk',
    topic: 'Teorema Pythagoras',
    subElement: 'Tripel Pythagoras',
    level: 'Pemahaman',
    stimulusBadge: 'Arsitektur Lokal',
    stimulusTitle: 'Pabrikasi Rangka Jendela Sekolah SMPN 1 Wanaraya',
    stimulusText: 'Koperasi pengrajin kayu mitra SMPN 1 Wanaraya membuat kusen siku-siku untuk ruang kelas baru. Untuk memastikan bahwa setiap sudut bingkai benar-benar 90° tanpa alat busur derajat modern, tukang menggunakan kombinasi ukuran panjang tiga sisi yang membentuk Tripel Pythagoras (c² = a² + b²). Guru matematika meminta siswa menguji empat kelompok ukuran batang kayu yang disiapkan untuk menentukan mana yang memenuhi syarat tripel Pythagoras bulat positif.',
    questionText: 'Manakah dari kelompok tiga ukuran sisi berikut yang BENAR merupakan Tripel Pythagoras? (Pilihlah lebih dari satu jawaban yang benar!)',
    pgkOptions: [
      { id: 'A', text: 'Ukuran batang kayu: 6 cm, 8 cm, 10 cm', isCorrect: true },
      { id: 'B', text: 'Ukuran batang kayu: 5 cm, 12 cm, 13 cm', isCorrect: true },
      { id: 'C', text: 'Ukuran batang kayu: 8 cm, 15 cm, 17 cm', isCorrect: true },
      { id: 'D', text: 'Ukuran batang kayu: 7 cm, 11 cm, 14 cm', isCorrect: false }
    ],
    explanation: 'A: 6² + 8² = 36 + 64 = 100 = 10² (Benar). B: 5² + 12² = 25 + 144 = 169 = 13² (Benar). C: 8² + 15² = 64 + 225 = 289 = 17² (Benar). D: 7² + 11² = 49 + 121 = 170 ≠ 14² (196) (Salah). Pilihan benar: A, B, C.'
  },
  {
    id: 11,
    number: 11,
    type: 'pgk',
    topic: 'Bilangan Bentuk Akar',
    subElement: 'Operasi Penjumlahan dan Pengurangan Bentuk Akar',
    level: 'Aplikasi',
    stimulusBadge: 'Pengukuran Lapangan',
    stimulusTitle: 'Pengukuran Keliling Taman Toga SMPN 1 Wanaraya',
    stimulusText: 'Kader Adiwiyata SMP Negeri 1 Wanaraya membuat taman tanaman obat keluarga (TOGA) berbentuk bangun datar segi empat tak beraturan. Hasil pengukuran keempat sisi taman oleh kelompok siswa menghasilkan ukuran panjang dalam bentuk akar kuadrat meter: sisi AB = 2√12 m, sisi BC = 3√27 m, sisi CD = √48 m, dan sisi DA = √75 m. Agar mempermudah pemesanan kawat pagar keliling, siswa menyederhanakan masing-masing bentuk akar ke dalam suku sejenis berakar √3.',
    questionText: 'Tentukan kebenaran dari pernyataan-pernyataan penyederhanaan ukuran sisi taman berikut! (Pilihlah lebih dari satu jawaban yang benar!)',
    pgkOptions: [
      { id: 'A', text: 'Panjang sisi AB setara dengan 4√3 meter', isCorrect: true },
      { id: 'B', text: 'Panjang sisi BC setara dengan 9√3 meter', isCorrect: true },
      { id: 'C', text: 'Panjang sisi CD setara dengan 6√3 meter', isCorrect: false },
      { id: 'D', text: 'Keliling total pagar taman adalah 22√3 meter', isCorrect: true }
    ],
    explanation: 'AB = 2√12 = 2√(4×3) = 4√3 m (A Benar). BC = 3√27 = 3√(9×3) = 9√3 m (B Benar). CD = √48 = √(16×3) = 4√3 m, bukan 6√3 m (C Salah). DA = √75 = √(25×3) = 5√3 m. Keliling = 4√3 + 9√3 + 4√3 + 5√3 = 22√3 m (D Benar). Pilihan benar: A, B, D.'
  },
  {
    id: 12,
    number: 12,
    type: 'pgk',
    topic: 'Teorema Pythagoras',
    subElement: 'Segitiga Siku-Siku Sama Kaki (45°-45°-90°)',
    level: 'Aplikasi',
    stimulusBadge: 'Kerajinan Banjar',
    stimulusTitle: 'Bingkai Kain Sasirangan Bentuk Persegi',
    stimulusText: 'Seni kain Sasirangan khas Kalimantan Selatan memiliki motif gigi haruan dan bayam raja. Pengrajin memajang kain sasirangan berbentuk persegi berukuran sisi s cm di dalam etalase. Untuk memperkuat bagian belakang bingkai, dipasang bilah bambu diagonal menyilang dari satu sudut ke sudut seberangnya. Sudut yang terbentuk antara sisi persegi dan diagonal adalah 45°, membentuk dua segitiga siku-siku sama kaki dengan perbandingan sisi siku-siku terhadap diagonal adalah 1 : 1 : √2.',
    questionText: 'Jika panjang sisi bingkai persegi tersebut adalah 20 cm, manakah pernyataan berikut yang BENAR? (Pilihlah lebih dari satu jawaban yang benar!)',
    pgkOptions: [
      { id: 'A', text: 'Panjang diagonal bingkai bambu adalah 20√2 cm', isCorrect: true },
      { id: 'B', text: 'Kuadrat panjang diagonal sama dengan 800 cm²', isCorrect: true },
      { id: 'C', text: 'Jika diagonal berukuran 30 cm, maka panjang sisinya adalah 15√2 cm', isCorrect: true },
      { id: 'D', text: 'Perbandingan luas persegi terhadap kuadrat diagonalnya adalah 1 : 3', isCorrect: false }
    ],
    explanation: 'A Benar: Diagonal = s√2 = 20√2 cm. B Benar: (20√2)² = 400 × 2 = 800 cm² (sesuai d² = 20² + 20² = 400 + 400 = 800). C Benar: s = d / √2 = 30 / √2 = 15√2 cm. D Salah: Luas persegi = s²; kuadrat diagonal = 2s², rasio = s² : 2s² = 1 : 2, bukan 1 : 3. Pilihan benar: A, B, C.'
  },
  {
    id: 13,
    number: 13,
    type: 'pgk',
    topic: 'Bilangan Berpangkat',
    subElement: 'Pangkat Negatif dan Rasio Desimal',
    level: 'Penalaran',
    stimulusBadge: 'Kualitas Lingkungan Lahan Basah',
    stimulusTitle: 'Partikel Debu Asap Karhutla di Wilayah Barito',
    stimulusText: 'Pada musim kemarau di lahan gambut Kalimantan Selatan, pemantauan kualitas udara mengukur partikel mikro debu PM2.5 yang berdiameter sangat kecil. Sebuah alat sensor partikulat mencatat ukuran diameter partikel debu adalah 2,5 × 10⁻⁶ meter dan ukuran partikel asap lain berukuran 5 × 10⁻⁵ meter. Siswa kelas 8 menganalisis hubungan bilangan berpangkat negatif dengan pecahan biasa dan perbandingan (rasio) ukuran antar kedua partikel tersebut.',
    questionText: 'Berdasarkan analisis bilangan berpangkat negatif, manakah pernyataan berikut yang BENAR? (Pilihlah lebih dari satu jawaban yang benar!)',
    pgkOptions: [
      { id: 'A', text: 'Nilai 10⁻⁶ setara dengan 1 / 1.000.000 atau 0,000001', isCorrect: true },
      { id: 'B', text: 'Ukuran 2,5 × 10⁻⁶ m dalam bentuk desimal ditulis 0,0000025 m', isCorrect: true },
      { id: 'C', text: 'Partikel berukuran 5 × 10⁻⁵ m berukuran lebih kecil daripada 2,5 × 10⁻⁶ m', isCorrect: false },
      { id: 'D', text: 'Rasio ukuran partikel (5 × 10⁻⁵) terhadap (2,5 × 10⁻⁶) bernilai 20 kali lipat', isCorrect: true }
    ],
    explanation: 'A Benar: 10⁻⁶ = 1/10⁶ = 0,000001. B Benar: 2,5 × 10⁻⁶ = 0,0000025 m. C Salah: 5 × 10⁻⁵ = 0,00005 m yang nilainya 20 kali LEBIH BESAR daripada 0,0000025 m. D Benar: (5 × 10⁻⁵) / (2,5 × 10⁻⁶) = (5 / 2,5) × 10^(-5 - (-6)) = 2 × 10¹ = 20 kali. Pilihan benar: A, B, D.'
  },
  {
    id: 14,
    number: 14,
    type: 'pgk',
    topic: 'Teorema Pythagoras',
    subElement: 'Penerapan Masalah Nyata',
    level: 'Penalaran',
    stimulusBadge: 'Aktivitas Sungai Barito',
    stimulusTitle: 'Menyeberang Sungai Barito dengan Arus Deras',
    stimulusText: 'Seorang motoris perahu jukung tradisional bertolak dari dermaga tepi barat Sungai Wanaraya hendak menuju dermaga tepat di seberang timur sungai selebar 60 meter. Namun akibat arus air sungai yang mengalir deras ke arah selatan dengan laju tertentu, perahu jukung terhanyut sejauh 80 meter ke arah selatan saat menyentuh tepi seberang. Lintasan aktual gerak perahu jukung membentuk sisi miring segitiga siku-siku antara arah lintasan tegak lurus sungai dan jarak hanyutan arus sungai.',
    questionText: 'Berdasarkan pergerakan perahu jukung tersebut, manakah analisis berikut yang BENAR? (Pilihlah lebih dari satu jawaban yang benar!)',
    pgkOptions: [
      { id: 'A', text: 'Panjang lintasan aktual yang ditempuh jukung adalah 100 meter', isCorrect: true },
      { id: 'B', text: 'Kombinasi jarak (60 m, 80 m, 100 m) merupakan kelipatan tripel Pythagoras (3, 4, 5)', isCorrect: true },
      { id: 'C', text: 'Panjang lintasan aktual jukung adalah 140 meter', isCorrect: false },
      { id: 'D', text: 'Kuadrat jarak tempuh aktual sama dengan 60² + 80² = 10.000', isCorrect: true }
    ],
    explanation: 'A Benar: Lintasan = √(60² + 80²) = √(3600 + 6400) = √10000 = 100 meter. B Benar: 60:80:100 disederhanakan dengan faktor 20 menjadi 3:4:5 (Tripel Pythagoras). C Salah: 140 m adalah penjumlahan aljabar biasa bukan jarak geometris garis lurus. D Benar: 60² + 80² = 3.600 + 6.400 = 10.000. Pilihan benar: A, B, D.'
  },
  {
    id: 15,
    number: 15,
    type: 'pgk',
    topic: 'Bilangan Berpangkat',
    subElement: 'Perkalian dan Pembagian Bentuk Akar',
    level: 'Aplikasi',
    stimulusBadge: 'Kerajinan Purun Barito',
    stimulusTitle: 'Luas Anyaman Tikar Purun Tradisional',
    stimulusText: 'Tumbuhan purun danau banyak dibudidayakan masyarakat Barito Kuala untuk dibuat kerajinan tikar anyaman bernilai ekonomi tinggi. Seorang perajin di Wanaraya membuat tikar hias persegi panjang dengan ukuran panjang (4√5 + 2√3) cm dan lebar (4√5 - 2√3) cm. Luas bidang tikar dihitung dengan rumus L = panjang × lebar, yang menggunakan konsep perkalian aljabar bentuk sekawan (a + b)(a - b) = a² - b².',
    questionText: 'Manakah dari pernyataan berikut yang BENAR mengenai perhitungan ukuran tikar purun tersebut? (Pilihlah lebih dari satu jawaban yang benar!)',
    pgkOptions: [
      { id: 'A', text: 'Nilai dari (4√5)² adalah 80', isCorrect: true },
      { id: 'B', text: 'Nilai dari (2√3)² adalah 12', isCorrect: true },
      { id: 'C', text: 'Luas tikar anyaman purun tersebut adalah 68 cm²', isCorrect: true },
      { id: 'D', text: 'Luas tikar anyaman purun tersebut adalah 92 cm²', isCorrect: false }
    ],
    explanation: 'Perkalian bentuk sekawan: L = (4√5 + 2√3)(4√5 - 2√3) = (4√5)² - (2√3)². (4√5)² = 16 × 5 = 80 (A Benar). (2√3)² = 4 × 3 = 12 (B Benar). L = 80 - 12 = 68 cm² (C Benar, D Salah). Pilihan benar: A, B, C.'
  },
  {
    id: 16,
    number: 16,
    type: 'pgk',
    topic: 'Teorema Pythagoras',
    subElement: 'Segitiga Khusus 30°-60°-90°',
    level: 'Penalaran',
    stimulusBadge: 'Kearifan Lokal Pasar Terapung',
    stimulusTitle: 'Tali Tambat Perahu Jukung di Pasar Terapung Lok Baintan',
    stimulusText: 'Di Pasar Terapung Lok Baintan Sungai Martapura, perahu-perahu jukung pedagang buah merapat ke dermaga kayu dengan mengikatkan tali ke patok tambat di tepi sungai. Sebuah tali tambat berukuran panjang 12 meter terikat dari geladak perahu ke puncak tiang patok tambat sehingga membentuk sudut elevasi 30° terhadap permukaan air sungai. Bentuk segitiga yang tercipta adalah segitiga siku-siku 30°-60°-90° dengan sisi miring adalah tali tambat.',
    questionText: 'Berdasarkan perbandingan sisi pada sudut istimewa 30°-60°-90°, manakah pernyataan yang BENAR? (Pilihlah lebih dari satu jawaban yang benar!)',
    pgkOptions: [
      { id: 'A', text: 'Tinggi tiang patok di atas permukaan air adalah 6 meter', isCorrect: true },
      { id: 'B', text: 'Jarak horizontal dari perahu ke pangkal patok adalah 6√3 meter', isCorrect: true },
      { id: 'C', text: 'Tinggi tiang patok di atas permukaan air adalah 6√3 meter', isCorrect: false },
      { id: 'D', text: 'Perbandingan tinggi patok terhadap jarak horizontal adalah 1 : √3', isCorrect: true }
    ],
    explanation: 'Pada segitiga siku-siku 30°-60°-90°: sisi hadap 30° : sisi hadap 60° : hipotenusa = 1 : √3 : 2. Hipotenusa = 12 m, maka sisi hadap 30° (tinggi patok) = 12 / 2 = 6 m (A Benar, C Salah). Sisi hadap 60° (jarak horizontal) = 6 × √3 = 6√3 m (B Benar). Rasio tinggi patok : jarak horizontal = 6 : 6√3 = 1 : √3 (D Benar). Pilihan benar: A, B, D.'
  },

  // ===================== BAGIAN 3: BENAR / SALAH (4 SOAL × 3 PERNYATAAN) =====================
  {
    id: 17,
    number: 17,
    type: 'bs',
    topic: 'Bilangan Berpangkat',
    subElement: 'Aturan Eksponen dan Pangkat Negatif',
    level: 'Pemahaman',
    stimulusBadge: 'Konsep Dasar Matematika',
    stimulusTitle: 'Pernyataan Konseptual Operasi Pangkat Bulat',
    stimulusText: 'Dalam pembelajaran matematika di kelas 8 semester ganjil SMP Negeri 1 Wanaraya, guru menyajikan tiga persamaan aljabar bilangan berpangkat di papan tulis. Tiga orang siswa memberikan argumen apakah penulisan sifat perpangkatan tersebut sudah sesuai dengan kaidah matematika atau mengalami kekeliruan perhitungan.',
    questionText: 'Tentukan apakah masing-masing pernyataan aljabar bilangan berpangkat berikut BENAR atau SALAH!',
    bsStatements: [
      {
        id: 'S1',
        statement: 'Persamaan (-3)⁴ menghasilkan nilai positif 81, sedangkan -3⁴ menghasilkan nilai negatif -81.',
        correctAnswer: true
      },
      {
        id: 'S2',
        statement: 'Untuk sembarang bilangan x ≠ 0, nilai dari x⁻⁵ senilai dengan -x⁵.',
        correctAnswer: false
      },
      {
        id: 'S3',
        statement: 'Bentuk sederhana dari perkalian (4a³) × (2a⁴) adalah 8a⁷.',
        correctAnswer: true
      }
    ],
    explanation: 'Pernyataan 1 BENAR: (-3)⁴ = (-3)×(-3)×(-3)×(-3) = 81 (pangkat genap kurung bernilai positif), sedangkan -3⁴ = -(3×3×3×3) = -81. Pernyataan 2 SALAH: x⁻⁵ = 1 / x⁵, bukan -x⁵. Pernyataan 3 BENAR: (4 × 2) × (a³ × a⁴) = 8 × a^(3+4) = 8a⁷.'
  },
  {
    id: 18,
    number: 18,
    type: 'bs',
    topic: 'Teorema Pythagoras',
    subElement: 'Tripel Pythagoras Generator Formula',
    level: 'Aplikasi',
    stimulusBadge: 'Eksplorasi Aljabar Geometri',
    stimulusTitle: 'Rumus Pembentukan Tripel Pythagoras (p² - q², 2pq, p² + q²)',
    stimulusText: 'Siswa kelas 8 SMPN 1 Wanaraya mempraktikkan cara kuno menemukan pasangan tiga bilangan bulat yang pasti membentuk segitiga siku-siku. Menggunakan dua bilangan asli sebarang p dan q dengan syarat p > q, ketiga sisi segitiga siku-siku didefinisikan sebagai: sisi alas a = p² - q², sisi tegak b = 2pq, dan hipotenusa c = p² + q².',
    questionText: 'Ujilah kebenaran tiga pernyataan hasil perhitungan tripel Pythagoras berikut dengan memilih BENAR atau SALAH!',
    bsStatements: [
      {
        id: 'S1',
        statement: 'Jika diambil p = 3 dan q = 2, maka tripel Pythagoras yang terbentuk adalah 5, 12, dan 13.',
        correctAnswer: true
      },
      {
        id: 'S2',
        statement: 'Jika diambil p = 4 dan q = 1, maka panjang hipotenusanya (sisi terpanjang) adalah 17.',
        correctAnswer: true
      },
      {
        id: 'S3',
        statement: 'Jika sisi terpendek segitiga siku-siku adalah 7, maka sisi lainnya menurut rumus M = (S² - 1)/2 adalah 20.',
        correctAnswer: false
      }
    ],
    explanation: 'Pernyataan 1 BENAR: a = 3² - 2² = 9 - 4 = 5; b = 2(3)(2) = 12; c = 3² + 2² = 9 + 4 = 13 → (5, 12, 13). Pernyataan 2 BENAR: c = 4² + 1² = 16 + 1 = 17. Pernyataan 3 SALAH: M = (7² - 1)/2 = (49 - 1)/2 = 48/2 = 24, bukan 20 (tripelnya adalah 7, 24, 25).'
  },
  {
    id: 19,
    number: 19,
    type: 'bs',
    topic: 'Bilangan Bentuk Akar',
    subElement: 'Penyederhanaan dan Merasionalkan Akar',
    level: 'Penalaran',
    stimulusBadge: 'Studi Kasus Matematika Terapan',
    stimulusTitle: 'Sifat Operasi Bentuk Akar pada Pengukuran Konstruksi',
    stimulusText: 'Dalam proyek pembuatan tangga beton ramah disabilitas di halaman SMPN 1 Wanaraya, tim sarana dan prasarana sekolah menghitung ketinggian anak tangga dan kemiringan pijakan. Hasil perhitungan awal menghasilkan angka pecahan berbentuk akar kuadrat yang perlu disederhanakan oleh pengawas lapangan.',
    questionText: 'Tentukan apakah masing-masing kesimpulan bentuk penyederhanaan berikut BENAR atau SALAH!',
    bsStatements: [
      {
        id: 'S1',
        statement: 'Hasil operasi pembagian √72 ÷ 3√2 menghasilkan bilangan bulat 2.',
        correctAnswer: true
      },
      {
        id: 'S2',
        statement: 'Bentuk rasional dari pecahan 4 / √8 adalah 2√2.',
        correctAnswer: false
      },
      {
        id: 'S3',
        statement: 'Hasil operasi 3√5 × 5√10 bernilai tepat sama dengan 75√2.',
        correctAnswer: true
      }
    ],
    explanation: 'Pernyataan 1 BENAR: √72 = 6√2, sehingga 6√2 ÷ 3√2 = 2. Pernyataan 2 SALAH: 4 / √8 = 4 / (2√2) = 2 / √2 = (2√2) / 2 = √2, bukan 2√2. Pernyataan 3 BENAR: (3 × 5) × √(5 × 10) = 15 × √50 = 15 × 5√2 = 75√2.'
  },
  {
    id: 20,
    number: 20,
    type: 'bs',
    topic: 'Teorema Pythagoras',
    subElement: 'Klasifikasi Segitiga Berdasarkan Sisi',
    level: 'Penalaran',
    stimulusBadge: 'Evaluasi Geometri Ruang',
    stimulusTitle: 'Identifikasi Jenis Segitiga pada Desain Gazebo Taman',
    stimulusText: 'Arsitek merancang lantai dasar gazebo taman sekolah SMPN 1 Wanaraya berbentuk segitiga dengan berbagai kombinasi ukuran panjang tiga sisi luar. Siswa diminta menguji apakah sudut gazebo tersebut lancip, siku-siku, atau tumpul dengan membandingkan kuadrat sisi terpanjang c² terhadap jumlah kuadrat kedua sisi lainnya (a² + b²).',
    questionText: 'Tentukan kebenaran dari pengujian tiga desain segitiga gazebo berikut dengan memilih BENAR atau SALAH!',
    bsStatements: [
      {
        id: 'S1',
        statement: 'Segitiga dengan panjang sisi 4 m, 5 m, dan 6 m merupakan segitiga lancip karena 6² < 4² + 5².',
        correctAnswer: true
      },
      {
        id: 'S2',
        statement: 'Segitiga dengan panjang sisi 8 cm, 15 cm, dan 18 cm merupakan segitiga siku-siku.',
        correctAnswer: false
      },
      {
        id: 'S3',
        statement: 'Segitiga dengan panjang sisi 9 m, 12 m, dan 16 m merupakan segitiga tumpul karena 16² > 9² + 12².',
        correctAnswer: true
      }
    ],
    explanation: 'Pernyataan 1 BENAR: 6² = 36; 4² + 5² = 16 + 25 = 41. Karena 36 < 41 (c² < a² + b²), terbukti SEGITIGA LANCIP. Pernyataan 2 SALAH: 18² = 324; 8² + 15² = 64 + 225 = 289. Karena 324 > 289, segitiga tersebut TUMPUL, bukan siku-siku (Tripel siku-sikunya adalah 8, 15, 17). Pernyataan 3 BENAR: 16² = 256; 9² + 12² = 81 + 144 = 225. Karena 256 > 225 (c² > a² + b²), terbukti SEGITIGA TUMPUL.'
  }
];
