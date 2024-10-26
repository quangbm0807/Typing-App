import React from 'react';
import { Layout } from 'antd';
import TypingChallenge from './Component/TypingChallenge';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        <TypingChallenge />
      </Content>
    </Layout>
  );
};

export default App;
