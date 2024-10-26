import { useState, useCallback } from 'react';
import { Word, Language } from '../types';
import { wordBanks, WORDS_PER_GENERATION } from '../constants';

export const useWordGenerator = (language: Language) => {
    const generateWords = useCallback((count: number): Word[] => {
        const wordList = wordBanks[language];
        const selectedWords: Word[] = [];

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * wordList.length);
            selectedWords.push({
                text: wordList[randomIndex],
                status: i === 0 ? 'current' : 'waiting'
            });
        }

        return selectedWords;
    }, [language]);

    return { generateWords };
};