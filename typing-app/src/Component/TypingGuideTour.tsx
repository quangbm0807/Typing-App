import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { Button, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Text, Title } = Typography;

// Animations
const pulse = `
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(24, 144, 255, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(24, 144, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(24, 144, 255, 0);
    }
  }
`;

const bounce = `
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
    60% {
      transform: translateY(-3px);
    }
  }
`;

// Styled Components
const TourButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  animation: pulse 2s infinite;

  &:hover {
    animation: bounce 1s infinite;
  }

  ${pulse}
  ${bounce}
`;

const TooltipContainer = styled.div`
  max-width: 350px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05);
`;

const TooltipTitle = styled(Title).attrs({ level: 4 })`
  color: #1890ff !important;
  margin-bottom: 8px !important;
`;

const TooltipContent = styled(Text)`
  display: block;
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.85);
`;

const TooltipFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const TOUR_STORAGE_KEY = 'typingTourState';

interface TourState {
  hasSeenTour: boolean;
  lastVisit: string;
  timesVisited: number;
}

const TypingGuideTour: React.FC = () => {
  const [run, setRun] = useState(false);
  const [tourState, setTourState] = useState<TourState>({
    hasSeenTour: false,
    lastVisit: '',
    timesVisited: 0
  });

  // Khởi tạo và kiểm tra trạng thái tour khi component mount
  useEffect(() => {
    const initializeTourState = () => {
      const storedState = localStorage.getItem(TOUR_STORAGE_KEY);

      if (!storedState) {
        // Lần đầu truy cập
        const initialState: TourState = {
          hasSeenTour: false,
          lastVisit: new Date().toISOString(),
          timesVisited: 1
        };
        localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(initialState));
        setTourState(initialState);
        setRun(true); // Tự động chạy tour
        return;
      }

      const parsedState = JSON.parse(storedState) as TourState;
      // Cập nhật số lần truy cập và thời gian truy cập cuối
      const updatedState = {
        ...parsedState,
        lastVisit: new Date().toISOString(),
        timesVisited: parsedState.timesVisited + 1
      };
      localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(updatedState));
      setTourState(updatedState);

      // Chỉ hiển thị tour nếu chưa xem bao giờ
      if (!parsedState.hasSeenTour) {
        setRun(true);
      }
    };

    initializeTourState();
  }, []);

  const steps: Step[] = [
    {
      target: 'body',
      title: 'Xin chào bạn👋',
      content: ' Hãy để tôi hướng dẫn bạn cách sử dụng.',
      placement: 'center',
    },
    {
      target: '.ant-select:first-child',
      title: '🌍 Chọn ngôn ngữ',
      content: 'Chọn ngôn ngữ bạn muốn luyện tập: Tiếng Việt hoặc Tiếng Anh.',
      placement: 'bottom',
    },
    {
      target: '.timer-select',
      title: '⏱️ Thiết lập thời gian',
      content: 'Chọn thời gian thử thách: 15, 30, 45 hoặc 60 giây.',
      placement: 'bottom',
    },
    {
      target: '.ant-btn-primary',
      title: '🎯 Bắt đầu',
      content: 'Nhấn nút "Bắt đầu" hoặc phím Enter để bắt đầu bài kiểm tra.',
      placement: 'bottom',
    },
    {
      target: '.ant-progress',
      title: '⏳ Thanh tiến trình',
      content: 'Theo dõi thời gian còn lại qua thanh tiến trình này.',
      placement: 'bottom',
    },
    {
      target: '.ant-input',
      title: '⌨️ Vùng gõ văn bản',
      content: 'Gõ các từ xuất hiện phía trên. Nhấn Space sau mỗi từ để tiếp tục. Nhấn Alt + R để bắt đầu lại.',
      placement: 'top',
    },
    {
      target: '.stats',
      title: '📊 Thống kê',
      content: 'Theo dõi tốc độ gõ (WPM), độ chính xác và các chỉ số khác của bạn.',
      placement: 'bottom',
    },
    {
      target: '.history-button',
      title: '📈 Lịch sử',
      content: 'Xem lịch sử và tiến trình của bạn qua thời gian.',
      placement: 'left',
    }
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      // Cập nhật trạng thái đã xem tour trong localStorage
      const updatedState = {
        ...tourState,
        hasSeenTour: true
      };
      localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(updatedState));
      setTourState(updatedState);
    }
  };

  // Custom tooltip component using Ant Design
  const Tooltip = ({ step, ...props }: any) => (
    <TooltipContainer>
      {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
      <TooltipContent>{step.content}</TooltipContent>
      <TooltipFooter>
        {props.backProps && (
          <Button {...props.backProps}>Quay lại</Button>
        )}
        <div>
          {props.skipProps && (
            <Button type="text" {...props.skipProps} style={{ marginRight: 8 }}>
              Bỏ qua
            </Button>
          )}
          <Button type="primary" {...props.primaryProps}>
            {props.isLastStep ? 'Kết thúc' : 'Tiếp tục'}
          </Button>
        </div>
      </TooltipFooter>
    </TooltipContainer>
  );

  const tourStyles = {
    options: {
      arrowColor: '#fff',
      backgroundColor: '#fff',
      overlayColor: 'rgba(0, 0, 0, 0.7)',
      primaryColor: '#1890ff',
      spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
      textColor: 'rgba(0, 0, 0, 0.85)',
      zIndex: 1000,
    },
    spotlight: {
      borderRadius: '2px',
    },
    floater: {
      filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.15))'
    }
  };

  // Xử lý khi người dùng click vào nút hướng dẫn
  const handleTourStart = () => {
    setRun(true);
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={tourStyles}
        tooltipComponent={Tooltip}
        locale={{
          back: 'Quay lại',
          close: 'Đóng',
          last: 'Kết thúc',
          next: 'Tiếp tục',
          skip: 'Bỏ qua',
        }}
      />
      <TourButton
        type="primary"
        shape="circle"
        icon={<QuestionCircleOutlined />}
        onClick={handleTourStart}
        title="Hướng dẫn sử dụng"
      />
    </>
  );
};

export default TypingGuideTour;