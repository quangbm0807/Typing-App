// styles.ts
import styled from '@emotion/styled';
import { Button, Card } from 'antd';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
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
  background: #f5f5f5;
  border-radius: 8px;
  min-height: 150px;
  max-height: 200px;
  overflow-y: auto;
  position: relative;
  font-size: 24px;
  
  @media (max-width: 768px) {
    font-size: 18px;
    padding: 15px;
    min-height: 120px;
  }
`;

export const WordSpan = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  color: ${props => {
    switch (props.status) {
      case 'correct': return '#52c41a';
      case 'incorrect': return '#f5222d';
      case 'current': return '#1890ff';
      default: return '#8c8c8c';
    }
  }};
  background-color: ${props => props.status === 'current' ? '#e6f7ff' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.status === 'current' ? '#bae7ff' : 'transparent'};
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
  
  .ant-card-body {
    padding: 12px;
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
    
    @media (max-width: 768px) {
      font-size: 18px;
      padding: 8px;
    }
  }
`;

export const HistoryButton = styled(Button)`
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;