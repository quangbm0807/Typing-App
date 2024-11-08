import React from 'react';
import { Layout } from 'antd';
import TypingChallenge from './Component/TypingChallenge';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <TypingChallenge />
  );
};

export default App;
