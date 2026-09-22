export interface MaterialTopic {
  id: string;
  chapter: string;
  title: string;
  posterUrl: string;
  posterDirectUrl?: string;
  summary: string;
  sections: {
    title: string;
    description: string;
    formula?: string;
    examples?: { problem: string; solution: string }[];
    points?: string[];
  }[];
  keyRules: { name: string; rule: string; explanation: string }[];
}

export const MATERIALS_DATA: MaterialTopic[] = [
  {
    id: 'materi-bab-1',
    chapter: 'Bab 1',
    title: 'Bilangan Berpangkat dan Bentuk Akar',
    posterUrl: 'https://postimg.cc/D4kDh9fN',
    summary: 'Materi ini mempelajari penulisan bilangan yang sangat besar (seperti jarak astronomis bumi dan matahari) serta bilangan yang sangat kecil (seperti ukuran sel, virus, atau nanometer) menggunakan eksponen positif, eksponen negatif, bentuk akar, serta bentuk baku (notasi ilmiah).',
    sections: [
      {
        title: '1. Pengertian Bilangan Berpangkat',
        description: 'Jika a adalah bilangan real dan n adalah bilangan bulat positif, maka aⁿ adalah perkalian berulang bilangan a sebanyak n faktor.',
        formula: 'aⁿ = a × a × a × ... × a (sebanyak n kali)',
        examples: [
          { problem: 'Hitunglah nilai 2⁸ dan 3⁵', solution: '2⁸ = 2×2×2×2×2×2×2×2 = 256; 3⁵ = 3×3×3×3×3 = 243' },
          { problem: 'Kapasitas 1 KB dalam byte', solution: '1 KB = 2¹⁰ Byte = 1.024 Byte' }
        ]
      },
      {
        title: '2. Sifat-Sifat Perkalian dan Pembagian Eksponen',
        description: 'Untuk basis yang sama, operasi perkalian menjumlahkan pangkat, sedangkan pembagian mengurangkan pangkat.',
        formula: 'aᵐ × aⁿ = aᵐ⁺ⁿ  |  aᵐ / aⁿ = aᵐ⁻ⁿ  |  (aᵐ)ⁿ = aᵐⁿ  |  (a × b)ᵐ = aᵐ × bᵐ',
        examples: [
          { problem: 'Sederhanakan 4⁵ / 4³ dan (3⁴)³', solution: '4⁵ / 4³ = 4^(5-3) = 4² = 16. (3⁴)³ = 3^(4×3) = 3¹²' }
        ]
      },
      {
        title: '3. Bilangan Berpangkat Nol dan Negatif',
        description: 'Setiap bilangan tak nol berpangkat 0 bernilai 1. Bilangan berpangkat negatif merupakan kebalikan (resiprokal) dari bilangan pangkat positifnya.',
        formula: 'a⁰ = 1 (untuk a ≠ 0)  |  a⁻ⁿ = 1 / aⁿ',
        examples: [
          { problem: 'Ubahlah 5⁻³ dan 10⁻³ ke bentuk desimal', solution: '5⁻³ = 1 / 5³ = 1/125 = 0,008; 10⁻³ = 1/1000 = 0,001' }
        ]
      },
      {
        title: '4. Operasi Aljabar dan Merasionalkan Bentuk Akar',
        description: 'Bentuk akar dapat disederhanakan dengan memfaktorkan kuadrat sempurna. Merasionalkan penyebut dilakukan dengan mengalikan bentuk sekawan (akar konjugat).',
        formula: 'a√m ± b√m = (a ± b)√m  |  √a × √b = √(a × b)  |  a / √b = (a√b) / b  |  c / (a + √b) = c(a - √b) / (a² - b)',
        examples: [
          { problem: 'Sederhanakan 2√8 + 6√18', solution: '2√(4×2) + 6√(9×2) = 2(2√2) + 6(3√2) = 4√2 + 18√2 = 22√2' },
          { problem: 'Rasionalkan 6 / (5 + √3)', solution: '6/(5+√3) × (5-√3)/(5-√3) = 6(5-√3)/(25-3) = (30 - 6√3)/22 = (15 - 3√3)/11' }
        ]
      },
      {
        title: '5. Notasi Ilmiah (Bentuk Baku)',
        description: 'Bentuk baku digunakan untuk menyatakan bilangan sangat besar atau sangat kecil secara efisien dalam rentang 1 ≤ a < 10.',
        formula: 'a × 10ⁿ, dengan 1 ≤ a < 10 dan n bilangan bulat',
        examples: [
          { problem: 'Nyatakan 456.000.000 dan 0,00004 ke bentuk baku', solution: '456.000.000 = 4,56 × 10⁸  ;  0,00004 = 4 × 10⁻⁵' },
          { problem: 'Massa bumi 6.000.000.000.000.000.000.000 ton', solution: 'Bentuk baku: 6 × 10²¹ ton (atau 6 × 10²⁴ kg)' }
        ]
      }
    ],
    keyRules: [
      { name: 'Aturan Perkalian', rule: 'aᵐ × aⁿ = aᵐ⁺ⁿ', explanation: 'Pangkat dijumlahkan jika bilangan basisnya identik.' },
      { name: 'Aturan Pembagian', rule: 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', explanation: 'Pangkat dikurangi jika bilangan basisnya sama.' },
      { name: 'Pangkat Berulang', rule: '(aᵐ)ⁿ = aᵐⁿ', explanation: 'Pangkat di dalam dan di luar tanda kurung dikalikan.' },
      { name: 'Pangkat Negatif', rule: 'a⁻ⁿ = 1 / aⁿ', explanation: 'Menyatakan pecahan desimal kecil sebagai pembagian berulang.' }
    ]
  },
  {
    id: 'materi-bab-2',
    chapter: 'Bab 2',
    title: 'Teorema Pythagoras dan Penerapannya',
    posterUrl: 'https://postimg.cc/bDDJWtdN',
    summary: 'Teorema Pythagoras menyatakan hubungan antara panjang sisi siku-siku dan sisi miring (hipotenusa) pada segitiga siku-siku. Sangat penting dalam arsitektur, konstruksi jembatan, navigasi laut, dan perhitungan jarak koordinat.',
    sections: [
      {
        title: '1. Dalil Teorema Pythagoras',
        description: 'Pada suatu segitiga siku-siku, luas persegi pada sisi miring sama dengan jumlah luas persegi pada kedua sisi siku-sikunya.',
        formula: 'c² = a² + b²  (c = sisi miring/hipotenusa, a & b = sisi siku-siku)',
        examples: [
          { problem: 'Segitiga siku-siku dengan sisi siku-siku 12 cm dan 5 cm. Hitung hipotenusa!', solution: 'c² = 12² + 5² = 144 + 25 = 169 → c = √169 = 13 cm' }
        ]
      },
      {
        title: '2. Kebalikan Teorema Pythagoras (Jenis Segitiga)',
        description: 'Jika c adalah sisi terpanjang suatu segitiga dengan sisi-sisi a, b, dan c, maka jenis segitiga dapat ditentukan:',
        formula: 'c² = a² + b² (Siku-siku)  |  c² < a² + b² (Segitiga Lancip)  |  c² > a² + b² (Segitiga Tumpul)',
        examples: [
          { problem: 'Apakah sisi 7 cm, 10 cm, 12 cm membentuk segitiga siku-siku?', solution: 'c² = 12² = 144. a² + b² = 7² + 10² = 49 + 100 = 149. Karena 144 < 149 (c² < a² + b²), maka termasuk SEGITIGA LANCIP.' }
        ]
      },
      {
        title: '3. Tripel Pythagoras',
        description: 'Tripel Pythagoras adalah tiga bilangan asli positif (a, b, c) yang tepat memenuhi c² = a² + b². Dapat digenerasikan melalui rumus parameter dua bilangan p > q:',
        formula: 'a = p² - q²,  b = 2pq,  c = p² + q²',
        examples: [
          { problem: 'Gunakan p = 2, q = 1 dan p = 3, q = 2', solution: 'Untuk (2,1): a=3, b=4, c=5 → (3, 4, 5). Untuk (3,2): a=5, b=12, c=13 → (5, 12, 13).' }
        ]
      },
      {
        title: '4. Perbandingan Segitiga Siku-Siku Istimewa',
        description: 'Terdapat dua rasio segitiga siku-siku istimewa yang memiliki perbandingan sisi bernilai konstan:',
        formula: 'Segitiga 45°-45°-90° → Rasio sisi: 1 : 1 : √2\nSegitiga 30°-60°-90° → Rasio sisi: 1 : √3 : 2',
        examples: [
          { problem: 'Segitiga 30°-60°-90° dengan sisi di depan 30° adalah 12 cm. Hitung hipotenusanya!', solution: 'Hipotenusa = 2 × sisi terpendek = 2 × 12 cm = 24 cm. Sisi lainnya = 12√3 cm.' }
        ]
      },
      {
        title: '5. Rumus Jarak Antara Dua Titik Koordinat Kartesius',
        description: 'Jarak antara dua titik A(x₁, y₁) dan B(x₂, y₂) diperoleh dari prinsip Pythagoras dengan alas (x₂ - x₁) dan tinggi (y₂ - y₁).',
        formula: 'Jarak AB = √[(x₂ - x₁)² + (y₂ - y₁)²]',
        examples: [
          { problem: 'Tentukan jarak antara titik A(-5, 3) dan B(3, -4)', solution: 'AB = √[(3 - (-5))² + (-4 - 3)²] = √[8² + (-7)²] = √[64 + 49] = √113 ≈ 10,63 satuan' }
        ]
      }
    ],
    keyRules: [
      { name: 'Persamaan Dasar', rule: 'c = √(a² + b²)', explanation: 'Menghitung sisi miring jika kedua sisi siku-siku diketahui.' },
      { name: 'Mencari Sisi Siku-siku', rule: 'a = √(c² - b²)', explanation: 'Menghitung salah satu sisi tegak dari hipotenusa dan sisi lain.' },
      { name: 'Tripel Populer', rule: '(3,4,5), (5,12,13), (7,24,25), (8,15,17)', explanation: 'Kelipatan dari tripel ini (misal 6,8,10 atau 9,12,15) juga merupakan tripel Pythagoras.' },
      { name: 'Rasio Sudut 45°', rule: 'Alas : Tinggi : Miring = 1 : 1 : √2', explanation: 'Berlaku untuk segitiga siku-siku sama kaki.' }
    ]
  }
];
