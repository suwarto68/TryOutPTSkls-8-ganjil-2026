export interface ObjectiveItem {
  id: string;
  chapter: string;
  title: string;
  element: string;
  subElement: string;
  goals: string[];
  essentialQuestions: string[];
  keywords: string[];
}

export const LEARNING_OBJECTIVES: ObjectiveItem[] = [
  {
    id: 'bab-1',
    chapter: 'Bab 1',
    title: 'Bilangan Berpangkat dan Bentuk Akar',
    element: 'Bilangan',
    subElement: 'Eksponen, Bentuk Akar, dan Notasi Ilmiah',
    goals: [
      'Memahami konsep dan definisi bilangan berpangkat bulat positif, nol, dan bulat negatif.',
      'Memahami dan menerapkan sifat-sifat perkalian, pembagian, dan perpangkatan bilangan berpangkat (aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ / aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ).',
      'Menyelesaikan operasi aljabar bilangan berpangkat pada permasalahan nyata sains dan teknologi.',
      'Memahami hubungan bilangan berpangkat pecahan dengan bentuk akar (ⁿ√aᵐ = a^(m/n)).',
      'Menyelesaikan operasi penjumlahan, pengurangan, perkalian, dan pembagian bilangan bentuk akar.',
      'Merasionalkan penyebut pecahan bentuk akar (penyebut √a, a+√b, √a+√b).',
      'Menuliskan notasi ilmiah (Bentuk Baku) a × 10ⁿ (dengan 1 ≤ a < 10) untuk besaran mikroskopis dan makroskopis.'
    ],
    essentialQuestions: [
      'Apa makna fisis dan matematis dari bilangan berpangkat dalam memodelkan ukuran mikro dan makro?',
      'Apa perbedaan mendasar antara bilangan rasional dan bilangan bentuk akar irasional?',
      'Mengapa penyebut pecahan bentuk akar perlu dirasionalkan dalam perhitungan matematika?'
    ],
    keywords: [
      'Bilangan Berpangkat',
      'Basis & Eksponen',
      'Pangkat Negatif & Nol',
      'Bentuk Akar',
      'Merasionalkan Penyebut',
      'Bentuk Baku (Notasi Ilmiah)'
    ]
  },
  {
    id: 'bab-2',
    chapter: 'Bab 2',
    title: 'Teorema Pythagoras dan Penerapannya',
    element: 'Geometri & Pengukuran',
    subElement: 'Teorema Pythagoras, Segitiga Istimewa, dan Pemodelan Ruang',
    goals: [
      'Menganalisis informasi dan membuktikan kebenaran rumus Teorema Pythagoras (c² = a² + b²) melalui luas persegi.',
      'Menentukan panjang sisi segitiga siku-siku jika dua sisi lainnya diketahui.',
      'Memeriksa dan membuktikan kebalikan Teorema Pythagoras untuk menentukan jenis segitiga (siku-siku, lancip, tumpul).',
      'Menemukan dan mengidentifikasi bentuk tripel Pythagoras menggunakan rumus pembentukan (p² - q², 2pq, p² + q²).',
      'Membandingkan rasio perbandingan sisi-sisi pada segitiga siku-siku istimewa (sudut 45°-45°-90° dengan rasio 1:1:√2 dan 30°-60°-90° dengan rasio 1:√3:2).',
      'Menyelesaikan permasalahan kontekstual kehidupan sehari-hari (konstruksi atap, jembatan, tinggi layang-layang/tiang, jarak pelayaran).',
      'Menghitung jarak antara dua titik koordinat Kartesius A(x₁, y₁) dan B(x₂, y₂) menggunakan prinsip Pythagoras.'
    ],
    essentialQuestions: [
      'Bagaimana aturan teorema Pythagoras membantu pekerjaan teknik arsitektur dan konstruksi bangunan?',
      'Mengapa segitiga siku-siku istimewa memiliki perbandingan rasio sisi yang tetap?',
      'Bagaimana cara menentukan apakah tiga ukuran sisi membentuk segitiga siku-siku, lancip, atau tumpul?'
    ],
    keywords: [
      'Teorema Pythagoras',
      'Hipotenusa',
      'Tripel Pythagoras',
      'Segitiga Istimewa 45° & 30°-60°',
      'Kebalikan Pythagoras',
      'Jarak Koordinat Kartesius'
    ]
  }
];
