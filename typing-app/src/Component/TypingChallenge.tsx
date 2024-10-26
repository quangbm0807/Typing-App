import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Select, Typography, Space, Input, Progress, Tooltip } from 'antd';
import type { InputRef } from 'antd';
import { Word, WordStat, Language } from './types';
import { WORD_BANKS, GAME_DURATION, VISIBLE_WORDS_AHEAD, VISIBLE_WORDS_BEHIND, WORDS_BUFFER_THRESHOLD, WORDS_BATCH_SIZE } from './constants';
import Statistics from './Statistics';
import {
    Container,
    WordDisplay,
    WordSpan,
    StatsContainer,
    StatCard,
    InputWrapper
} from './style';

const { Title, Text } = Typography;
const { Option } = Select;

const TypingChallenge: React.FC = () => {
    const [language, setLanguage] = useState<Language>('vietnamese');
    const [words, setWords] = useState<Word[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [hasStartedTyping, setHasStartedTyping] = useState(false);
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectWords, setIncorrectWords] = useState(0);
    const [wordStats, setWordStats] = useState<Record<string, WordStat>>({});
    const inputRef = useRef<InputRef>(null);

    const generateMoreWords = useCallback(() => {
        const wordList = WORD_BANKS[language];
        const newWords: Word[] = [];
        for (let i = 0; i < WORDS_BATCH_SIZE; i++) {
            const randomIndex = Math.floor(Math.random() * wordList.length);
            newWords.push({
                text: wordList[randomIndex],
                status: 'waiting'
            });
        }
        return newWords;
    }, [language]);

    const startGame = () => {
        const initialWords = generateMoreWords();
        initialWords[0].status = 'current';
        setWords(initialWords);
        setCurrentIndex(0);
        setInput('');
        setIsRunning(true);
        setTimeLeft(GAME_DURATION);
        setHasStartedTyping(false);
        setCorrectWords(0);
        setIncorrectWords(0);
        setWordStats({});
        inputRef.current?.focus();
    };

    const updateWordStats = (word: string, isCorrect: boolean) => {
        setWordStats(prev => {
            const currentStat = prev[word] || { word, attempts: 0, correct: 0, incorrect: 0, accuracy: 0 };
            const newStat = {
                ...currentStat,
                attempts: currentStat.attempts + 1,
                correct: currentStat.correct + (isCorrect ? 1 : 0),
                incorrect: currentStat.incorrect + (isCorrect ? 0 : 1),
            };
            newStat.accuracy = (newStat.correct / newStat.attempts) * 100;
            return { ...prev, [word]: newStat };
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isRunning) return;
        if (!hasStartedTyping) {
            setHasStartedTyping(true);
        }
        setInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isRunning) return;

        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (input.trim() === '') return;

            const currentWord = words[currentIndex];
            const isCorrect = input.trim() === currentWord.text;

            updateWordStats(currentWord.text, isCorrect);

            setWords(prev => {
                const newWords = [...prev];
                newWords[currentIndex].status = isCorrect ? 'correct' : 'incorrect';

                // Add more words if needed
                if (currentIndex >= newWords.length - WORDS_BUFFER_THRESHOLD) {
                    newWords.push(...generateMoreWords());
                }

                if (currentIndex < newWords.length - 1) {
                    newWords[currentIndex + 1].status = 'current';
                }
                return newWords;
            });

            if (isCorrect) {
                setCorrectWords(prev => prev + 1);
            } else {
                setIncorrectWords(prev => prev + 1);
            }

            setCurrentIndex(prev => prev + 1);
            setInput('');
        }
    };

    useEffect(() => {
        if (!isRunning || !hasStartedTyping) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setIsRunning(false);
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning, hasStartedTyping]);

    useEffect(() => {
        if (isRunning) {
            inputRef.current?.focus();
        }
    }, [isRunning]);

    const getVisibleWords = () => {
        if (!isRunning && currentIndex === 0) {
            return words.slice(0, VISIBLE_WORDS_AHEAD);
        }

        const start = Math.max(0, currentIndex - VISIBLE_WORDS_BEHIND);
        const end = Math.min(words.length, currentIndex + VISIBLE_WORDS_AHEAD);
        return words.slice(start, end);
    };

    const accuracy = (correctWords + incorrectWords) > 0
        ? Math.round((correctWords / (correctWords + incorrectWords)) * 100)
        : 0;

    const wpm = Math.round((correctWords / ((GAME_DURATION - timeLeft) || 1)) * 60);

    return (
        <Container>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div style={{ textAlign: 'center' }}>
                    <Title level={3}>Typing Speed Test</Title>
                    <Space>
                        <Select
                            value={language}
                            onChange={(value: Language) => setLanguage(value)}
                            style={{ width: 120 }}
                            disabled={isRunning}
                        >
                            <Option value="vietnamese">Tiếng Việt</Option>
                            <Option value="english">English</Option>
                        </Select>
                        <Button type="primary" onClick={startGame} disabled={isRunning}>
                            {isRunning ? 'Đang chạy...' : 'Bắt đầu'}
                        </Button>
                    </Space>
                </div>

                <Progress
                    percent={Math.round((timeLeft / GAME_DURATION) * 100)}
                    status="active"
                    strokeWidth={50}
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    showInfo={false}
                />

                <StatsContainer>
                    <StatCard>
                        <Tooltip title="Thời gian còn lại">
                            <Title level={4}>{timeLeft}s</Title>
                            <Text type="secondary">Thời gian</Text>
                        </Tooltip>
                    </StatCard>
                    <StatCard>
                        <Tooltip title="Số từ gõ đúng">
                            <Title level={4}>{correctWords}</Title>
                            <Text type="secondary">Từ đúng</Text>
                        </Tooltip>
                    </StatCard>
                    <StatCard>
                        <Tooltip title="Số từ gõ sai">
                            <Title level={4}>{incorrectWords}</Title>
                            <Text type="secondary">Từ sai</Text>
                        </Tooltip>
                    </StatCard>
                    <StatCard>
                        <Tooltip title="Words Per Minute">
                            <Title level={4}>{wpm}</Title>
                            <Text type="secondary">WPM</Text>
                        </Tooltip>
                    </StatCard>
                    <StatCard>
                        <Tooltip title="Tỷ lệ gõ đúng">
                            <Title level={4}>{accuracy}%</Title>
                            <Text type="secondary">Độ chính xác</Text>
                        </Tooltip>
                    </StatCard>
                </StatsContainer>

                <WordDisplay>
                    {getVisibleWords().map((word, index) => (
                        <WordSpan key={`${word.text}-${index}`} status={word.status}>
                            {word.text}
                        </WordSpan>
                    ))}
                </WordDisplay>

                <InputWrapper>
                    <Input
                        ref={inputRef}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        disabled={!isRunning}
                        placeholder={isRunning ? "Gõ từ ở đây..." : "Nhấn 'Bắt đầu' để chơi"}
                        size="large"
                    />
                </InputWrapper>

                {!isRunning && correctWords > 0 && (
                    <Statistics wordStats={wordStats} />
                )}
            </Space>
        </Container>
    );
};

export default TypingChallenge;