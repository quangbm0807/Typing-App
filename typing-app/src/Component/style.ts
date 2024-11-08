import styled from '@emotion/styled';
import { Button, Card } from 'antd';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f2f5; /* Thêm màu nền cho container */
  border-radius: 8px; /* Bo góc cho container */
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const WordDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  height: 100px;  // Giới hạn chiều cao để chỉ hiển thị 2 dòng
  overflow: auto;  // Thay đổi từ overflow-y: auto sang hidden
  position: relative;
  font-size: 24px;
  
  // Thêm các quy tắc để giữ 2 dòng cuối cùng
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
  }
`;

export const WordSpan = styled.span<{ status: string }>`
  padding: 6px 12px; 
  border-radius: 4px;
  color: ${props => {
    switch (props.status) {
      case 'correct': return '#52c41a';
      case 'incorrect': return '#f5222d';
      case 'current': return '#ffffff';
      default: return '#8c8c8c';
    }
  }};
  background-color: ${props => props.status === 'current' ? '#1890ff' : 'transparent'}; 
  transition: all 0.2s ease;
  
  // Thêm hiệu ứng cho từ hiện tại
  ${props => props.status === 'current' && `
    box-shadow: 0 0 10px rgba(24, 144, 255, 0.5); // Tạo bóng cho từ hiện tại
    transform: scale(1.05); // Phóng to từ hiện tại
  `}

  &:hover {
    background-color: ${props => props.status === 'current' ? '#40a9ff' : 'transparent'}; 
  }
`;

export const ResponsiveStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin: 20px 0;
`;

export const StatCard = styled(Card)`
  text-align: center;
  border-radius: 8px; /* Bo góc cho thẻ */
  
  .ant-card-body {
    padding: 12px;
    background-color: #fafafa; /* Thêm màu nền cho body của thẻ */
    border-radius: 8px; /* Bo góc cho body của thẻ */
  }
  
  @media (max-width: 768px) {
    .ant-card-body {
      padding: 8px;
    }
  }
`;

export const InputWrapper = styled.div`
  .ant-input {
    font-size: 24px;
    padding: 12px;
    height: auto;
    border-radius: 4px; /* Bo góc cho input */
    
    @media (max-width: 768px) {
      font-size: 18px;
      padding: 8px;
    }
  }
`;

export const HistoryButton = styled(Button)`
  background-color: #1890ff; /* Thay đổi màu nền cho nút */
  color: #ffffff; /* Thay đổi màu chữ cho nút */
  border: none; /* Bỏ viền cho nút */
  
  &:hover {
    background-color: #40a9ff; /* Thay đổi màu nền khi hover */
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;