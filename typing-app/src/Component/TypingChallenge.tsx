
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Select, Typography, Space, Input, Progress, Tooltip, Modal, Table, Radio, notification, Card, Divider } from 'antd';
import type { InputRef } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { format, isAfter, parseISO, subDays, subHours, subMonths } from 'date-fns';
import { WORD_BANKS, WORDS_BUFFER_THRESHOLD } from '../constants';
import { Word, WordStat, Language, TestHistory } from '../types';
import { useTranslation } from 'react-i18next';
import {
    Container,
    WordDisplay,
    WordSpan,
    StatCard,
    InputWrapper,
    ResponsiveStatsGrid
} from './style';
import Confetti from 'react-confetti';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, FireOutlined, GlobalOutlined, HistoryOutlined, LoadingOutlined, PercentageOutlined, PlayCircleOutlined, QuestionCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import TypingGuideTour from './TypingGuideTour';
import i18n from '../language/i18n';

const { Title, Text } = Typography;
const { Option } = Select;


type TimeRange = 'last10' | 'hourly' | 'daily' | 'monthly';
const TypingChallenge: React.FC = () => {
    const [interfaceLanguage, setInterfaceLanguage] = useState(() => {
        return localStorage.getItem('interfaceLanguage') || 'vi';
    });
    const { t, i18n } = useTranslation();
    const [bestWPM, setBestWPM] = useState(0);
    const [bestAccuracy, setBestAccuracy] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage ? (savedLanguage as Language) : 'vi'; // Giá trị mặc định
    });
    const [selectedDuration, setSelectedDuration] = useState(() => {
        const savedDuration = localStorage.getItem('duration');
        return savedDuration ? Number(savedDuration) : 60; // Giá trị mặc định
    });
    const [words, setWords] = useState<Word[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(selectedDuration);
    const [hasStartedTyping, setHasStartedTyping] = useState(false);
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectWords, setIncorrectWords] = useState(0);
    const [wordStats, setWordStats] = useState<Record<string, WordStat>>({});
    const [testComplete, setTestComplete] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const [showHistory, setShowHistory] = useState(false);
    const [testHistory, setTestHistory] = useState<TestHistory[]>([]);
    const [hasRecordedResult, setHasRecordedResult] = useState(false);
    const [timeRange, setTimeRange] = useState<TimeRange>('last10');
    const [newRecord, setNewRecord] = useState<{ type: 'wpm' | 'accuracy' | 'both'; value: number } | null>(null);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const DURATION_OPTIONS = [
        { value: 15, label: t('duration.seconds', { count: 15 }) },
        { value: 30, label: t('duration.seconds', { count: 30 }) },
        { value: 45, label: t('duration.seconds', { count: 45 }) },
        { value: 60, label: t('duration.seconds', { count: 60 }) },
    ];
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        // Lấy kỷ lục từ typingHistory
        const savedLanguage = localStorage.getItem('language') as Language | null;
        const savedDuration = localStorage.getItem('duration');
        if (savedLanguage) setLanguage(savedLanguage);
        if (savedDuration) setSelectedDuration(Number(savedDuration));

        // Load history
        const savedHistory = localStorage.getItem('typingHistory');
        if (savedHistory) {
            setTestHistory(JSON.parse(savedHistory));
        }
        if (savedHistory) {
            const history: TestHistory[] = JSON.parse(savedHistory);

            // Tìm WPM cao nhất
            const maxWPM = Math.max(...history.map(item => item.wpm), 0);
            setBestWPM(maxWPM);
            localStorage.setItem('bestWPM', String(maxWPM));

            // Tìm độ chính xác cao nhất
            const maxAccuracy = Math.max(...history.map(item => item.accuracy), 0);
            setBestAccuracy(maxAccuracy);
            localStorage.setItem('bestAccuracy', String(maxAccuracy));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    useEffect(() => {
        localStorage.setItem('duration', String(selectedDuration));
        // Reset các state liên quan
        setTimeLeft(selectedDuration);
        setCorrectWords(0);
        setIncorrectWords(0);
        setIsRunning(false);
        setTestComplete(false);
        setHasStartedTyping(false);
        setInput('');
        setCurrentIndex(0);
        setWordStats({});
        setHasRecordedResult(false);
    }, [selectedDuration]);
    useEffect(() => {
        // Initialize words when component mounts
        setWords(generateMoreWords());
    }, []);
    const calculateWPM = useCallback(() => {
        const timeElapsed = selectedDuration - timeLeft;
        if (timeElapsed <= 0 || correctWords <= 0) return 0;
        return Math.round((correctWords / timeElapsed) * 60);
    }, [correctWords, timeLeft, selectedDuration]);
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!isRunning && e.key === 'Enter') {
                startGame();
            }
            if (isRunning && e.altKey && e.key === 'r') {
                startGame();
                setIsRunning(false);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isRunning]);
    const generateMoreWords = useCallback(() => {
        const wordList = WORD_BANKS[language];
        if (!wordList) {
            console.error(`No word list found for language: ${language}`);
            return Array(30).fill({ text: 'error', status: 'waiting' as const });
        }

        const newWords: Word[] = [];
        for (let i = 0; i < 30; i++) {
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
        setTimeLeft(selectedDuration); // Đảm bảo thời gian được lấy từ selectedDuration
        setHasStartedTyping(false);
        setCorrectWords(0);
        setIncorrectWords(0);
        setWordStats({});
        setTestComplete(false);
        setHasRecordedResult(false); // Reset trạng thái lưu kết quả
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
        if (!isRunning) setInput('Alt + R để bắt đầu lại');
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
                    setTestComplete(true);
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




    // const getVisibleWords = () => {
    //     if (!isRunning && currentIndex === 0) {
    //         return words.slice(0, VISIBLE_WORDS_AHEAD);
    //     }

    //     const start = Math.max(0, currentIndex - VISIBLE_WORDS_BEHIND);
    //     const end = Math.min(words.length, currentIndex + VISIBLE_WORDS_AHEAD);
    //     return words.slice(start, end);
    // };
    const handleLanguageChange = (value: Language) => {
        setLanguage(value);
        setInterfaceLanguage(value);
        localStorage.setItem('interfaceLanguage', value);
        i18n.changeLanguage(value).then(() => {
            // Optional: Add any callbacks after language change
            console.log('Language changed successfully to:', value);
        }).catch(err => {
            console.error('Error changing language:', err);
        });
    };
    const accuracy = (correctWords + incorrectWords) > 0
        ? Math.round((correctWords / (correctWords + incorrectWords)) * 100)
        : 0;

    const wpm = calculateWPM();
    // Định nghĩa kiểu cho `acc` để lưu trữ dữ liệu đã được tổng hợp
    type AggregatedData = {
        [key: string]: {
            date: string;
            wpm: number;
            accuracy: number;
            count: number;
            rawDate: string;
        };
    };

    const getFilteredAndFormattedHistory = useCallback(() => {
        const now = new Date();
        let filteredData = [...testHistory];

        // Lọc dữ liệu theo khoảng thời gian
        switch (timeRange) {
            case 'hourly':
                filteredData = testHistory.filter(item =>
                    isAfter(parseISO(item.date), subHours(now, 24))
                );
                break;
            case 'daily':
                filteredData = testHistory.filter(item =>
                    isAfter(parseISO(item.date), subDays(now, 30))
                );
                break;
            case 'monthly':
                filteredData = testHistory.filter(item =>
                    isAfter(parseISO(item.date), subMonths(now, 12))
                );
                break;
            case 'last10':
                filteredData = testHistory.slice(0, 10);
                break;
        }

        // Định dạng dữ liệu theo khoảng thời gian
        let formattedData = filteredData.map(item => {
            const date = parseISO(item.date);
            let formattedDate = '';

            switch (timeRange) {
                case 'hourly':
                    formattedDate = format(date, 'HH:mm');
                    break;
                case 'daily':
                    formattedDate = format(date, 'dd/MM');
                    break;
                case 'monthly':
                    formattedDate = format(date, 'MM/yyyy');
                    break;
                case 'last10':
                    formattedDate = format(date, 'HH:mm dd/MM');
                    break;
            }

            return {
                date: formattedDate,
                wpm: item.wpm,
                accuracy: item.accuracy,
                rawDate: item.date // Giữ lại ngày gốc để sắp xếp sau
            };
        });

        // Tổng hợp dữ liệu cho chế độ hiển thị theo ngày hoặc tháng
        if (timeRange === 'monthly' || timeRange === 'daily') {
            formattedData = Object.values(
                formattedData.reduce((acc: AggregatedData, curr) => {
                    if (!acc[curr.date]) {
                        acc[curr.date] = {
                            date: curr.date,
                            wpm: curr.wpm,
                            accuracy: curr.accuracy,
                            count: 1,
                            rawDate: curr.rawDate
                        };
                    } else {
                        acc[curr.date].wpm = Math.round(
                            (acc[curr.date].wpm * acc[curr.date].count + curr.wpm) / (acc[curr.date].count + 1)
                        );
                        acc[curr.date].accuracy = Math.round(
                            (acc[curr.date].accuracy * acc[curr.date].count + curr.accuracy) / (acc[curr.date].count + 1)
                        );
                        acc[curr.date].count += 1;
                    }
                    return acc;
                }, {} as AggregatedData)
            );
        }

        // Sắp xếp dữ liệu theo ngày gốc và loại bỏ rawDate khỏi đầu ra cuối cùng
        return formattedData
            .sort((a, b) => parseISO(a.rawDate).getTime() - parseISO(b.rawDate).getTime())
            .map(({ rawDate, ...rest }) => rest); // Loại bỏ rawDate
    }, [testHistory, timeRange]);

    const renderHistoryChart = () => {
        const chartData = getFilteredAndFormattedHistory();

        return (
            <>
                <div style={{ marginBottom: 16 }}>
                    <Radio.Group value={timeRange} onChange={e => setTimeRange(e.target.value)}>
                        <Radio.Button value="last10">{t('history.range.last10')}</Radio.Button>
                        <Radio.Button value="hourly">{t('history.range.hourly')}</Radio.Button>
                        <Radio.Button value="daily">{t('history.range.daily')}</Radio.Button>
                        <Radio.Button value="monthly">{t('history.range.monthly')}</Radio.Button>
                    </Radio.Group>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            angle={-45}
                            textAnchor="end"
                            height={60}
                            interval={0}
                        />
                        <YAxis yAxisId="left" name="WPM" />
                        <YAxis yAxisId="right" orientation="right" name="Accuracy" />
                        <RechartsTooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div style={{
                                            backgroundColor: 'white',
                                            padding: '10px',
                                            border: '1px solid #ccc'
                                        }}>
                                            <p>{`Thời gian: ${label}`}</p>
                                            <p style={{ color: '#1890ff' }}>{`WPM: ${payload[0].value}`}</p>
                                            <p style={{ color: '#52c41a' }}>{`Độ chính xác: ${payload[1].value}%`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="wpm"
                            stroke="#1890ff"
                            name="WPM"
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="accuracy"
                            stroke="#52c41a"
                            name="Độ chính xác (%)"
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </>
        );
    };
    const saveTestResult = useCallback(() => {
        if (testComplete && correctWords + incorrectWords > 0 && !hasRecordedResult) {
            const newResult: TestHistory = {
                date: new Date().toISOString(),
                wpm,
                accuracy,
                correctWords,
                incorrectWords,
                language,
                duration: selectedDuration
            };

            const updatedHistory = [newResult, ...testHistory].slice(0, 100);
            setTestHistory(updatedHistory);
            localStorage.setItem('typingHistory', JSON.stringify(updatedHistory));
            setHasRecordedResult(true);

            // Kiểm tra kỷ lục mới
            const isWPMRecord = wpm > bestWPM;
            const isAccuracyRecord = accuracy > bestAccuracy;

            if (isWPMRecord && isAccuracyRecord) {
                setNewRecord({ type: 'both', value: 0 }); // Sử dụng type 'both' để xác định cả 2 đều là kỷ lục
            } else if (isWPMRecord) {
                setNewRecord({ type: 'wpm', value: wpm });
            } else if (isAccuracyRecord) {
                setNewRecord({ type: 'accuracy', value: accuracy });
            }

            if (isWPMRecord || isAccuracyRecord) {
                setShowConfetti(true);
            }

            // Cập nhật kỷ lục
            if (isWPMRecord) {
                setBestWPM(wpm);
                localStorage.setItem('bestWPM', String(wpm));
            }
            if (isAccuracyRecord) {
                setBestAccuracy(accuracy);
                localStorage.setItem('bestAccuracy', String(accuracy));
            }
        }
    }, [correctWords, incorrectWords, wpm, accuracy, language, selectedDuration, testHistory, testComplete, hasRecordedResult, bestWPM, bestAccuracy]);

    // Hiển thị thông báo kỷ lục mới
    useEffect(() => {
        if (newRecord) {
            let message = '';
            let description = '';

            if (newRecord.type === 'wpm') {
                message = 'Kỷ lục WPM mới!';
                description = `Bạn đã đạt WPM mới: ${newRecord.value}`;
            } else if (newRecord.type === 'accuracy') {
                message = 'Kỷ lục độ chính xác mới!';
                description = `Bạn đã đạt độ chính xác mới: ${newRecord.value}%`;
            } else {
                // Trường hợp cả WPM và độ chính xác đều là kỷ lục
                message = 'Kỷ lục kép!';
                description = `Bạn đã đạt cả WPM (${wpm}) và độ chính xác (${accuracy}%) mới`;
            }

            notification.open({
                message: (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TrophyOutlined style={{
                            fontSize: 24,
                            color: '#ffd700',
                            marginRight: 8
                        }} />
                        {message}
                    </div>
                ),
                description: (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {description}
                    </div>
                ),
                duration: 0,
                onClose: () => {
                    setTimeout(() => {
                        setShowConfetti(false);
                    }, 2000);
                }
            });

            setNewRecord(null);
        }
    }, [newRecord]);
    useEffect(() => {
        if (testComplete) {
            saveTestResult();
        }
    }, [testComplete, saveTestResult]);
    const wordDisplayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (wordDisplayRef.current && isRunning) {
            const currentWordElement = wordDisplayRef.current.querySelector(`[data-index="${currentIndex}"]`);

            if (currentWordElement) {
                const containerHeight = wordDisplayRef.current.clientHeight;
                const wordTop = (currentWordElement as HTMLElement).offsetTop;
                wordDisplayRef.current.scrollTop = Math.max(0, wordTop - containerHeight / 4);
            }
        }
    }, [currentIndex, isRunning]);
    return (
        <Container style={{ position: 'relative' }}>
            {showConfetti && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1000,
                    pointerEvents: 'none'
                }}>
                    <Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                        recycle={true}
                    />
                </div>
            )}
            <Space direction="vertical" style={{ width: '100%' }} size="large">

                <Card
                    style={{
                        maxWidth: 600,
                        margin: 'auto',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center'
                    }}
                    bordered={false}
                >
                    <Title level={1}>{t('app.title')}
                        <Tooltip title={t('button.help')}>
                            <Button type="text" shape="circle" icon={<QuestionCircleOutlined style={{ fontSize: 24 }} />} />
                        </Tooltip>
                    </Title>
                    <Text type="secondary">{t('app.subtitle')}</Text>
                    <Divider />

                    <Space wrap size="large" align="center" style={{ justifyContent: 'center', width: '100%' }}>
                        <Select
                            className='language-select'
                            value={language}
                            onChange={handleLanguageChange}
                            style={{ minWidth: 150 }}
                            disabled={isRunning}
                            suffixIcon={<GlobalOutlined />}
                        >
                            <Option value="vi">{t('language.vietnamese')}</Option>
                            <Option value="en">{t('language.english')}</Option>
                        </Select>

                        <Select
                            className='timer-select'
                            value={selectedDuration}
                            onChange={(value: number) => setSelectedDuration(value)}
                            style={{ minWidth: 150 }}
                            disabled={isRunning}
                            suffixIcon={<ClockCircleOutlined />}
                        >
                            {DURATION_OPTIONS.map(option => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>

                        <Button
                            type="primary"
                            onClick={startGame}
                            disabled={isRunning}
                            icon={isRunning ? <LoadingOutlined /> : <PlayCircleOutlined />}
                        >
                            {isRunning ? t('button.running') : t('button.start')}
                        </Button>

                        <Button
                            type="default"
                            onClick={() => setShowHistory(true)}
                            icon={<HistoryOutlined />}
                        >
                            {t('button.history')}
                        </Button>
                    </Space>

                    <Divider />

                    <Space direction="vertical" align="center" className='stats'>
                        <Text strong style={{ fontSize: '20px', color: '#faad14' }}>
                            <FireOutlined /> {t('stats.bestWPM')}: {bestWPM}
                        </Text>
                        <Text strong style={{ fontSize: '20px', color: '#13c2c2' }}>
                            <PercentageOutlined /> {t('stats.bestAccuracy')}: {bestAccuracy}%
                        </Text>
                    </Space>
                </Card>

                <Progress
                    percent={Math.round(((selectedDuration - timeLeft) / selectedDuration) * 100)}
                    status="active"
                    strokeWidth={50}
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    showInfo={false}
                />

                <ResponsiveStatsGrid>
                    <StatCard>
                        <Tooltip title={t('stats.timeLeft')}>
                            <ClockCircleOutlined style={{ fontSize: '24px', color: '#1890ff', marginBottom: 8 }} />
                            <Title level={4}>{selectedDuration}s</Title>
                            <Text type="secondary">{t('stats.timeLeft')}</Text>
                        </Tooltip>
                    </StatCard>
                    <StatCard>
                        <Tooltip title={t('stats.correctWords')}>
                            <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a', marginBottom: 8 }} />
                            <Title level={4}>{correctWords}</Title>
                            <Text type="secondary">{t('stats.correctWords')}</Text>
                        </Tooltip>
                    </StatCard>
                    <StatCard>
                        <Tooltip title={t('stats.incorrectWords')}>
                            <CloseCircleOutlined style={{ fontSize: '24px', color: '#ff4d4f', marginBottom: 8 }} />
                            <Title level={4}>{incorrectWords}</Title>
                            <Text type="secondary">{t('stats.incorrectWords')}</Text>
                        </Tooltip>
                    </StatCard>
                    <StatCard>
                        <Tooltip title={t('stats.wpm')}>
                            <FireOutlined style={{ fontSize: '24px', color: '#faad14', marginBottom: 8 }} />
                            <Title level={4}>{wpm}</Title>
                            <Text type="secondary">{t('stats.wpm')}</Text>
                        </Tooltip>
                    </StatCard>
                    <StatCard>
                        <Tooltip title={t('stats.accuracy')}>
                            <PercentageOutlined style={{ fontSize: '24px', color: '#13c2c2', marginBottom: 8 }} />
                            <Title level={4}>{accuracy}%</Title>
                            <Text type="secondary">{t('stats.accuracy')}</Text>
                        </Tooltip>
                    </StatCard>
                </ResponsiveStatsGrid>


                <WordDisplay ref={wordDisplayRef}>
                    {words.map((word, index) => (
                        <WordSpan
                            key={`${word.text}-${index}`}
                            status={word.status}
                            data-index={index}  // Thêm thuộc tính data-index
                        >
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
                        placeholder={isRunning ? t('input.reset') : t('input.start')}
                        size="large"
                    />
                </InputWrapper>

                {/* {!isRunning && correctWords > 0 && (
                    <Statistics wordStats={wordStats} />
                )} */}

                <Modal
                    title={t('history.title')}
                    open={showHistory}
                    onCancel={() => setShowHistory(false)}
                    footer={null}
                    width={800}
                >
                    <div style={{ marginBottom: 20 }}>
                        <Title level={4}>{t('history.chart.title')}</Title>
                        {renderHistoryChart()}
                    </div>

                    {/* History range buttons */}


                    {/* Table columns */}
                    <Table
                        dataSource={testHistory}
                        columns={[
                            {
                                title: t('table.date'),
                                dataIndex: 'date',
                                render: (date: string) => format(new Date(date), 'dd/MM/yyyy HH:mm'),
                                sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
                            },
                            {
                                title: t('table.wpm'),
                                dataIndex: 'wpm',
                                sorter: (a, b) => a.wpm - b.wpm,
                            },
                            {
                                title: t('table.accuracy'),
                                dataIndex: 'accuracy',
                                render: (value: number) => `${value.toFixed(1)}%`,
                                sorter: (a, b) => a.accuracy - b.accuracy,
                            },
                            {
                                title: t('table.language'),
                                dataIndex: 'language',
                            },
                            {
                                title: t('table.duration'),
                                dataIndex: 'duration',
                                render: (value: number) => `${value}s`,
                            },
                        ]}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 'max-content' }}
                    />
                </Modal>
            </Space>
            <TypingGuideTour />
        </Container>
    );
};

export default TypingChallenge;
// styles.ts
