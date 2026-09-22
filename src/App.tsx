import React, { useState, useEffect, useRef } from 'react';
import { 
  StudentUser, 
  StudentAnswer, 
  ExamResult, 
  ExamConfig, 
  Question 
} from './types';
import { EXAM_QUESTIONS } from './data/questionsData';
import { INITIAL_STUDENTS } from './data/initialUsers';
import { 
  getSavedScriptUrl, 
  saveScriptUrl, 
  testConnection, 
  fetchStudentsFromSheet, 
  saveResultToSheet,
  LOCAL_USERS_STORAGE_KEY,
  LOCAL_RESULTS_STORAGE_KEY,
  LOCAL_CONFIG_STORAGE_KEY
} from './services/sheetService';

import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ObjectivesView } from './components/ObjectivesView';
import { MaterialsView } from './components/MaterialsView';
import { ExamLoginModal } from './components/ExamLoginModal';
import { QuizPortalView } from './components/QuizPortalView';
import { ExamRoom } from './components/ExamRoom';
import { ExamResultView } from './components/ExamResultView';
import { AdminView } from './components/AdminView';

export default function App() {
  // Navigation
  const [currentView, setCurrentView] = useState<'home' | 'objectives' | 'materials' | 'exam' | 'admin' | 'result'>('home');

  // Config State
  const [config, setConfig] = useState<ExamConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_CONFIG_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore
        }
      }
    }
    return {
      durationMinutes: 80,
      activeToken: 'ANBK2026',
      randomizeQuestions: false,
      googleAppScriptUrl: getSavedScriptUrl() || ''
    };
  });

  // Students list
  const [students, setStudents] = useState<StudentUser[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_USERS_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {
          // ignore
        }
      }
    }
    return INITIAL_STUDENTS;
  });

  // Exam Results
  const [examResults, setExamResults] = useState<ExamResult[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_RESULTS_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {
          // ignore
        }
      }
    }
    return [];
  });

  // Active student & Exam session state
  const [activeStudent, setActiveStudent] = useState<StudentUser | null>(null);
  const [isExamLoginModalOpen, setIsExamLoginModalOpen] = useState<boolean>(false);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(EXAM_QUESTIONS);
  const [studentAnswers, setStudentAnswers] = useState<Record<number, StudentAnswer>>({});
  const [timerRemainingSeconds, setTimerRemainingSeconds] = useState<number>(config.durationMinutes * 60);
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [latestResult, setLatestResult] = useState<ExamResult | null>(null);
  const [examStartTime, setExamStartTime] = useState<number>(0);

  // Admin authentication
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Google Sheets Connection
  const [sheetConnected, setSheetConnected] = useState<boolean>(false);
  const [connectionMessage, setConnectionMessage] = useState<string>('');
  const [isTestingConnection, setIsTestingConnection] = useState<boolean>(false);
  const [isSyncingStudents, setIsSyncingStudents] = useState<boolean>(false);
  const [isSavingResultToSheet, setIsSavingResultToSheet] = useState<boolean>(false);

  // Timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initial connection test on mount
  useEffect(() => {
    handleTestConnection();
  }, []);

  // Persist students and results to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_USERS_STORAGE_KEY, JSON.stringify(students));
    }
  }, [students]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_RESULTS_STORAGE_KEY, JSON.stringify(examResults));
    }
  }, [examResults]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_CONFIG_STORAGE_KEY, JSON.stringify(config));
      saveScriptUrl(config.googleAppScriptUrl);
    }
  }, [config]);

  // Exam Countdown Timer
  useEffect(() => {
    if (isExamActive && timerRemainingSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            handleFinalSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isExamActive]);

  // Test Google Sheet connection
  const handleTestConnection = async (urlToTest?: string) => {
    setIsTestingConnection(true);
    const targetUrl = urlToTest || config.googleAppScriptUrl;
    const res = await testConnection(targetUrl);
    setSheetConnected(res.connected);
    setConnectionMessage(res.message);
    setIsTestingConnection(false);
    return res;
  };

  // Sync students from Google Spreadsheet
  const handleSyncStudents = async () => {
    setIsSyncingStudents(true);
    const sheetUsers = await fetchStudentsFromSheet(config.googleAppScriptUrl);
    if (sheetUsers && sheetUsers.length > 0) {
      setStudents(sheetUsers);
      setSheetConnected(true);
      alert(`Berhasil menarik ${sheetUsers.length} data siswa dari Google Spreadsheet sheet "UserLogin"!`);
    } else {
      alert('Tidak dapat menarik data siswa dari Google Spreadsheet. Mempertahankan data lokal.');
    }
    setIsSyncingStudents(false);
  };

  // Start Exam Flow
  const handleLoginSuccess = (student: StudentUser) => {
    setActiveStudent(student);
    setIsExamLoginModalOpen(false);

    // Prepare questions (randomize or natural order)
    let qList = [...EXAM_QUESTIONS];
    if (config.randomizeQuestions) {
      qList = qList.sort(() => Math.random() - 0.5);
    }
    setActiveQuestions(qList);
    setStudentAnswers({});
    setTimerRemainingSeconds(config.durationMinutes * 60);
    setExamStartTime(Date.now());
    setIsExamActive(true);
    setCurrentView('exam');
  };

  // Answer handler
  const handleAnswerChange = (questionId: number, partial: Partial<StudentAnswer>) => {
    setStudentAnswers(prev => {
      const existing = prev[questionId] || { questionId, type: 'pg' };
      return {
        ...prev,
        [questionId]: {
          ...existing,
          ...partial
        }
      };
    });
  };

  // Compute final score & submit
  const handleFinalSubmitExam = async () => {
    setIsExamActive(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const durationSeconds = Math.max(1, Math.round((Date.now() - examStartTime) / 1000));
    let correctCount = 0;
    const answersSummary: Record<number, string> = {};

    activeQuestions.forEach((q, idx) => {
      const ans = studentAnswers[q.id];
      const qNum = idx + 1;

      if (!ans) {
        answersSummary[qNum] = 'Kosong';
        return;
      }

      if (q.type === 'pg') {
        const isCorrect = ans.pgAnswer === q.correctPgAnswer;
        if (isCorrect) correctCount++;
        answersSummary[qNum] = `${ans.pgAnswer || '-'} (${isCorrect ? 'Benar' : 'Salah'})`;
      } else if (q.type === 'pgk') {
        const studentChecked = (ans.pgkAnswers || []).sort();
        const correctOptions = (q.pgkOptions || []).filter(o => o.isCorrect).map(o => o.id).sort();
        const isCorrect = 
          studentChecked.length === correctOptions.length &&
          studentChecked.every((val, i) => val === correctOptions[i]);
        if (isCorrect) correctCount++;
        answersSummary[qNum] = `[${studentChecked.join(',')}] (${isCorrect ? 'Benar' : 'Salah'})`;
      } else if (q.type === 'bs') {
        const bsAns = ans.bsAnswers || {};
        const stmts = q.bsStatements || [];
        const isAllCorrect = stmts.every(s => bsAns[s.id] === s.correctAnswer);
        if (isAllCorrect) correctCount++;
        const ansLabel = stmts.map(s => bsAns[s.id] === true ? 'B' : bsAns[s.id] === false ? 'S' : '-').join('/');
        answersSummary[qNum] = `${ansLabel} (${isAllCorrect ? 'Benar' : 'Salah'})`;
      }
    });

    const totalQuestions = activeQuestions.length;
    const finalScore = Math.round((correctCount / totalQuestions) * 100);

    const newResult: ExamResult = {
      id: `RES-${Date.now()}`,
      studentCode: activeStudent ? activeStudent.code : 'ANON',
      name: activeStudent ? activeStudent.name : 'Siswa',
      classRoom: activeStudent ? activeStudent.classRoom : '8A',
      timestamp: new Date().toLocaleString('id-ID'),
      durationSeconds,
      score: finalScore,
      totalCorrect: correctCount,
      totalQuestions,
      answersSummary,
      syncedToGoogleSheet: false
    };

    setLatestResult(newResult);
    setExamResults(prev => [newResult, ...prev]);
    setCurrentView('result');

    // Auto-save to Google Spreadsheet sheet "JawabanUjian"
    if (config.googleAppScriptUrl) {
      setIsSavingResultToSheet(true);
      const savedOk = await saveResultToSheet(newResult, config.googleAppScriptUrl);
      if (savedOk) {
        newResult.syncedToGoogleSheet = true;
      }
      setIsSavingResultToSheet(false);
    }
  };

  const handleRetrySyncResult = async () => {
    if (!latestResult) return;
    setIsSavingResultToSheet(true);
    await saveResultToSheet(latestResult, config.googleAppScriptUrl);
    setIsSavingResultToSheet(false);
    alert('Data hasil ujian telah dikirim ulang ke Google Spreadsheet!');
  };

  // Student Logout
  const handleStudentLogout = () => {
    if (isExamActive) {
      if (!confirm('Ujian sedang berlangsung! Apakah Anda yakin ingin keluar dan membatalkan ujian?')) {
        return;
      }
    }
    setIsExamActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveStudent(null);
    setCurrentView('home');
  };

  // Admin authentication verify (supports configured adminPassword or ANBK2026 default)
  const [adminTargetTab, setAdminTargetTab] = useState<'users' | 'results' | 'settings' | 'script'>('users');

  const handleAdminAuth = (inputPass: string) => {
    const validPass = config.adminPassword || 'ANBK2026';
    if (inputPass.trim() === validPass.trim() || inputPass.trim() === 'ANBK2026') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleOpenAdmin = (tab: 'users' | 'results' | 'settings' | 'script' = 'users') => {
    setAdminTargetTab(tab);
    setCurrentView('admin');
  };

  const handleAdminLock = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Header CBT ANBK & LMS */}
      <Header
        currentView={currentView}
        onNavigate={(v) => {
          if (isExamActive) {
            if (!confirm('Anda sedang dalam sesi ujian. Keluar akan membatalkan ujian. Lanjutkan?')) return;
            setIsExamActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
          }
          setCurrentView(v);
        }}
        activeStudent={activeStudent}
        onLogoutStudent={activeStudent ? handleStudentLogout : undefined}
        timerRemainingSeconds={timerRemainingSeconds}
        isExamActive={isExamActive}
        sheetConnected={sheetConnected}
        onOpenAdminModal={() => handleOpenAdmin('users')}
      />

      {/* Main Content View Switcher */}
      <div className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={(v) => setCurrentView(v)}
            onOpenExamLogin={() => setCurrentView('exam')}
            sheetConnected={sheetConnected}
            onOpenAdmin={() => handleOpenAdmin('users')}
          />
        )}

        {currentView === 'objectives' && (
          <ObjectivesView
            onBack={() => setCurrentView('home')}
            onNavigateToMaterials={() => setCurrentView('materials')}
            onStartExam={() => setCurrentView('exam')}
          />
        )}

        {currentView === 'materials' && (
          <MaterialsView
            onBack={() => setCurrentView('home')}
            onGoToExam={() => setCurrentView('exam')}
          />
        )}

        {currentView === 'exam' && (
          isExamActive && activeStudent ? (
            <ExamRoom
              questions={activeQuestions}
              student={activeStudent}
              studentAnswers={studentAnswers}
              onAnswerChange={handleAnswerChange}
              onSubmitExam={handleFinalSubmitExam}
              timerSeconds={timerRemainingSeconds}
            />
          ) : (
            <QuizPortalView
              onLoginSuccess={handleLoginSuccess}
              availableStudents={students}
              activeToken={config.activeToken}
              sheetConnected={sheetConnected}
              onSyncFromSheet={handleSyncStudents}
              isSyncing={isSyncingStudents}
              onBackToHome={() => setCurrentView('home')}
              onOpenAdmin={() => handleOpenAdmin('users')}
              activeStudent={activeStudent}
            />
          )
        )}

        {currentView === 'result' && latestResult && (
          <ExamResultView
            result={latestResult}
            onGoHome={() => setCurrentView('home')}
            onRetrySyncToSheet={handleRetrySyncResult}
            isSyncing={isSavingResultToSheet}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            isAuthenticated={isAdminAuthenticated}
            onAuthenticate={handleAdminAuth}
            onLock={handleAdminLock}
            initialTab={adminTargetTab}
            onBack={() => setCurrentView('home')}
            students={students}
            onAddStudent={(newSt) => setStudents(prev => [...prev, newSt])}
            onDeleteStudent={(id) => setStudents(prev => prev.filter(s => s.id !== id))}
            onSyncStudentsFromSheet={handleSyncStudents}
            isSyncingStudents={isSyncingStudents}
            examResults={examResults}
            onClearResults={() => setExamResults([])}
            config={config}
            onUpdateConfig={(c) => setConfig(c)}
            onTestConnection={handleTestConnection}
            isTestingConnection={isTestingConnection}
            sheetConnected={sheetConnected}
            connectionMessage={connectionMessage}
            questions={EXAM_QUESTIONS}
          />
        )}
      </div>

      {/* Student CBT Login Modal */}
      <ExamLoginModal
        isOpen={isExamLoginModalOpen}
        onClose={() => setIsExamLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        availableStudents={students}
        activeToken={config.activeToken}
        onSyncFromSheet={handleSyncStudents}
        isSyncing={isSyncingStudents}
      />
    </div>
  );
}
