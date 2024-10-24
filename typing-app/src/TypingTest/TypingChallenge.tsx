import React, { useState, useEffect } from 'react';
import { Button, Input, Typography, message } from 'antd';

const { Title } = Typography;

const TypingChallenge: React.FC = () => {
    const challenges = [
        "Đây là một bài kiểm tra gõ phím.",
        "Học lập trình giúp cải thiện tư duy.",
        "Càng gõ nhanh, bạn càng trở nên thông thạo.",
    ];

    const [textToType, setTextToType] = useState("");
    const [userInput, setUserInput] = useState("");
    const [timeLimit, setTimeLimit] = useState(60); // Thời gian thử thách tính bằng giây
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        // Chọn đoạn văn bản ngẫu nhiên
        setTextToType(challenges[Math.floor(Math.random() * challenges.length)]);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        if (timeLeft === 0) {
            setIsFinished(true);
            setIsRunning(false);
            message.info("Thời gian đã hết!"); // Thông báo khi hết giờ
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const startChallenge = () => {
        setIsRunning(true);
        setTimeLeft(timeLimit);
        setUserInput("");
        setIsFinished(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
        if (e.target.value === textToType) {
            setIsRunning(false);
            setIsFinished(true);
            message.success("Bạn đã hoàn thành thử thách!");
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Title level={2}>{textToType}</Title>
            <div>
                {isRunning ? (
                    <div>
                        <h3>{`Thời gian còn lại: ${timeLeft}s`}</h3>
                        <Input
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder="Gõ văn bản ở đây"
                            style={{ width: '400px', marginBottom: '20px' }}
                        />
                    </div>
                ) : (
                    <Button type="primary" onClick={startChallenge}>
                        Bắt đầu Thử Thách
                    </Button>
                )}
            </div>
            {isFinished && <div><Title level={4}>Kết thúc thử thách!</Title></div>}
        </div>
    );
};

// Thêm dòng này
export { };

export default TypingChallenge;
