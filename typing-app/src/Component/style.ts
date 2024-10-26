import styled from '@emotion/styled';
import { Card } from 'antd';

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

export const WordDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  height: 150px;
  overflow-y: auto;
  position: relative;
  font-size: 24px; // Increased font size
`;

export const WordSpan = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 24px; // Increased font size
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
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin: 20px 0;
`;

export const StatCard = styled(Card)`
  text-align: center;
  .ant-card-body {
    padding: 12px;
  }
`;

export const InputWrapper = styled.div`
  .ant-input {
    font-size: 24px;
    padding: 12px;
    height: auto;
  }
`;