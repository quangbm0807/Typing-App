import React, { useState, useEffect } from 'react';
import { Input, Button, Typography } from 'antd';

const { Title } = Typography;

const TypingTest: React.FC = () => {
    const [textToType] = useState("Đây là một bài kiểm tra gõ phím.");
    const [userInput, setUserInput] = useState("");
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
        if (e.target.value === textToType) {
            setIsCorrect(true);
        } else if (e.target.value.length === textToType.length) {
            setIsCorrect(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Title level={2}>{textToType}</Title>
            <Input
                value={userInput}
                onChange={handleInputChange}
                placeholder="Gõ văn bản ở đây"
                style={{ width: '400px', marginBottom: '20px' }}
            />
            {isCorrect !== null && (
                <div>
                    <Title level={4} style={{ color: isCorrect ? 'green' : 'red' }}>
                        {isCorrect ? 'Bạn đã gõ đúng!' : 'Gõ sai, hãy thử lại!'}
                    </Title>
                </div>
            )}
        </div>
    );
};

export default TypingTest;
