// TypingDisplay.tsx
import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const WordDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  height: 100px;  // Giới hạn chiều cao để chỉ hiển thị 2 dòng
  overflow-y: auto;  // Cho phép cuộn dọc
  position: relative;
  font-size: 24px;
  scroll-behavior: smooth;  // Hỗ trợ cuộn mượt
`;

const WordSpan = styled.span<{ status: string }>`
  padding: 6px 12px; 
  border-radius: 4px;
  color: ${props => props.status === 'current' ? '#ffffff' : '#8c8c8c'};
  background-color: ${props => props.status === 'current' ? '#1890ff' : 'transparent'};
`;

interface Word {
    text: string;  // Thuộc tính văn bản
    status: string; // Trạng thái của từ
}

interface TypingDisplayProps {
    words: Word[]; // Cập nhật kiểu thành Word[]
    currentIndex: number;
}

const TypingDisplay: React.FC<TypingDisplayProps> = ({ words, currentIndex }) => {
    const wordDisplayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (wordDisplayRef.current) {
            const currentWordElement = wordDisplayRef.current.querySelector(`[data-index="${currentIndex}"]`);
            if (currentWordElement) {
                currentWordElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest' // Chỉ cuộn tới từ gần nhất
                });
            }
        }
    }, [currentIndex]);

    return (
        <WordDisplay ref={wordDisplayRef}>
            {words.map((word, index) => (
                <WordSpan key={index} status={index === currentIndex ? 'current' : word.status} data-index={index}>
                    {word.text}  {/* Sử dụng thuộc tính text của đối tượng Word */}
                </WordSpan>
            ))}
        </WordDisplay>
    );
};

export default TypingDisplay;