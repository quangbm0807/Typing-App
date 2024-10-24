import React from 'react';
import { Layout } from 'antd';
import TypingChallenge from './TypingTest/TypingChallenge';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header style={{ color: 'white', textAlign: 'center' }}>
        <h1>Ứng dụng Gõ Phím - Chế độ Thử Thách</h1>
      </Header>
      <Content style={{ padding: '50px' }}>
        <TypingChallenge />
      </Content>
    </Layout>
  );
};

export default App;
