export type QuestionType = 'pg' | 'pgk' | 'bs';

export type CognitiveLevel = 'Pemahaman' | 'Aplikasi' | 'Penalaran';

export interface PGOption {
  id: string;
  text: string;
}

export interface PGKOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface BSStatement {
  id: string;
  statement: string;
  correctAnswer: boolean; // true = Benar, false = Salah
}

export interface InfographicParam {
  label: string;
  value: string;
  hint?: string;
  isUnknown?: boolean;
}

export interface InfographicData {
  title: string;
  contextTag: string;
  questionPrompt: string; // Kalimat tanya yang tertulis di dalam infografis tanpa membocorkan jawaban
  themeColor: 'blue' | 'emerald' | 'amber' | 'indigo' | 'rose' | 'teal' | 'orange' | 'cyan';
  visualType: string;
  parameters: InfographicParam[];
  inquiryNotes: string;
  localLocation: string;
  imageUrl?: string;
}

export interface Question {
  id: number;
  number: number;
  type: QuestionType;
  topic: string;
  subElement: string;
  level: CognitiveLevel;
  stimulusTitle: string;
  stimulusText: string;
  stimulusImage?: string;
  stimulusBadge?: string;
  infographic?: InfographicData;
  questionText: string;
  // Options depending on type
  pgOptions?: PGOption[];
  correctPgAnswer?: string;
  pgkOptions?: PGKOption[];
  bsStatements?: BSStatement[];
  explanation: string;
}

export interface StudentUser {
  id: string;
  code: string;
  username: string;
  password?: string;
  name: string;
  classRoom: '8A' | '8B';
  token: string;
}

export interface StudentAnswer {
  questionId: number;
  type: QuestionType;
  pgAnswer?: string;
  pgkAnswers?: string[];
  bsAnswers?: Record<string, boolean>;
  isDoubtful?: boolean;
}

export interface ExamResult {
  id: string;
  studentCode: string;
  name: string;
  classRoom: string;
  timestamp: string;
  durationSeconds: number;
  score: number; // 0 - 100
  totalCorrect: number;
  totalQuestions: number;
  answersSummary: Record<number, string>;
  syncedToGoogleSheet: boolean;
}

export interface ExamConfig {
  durationMinutes: number;
  activeToken: string;
  randomizeQuestions: boolean;
  googleAppScriptUrl: string;
  adminPassword?: string;
}
