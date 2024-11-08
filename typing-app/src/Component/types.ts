export interface Word {
    text: string;  // hoặc bất kỳ thuộc tính nào mà bạn cần
    status: string; // có thể là 'waiting', 'current', 'correct', 'incorrect', v.v.
}

export interface WordStat {
    word: string;
    attempts: number;
    correct: number;
    incorrect: number;
    accuracy: number;
}

export type Language = 'vietnamese' | 'english';

export interface TestHistory {
    date: string;
    wpm: number;
    accuracy: number;
    correctWords: number;
    incorrectWords: number;
    language: Language;
    duration: number;
}
