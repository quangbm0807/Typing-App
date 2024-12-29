export type Language = 'vi' | 'en';

export interface Word {
    text: string;
    status: 'waiting' | 'current' | 'correct' | 'incorrect';
}

export interface WordStat {
    word: string;
    attempts: number;
    correct: number;
    incorrect: number;
    accuracy: number;
}

export interface TestHistory {
    date: string;
    wpm: number;
    accuracy: number;
    correctWords: number;
    incorrectWords: number;
    language: Language;
    duration: number;
}