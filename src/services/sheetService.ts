import { ExamResult, StudentUser } from '../types';

export const DEFAULT_SCRIPT_STORAGE_KEY = 'smpn1_wanaraya_gas_url';
export const LOCAL_USERS_STORAGE_KEY = 'smpn1_wanaraya_users';
export const LOCAL_RESULTS_STORAGE_KEY = 'smpn1_wanaraya_results';
export const LOCAL_CONFIG_STORAGE_KEY = 'smpn1_wanaraya_config';

export function getSavedScriptUrl(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(DEFAULT_SCRIPT_STORAGE_KEY) || '';
}

export function saveScriptUrl(url: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DEFAULT_SCRIPT_STORAGE_KEY, url.trim());
}

/**
 * Test connectivity with Google Apps Script Web App
 */
export async function testConnection(url?: string): Promise<{ connected: boolean; message: string; timestamp: string }> {
  const targetUrl = url || getSavedScriptUrl();
  const timestamp = new Date().toLocaleTimeString('id-ID');
  
  if (!targetUrl) {
    return {
      connected: false,
      message: 'URL Google Apps Script belum dikonfigurasi. Mode penyimpanan lokal aktif.',
      timestamp
    };
  }

  try {
    const pingUrl = `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}action=ping&t=${Date.now()}`;
    const response = await fetch(pingUrl, {
      method: 'GET',
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data = await response.json();
    if (data && (data.status === 'ok' || data.connected === true || data.status === 'success')) {
      return {
        connected: true,
        message: data.message || 'Berhasil terhubung ke Google Spreadsheet!',
        timestamp
      };
    }

    return {
      connected: true,
      message: 'Server merespons tetapi format berbeda. Koneksi dasar tersambung.',
      timestamp
    };
  } catch (err: any) {
    console.warn('Google Sheets Ping note:', err.message);
    // If CORS is restricting direct GET in iframe, still provide clear guidance
    return {
      connected: false,
      message: `Tidak dapat memverifikasi koneksi langsung (${err.message || 'CORS / Offline'}). Periksa Deployment Web App (akses "Anyone").`,
      timestamp
    };
  }
}

/**
 * Fetch student logins from Google Apps Script (sheet UserLogin)
 */
export async function fetchStudentsFromSheet(url?: string): Promise<StudentUser[] | null> {
  const targetUrl = url || getSavedScriptUrl();
  if (!targetUrl) return null;

  try {
    const fetchUrl = `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}action=getUsers&t=${Date.now()}`;
    const response = await fetch(fetchUrl, {
      method: 'GET',
      mode: 'cors'
    });

    if (!response.ok) return null;
    const result = await response.json();
    if (result && Array.isArray(result.users) && result.users.length > 0) {
      return result.users.map((u: any, idx: number) => {
        const rawClass = String(u.classRoom || u.Kelas || u.Rombel || '8A').toUpperCase();
        const classRoom: '8A' | '8B' = rawClass.includes('8B') || rawClass === 'B' ? '8B' : '8A';

        return {
          id: String(u.id || idx + 1),
          code: String(u.code || u.Kode || u['Kode Peserta'] || `WNR-${classRoom}-${String(idx + 1).padStart(2, '0')}`).trim(),
          username: String(u.username || u.Username || u['User Name'] || u.User || '').trim(),
          password: String(u.password || u.Password || u.Pass || u['Kata Sandi'] || u.Sandi || '123456').trim(),
          name: String(u.name || u.Nama || u['Nama Peserta'] || u['Nama Siswa'] || u['Nama Lengkap'] || `Siswa ${idx + 1}`).trim(),
          classRoom,
          token: String(u.token || u.Token || u['Token Ujian'] || 'ANBK2026').trim()
        };
      });
    }
    return null;
  } catch (error) {
    console.error('Error fetching students from Google Sheets:', error);
    return null;
  }
}

/**
 * Save single student (Kode, Username, Password, Nama Peserta, Kelas, Token) to Google Sheets
 */
export async function saveStudentToSheet(student: StudentUser, url?: string): Promise<boolean> {
  const targetUrl = url || getSavedScriptUrl();
  if (!targetUrl) return false;

  try {
    const payload = {
      action: 'saveUser',
      code: student.code,
      username: student.username,
      password: student.password || '123456',
      name: student.name,
      classRoom: student.classRoom,
      token: student.token,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(targetUrl, {
      method: 'POST',
      mode: 'no-cors', // standard for Google Apps Script Web App redirects
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return true;
  } catch (error) {
    console.error('Error posting student to Google Sheets:', error);
    return false;
  }
}

/**
 * Save exam result to Google Apps Script (sheet JawabanUjian)
 * Data: Nama, Kelas, Waktu, Durasi, Skor akhir, Jawaban tiap nomor
 */
export async function saveResultToSheet(result: ExamResult, url?: string): Promise<boolean> {
  const targetUrl = url || getSavedScriptUrl();
  if (!targetUrl) return false;

  try {
    const payload = {
      action: 'saveResult',
      id: result.id,
      studentCode: result.studentCode,
      name: result.name,
      classRoom: result.classRoom,
      timestamp: result.timestamp,
      durationMinutes: Math.round(result.durationSeconds / 60),
      score: result.score,
      totalCorrect: result.totalCorrect,
      totalQuestions: result.totalQuestions,
      answersSummary: result.answersSummary
    };

    await fetch(targetUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return true;
  } catch (error) {
    console.error('Failed to post exam result to Google Sheets:', error);
    return false;
  }
}

/**
 * Generated Google Apps Script code for the user to copy-paste into Google Sheets Script Editor
 */
export const COMPLETE_GOOGLE_APPS_SCRIPT = `/**
 * ============================================================================
 * GOOGLE APPS SCRIPT: CBT ANBK & LMS SMP NEGERI 1 WANARAYA
 * Tahun Ajaran 2026/2027
 * ============================================================================
 * Petunjuk Pemasangan:
 * 1. Buka Google Spreadsheet baru (atau yang sudah ada).
 * 2. Beri nama file, misalnya: "Database CBT ANBK SMPN 1 Wanaraya 2026-2027"
 * 3. Buat 2 Sheet/Tab:
 *    - Tab 1: "UserLogin"
 *    - Tab 2: "JawabanUjian"
 * 4. Klik menu "Ekstensi" (Extensions) > "Apps Script".
 * 5. Hapus semua kode default, lalu Tempel (Paste) seluruh kode ini.
 * 6. Klik tombol "Simpan" (ikon disket).
 * 7. Klik "Terapkan" (Deploy) > "Kelola Penerapan" atau "Penerapan Baru" (New Deployment).
 * 8. Pilih jenis: "Aplikasi Web" (Web App).
 *    - Jalankan sebagai: "Saya" (Me)
 *    - Siapa yang memiliki akses: "Siapa saja" (Anyone) -> SANGAT PENTING!
 * 9. Klik "Terapkan" (Deploy) dan salin URL Aplikasi Web yang dihasilkan.
 * 10. Tempelkan URL tersebut ke menu Admin > Pengaturan di aplikasi CBT.
 */

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'ping';
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Indikator Uji Koneksi (Ping)
  if (action === 'ping') {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'ok',
      connected: true,
      message: 'Koneksi Berhasil! Database SMPN 1 Wanaraya aktif.',
      time: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  }

  // 2. Tarik Data Siswa dari Sheet "UserLogin" dengan Smart Header Matching
  if (action === 'getUsers') {
    var sheet = ss.getSheetByName('UserLogin');
    if (!sheet) {
      sheet = inisialisasiSheetUserLogin(ss);
    }
    
    var data = sheet.getDataRange().getValues();
    var users = [];
    
    if (!data || data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        count: 0,
        users: []
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Baris 0 adalah header tabel
    var rawHeaders = data[0];
    var headers = [];
    for (var h = 0; h < rawHeaders.length; h++) {
      headers.push(String(rawHeaders[h] || '').trim().toLowerCase());
    }

    // Fungsi pencari indeks kolom berdasarkan daftar kata kunci (case-insensitive & partial match)
    function cariIndeks(keywords, defaultIndex) {
      for (var k = 0; k < keywords.length; k++) {
        var kw = keywords[k].toLowerCase();
        for (var c = 0; c < headers.length; c++) {
          if (headers[c] === kw || headers[c].indexOf(kw) !== -1) {
            return c;
          }
        }
      }
      return (defaultIndex < headers.length) ? defaultIndex : -1;
    }

    // Identifikasi kolom otomatis
    var colCode = cariIndeks(['kode peserta', 'kode', 'no peserta', 'nomor peserta', 'nisn', 'nis', 'id peserta', 'id'], 0);
    var colUser = cariIndeks(['username', 'user name', 'user', 'id pengguna', 'login user'], 1);
    var colPass = cariIndeks(['password', 'kata sandi', 'pass', 'sandi', 'pin'], 2);
    var colName = cariIndeks(['nama peserta', 'nama siswa', 'nama lengkap', 'nama'], 3);
    var colClass = cariIndeks(['kelas', 'rombel', 'ruang', 'tingkat'], 4);
    var colToken = cariIndeks(['token ujian', 'token sesi', 'token'], 5);

    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      // Lewati baris kosong
      var isEmpty = true;
      for (var r = 0; r < row.length; r++) {
        if (String(row[r] || '').trim() !== '') {
          isEmpty = false;
          break;
        }
      }
      if (isEmpty) continue;

      var valCode = (colCode >= 0 && colCode < row.length) ? String(row[colCode] || '').trim() : '';
      var valUser = (colUser >= 0 && colUser < row.length) ? String(row[colUser] || '').trim() : '';
      var valPass = (colPass >= 0 && colPass < row.length) ? String(row[colPass] || '').trim() : '';
      var valName = (colName >= 0 && colName < row.length) ? String(row[colName] || '').trim() : '';
      var valClass = (colClass >= 0 && colClass < row.length) ? String(row[colClass] || '').trim() : '';
      var valToken = (colToken >= 0 && colToken < row.length) ? String(row[colToken] || '').trim() : '';

      // Normalisasi kelas (8A atau 8B)
      var normClass = '8A';
      var upperClass = valClass.toUpperCase();
      if (upperClass.indexOf('8B') !== -1 || upperClass === 'B') {
        normClass = '8B';
      }

      // Default jika kosong
      if (!valUser && valCode) valUser = valCode.toLowerCase();
      if (!valUser && valName) valUser = valName.split(' ')[0].toLowerCase() + (normClass === '8B' ? '8b' : '8a');
      if (!valPass) valPass = '123456';
      if (!valName) valName = 'Peserta ' + i;
      if (!valCode) valCode = 'WNR-' + normClass + '-' + (i < 10 ? '0' + i : i);
      if (!valToken) valToken = 'ANBK2026';

      users.push({
        id: String(i),
        code: valCode,
        username: valUser,
        password: valPass,
        name: valName,
        classRoom: normClass,
        token: valToken
      });
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      count: users.length,
      users: users
    })).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'Aksi tidak dikenali'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var postData = JSON.parse(e.postData.contents);
    var action = postData.action || 'saveResult';

    // A. Simpan Hasil Ujian Siswa ke Sheet "JawabanUjian"
    if (action === 'saveResult') {
      var sheet = ss.getSheetByName('JawabanUjian');
      if (!sheet) {
        sheet = inisialisasiSheetJawabanUjian(ss);
      }

      // Format susunan kolom:
      // [Waktu, Kode Peserta, Nama Peserta, Kelas, Skor, Benar, Total Soal, Durasi (Menit), Jawaban Rinci]
      var answersText = '';
      if (postData.answersSummary) {
        var parts = [];
        for (var no = 1; no <= 20; no++) {
          parts.push('No ' + no + ': ' + (postData.answersSummary[no] || '-'));
        }
        answersText = parts.join(' | ');
      }

      sheet.appendRow([
        postData.timestamp || Utilities.formatDate(new Date(), "GMT+8", "yyyy-MM-dd HH:mm:ss"),
        postData.studentCode || '-',
        postData.name || 'Siswa',
        postData.classRoom || '8A',
        postData.score || 0,
        postData.totalCorrect || 0,
        postData.totalQuestions || 20,
        (postData.durationMinutes || 0) + ' menit',
        answersText
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Hasil ujian berhasil disimpan di Google Sheet JawabanUjian'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // B. Tambah/Perbarui Data Siswa ke Sheet "UserLogin" (Kode, Username, Password, Nama, Kelas, Token)
    if (action === 'saveUser') {
      var userSheet = ss.getSheetByName('UserLogin');
      if (!userSheet) {
        userSheet = inisialisasiSheetUserLogin(ss);
      }

      userSheet.appendRow([
        postData.code || ('WNR-' + (postData.classRoom || '8A') + '-' + Math.floor(Math.random()*900 + 100)),
        postData.username || '',
        postData.password || '123456',
        postData.name || '',
        postData.classRoom || '8A',
        postData.token || 'ANBK2026',
        new Date().toISOString()
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data siswa tersimpan di sheet UserLogin'
      })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Inisialisasi Sheet UserLogin otomatis bila belum ada
function inisialisasiSheetUserLogin(ss) {
  var sheet = ss.insertSheet('UserLogin');
  sheet.appendRow(['Kode Peserta', 'Username', 'Password', 'Nama Peserta', 'Kelas', 'Token Ujian', 'Tanggal Dibuat']);
  sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#1e40af').setFontColor('#ffffff');
  
  // Masukkan data awal demo dengan Username dan Password terpisah
  sheet.appendRow(['WNR-8A-01', 'ahmad8a', 'wnr8a01', 'Ahmad Fadillah', '8A', 'ANBK2026', new Date()]);
  sheet.appendRow(['WNR-8A-02', 'aisyah8a', 'wnr8a02', 'Siti Aisyah Rahmawati', '8A', 'ANBK2026', new Date()]);
  sheet.appendRow(['WNR-8A-03', 'budi8a', 'wnr8a03', 'Budi Santoso Pratama', '8A', 'ANBK2026', new Date()]);
  sheet.appendRow(['WNR-8B-01', 'gilang8b', 'wnr8b01', 'Gilang Ramadhan', '8B', 'ANBK2026', new Date()]);
  sheet.appendRow(['WNR-8B-02', 'hafizah8b', 'wnr8b02', 'Hafizah Nurul Hidayah', '8B', 'ANBK2026', new Date()]);
  sheet.appendRow(['WNR-8B-03', 'ilham8b', 'wnr8b03', 'Ilham Maulana', '8B', 'ANBK2026', new Date()]);
  return sheet;
}

// Inisialisasi Sheet JawabanUjian otomatis bila belum ada
function inisialisasiSheetJawabanUjian(ss) {
  var sheet = ss.insertSheet('JawabanUjian');
  sheet.appendRow(['Waktu Ujian', 'Kode Peserta', 'Nama Peserta', 'Kelas', 'Skor Akhir', 'Jumlah Benar', 'Total Soal', 'Durasi', 'Rincian Jawaban']);
  sheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#047857').setFontColor('#ffffff');
  return sheet;
}
`;
