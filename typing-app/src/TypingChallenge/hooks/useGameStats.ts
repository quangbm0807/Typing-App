import { useState, useEffect, useCallback } from 'react';
import { GameStats } from '../types';
import { INITIAL_TIME } from '../constants';

export const useGameStats = () => {
    const [stats, setStats] = useState<GameStats>({
        correctWords: 0,
        incorrectWords: 0,
        timeLeft: INITIAL_TIME,
        wpm: 0,
        accuracy: 0,
    });

    const updateStats = useCallback(() => {
        const totalWords = stats.correctWords + stats.incorrectWords;
        const accuracy = totalWords > 0
            ? Math.round((stats.correctWords / totalWords) * 100)
            : 0;
        const wpm = Math.round((stats.correctWords / ((INITIAL_TIME - stats.timeLeft) || 1)) * 60);

        setStats(prev => ({
            ...prev,
            accuracy,
            wpm
        }));
    }, [stats.correctWords, stats.incorrectWords, stats.timeLeft]);

    const incrementCorrect = () => {
        setStats(prev => ({ ...prev, correctWords: prev.correctWords + 1 }));
    };

    const incrementIncorrect = () => {
        setStats(prev => ({ ...prev, incorrectWords: prev.incorrectWords + 1 }));
    };

    const updateTimeLeft = (time: number) => {
        setStats(prev => ({ ...prev, timeLeft: time }));
    };

    return {
        stats,
        incrementCorrect,
        incrementIncorrect,
        updateTimeLeft,
        updateStats
    };
};
