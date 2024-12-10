import React from 'react';
import TypingChallenge from './Component/TypingChallenge';
import i18n from './language/i18n';
import { I18nextProvider } from 'react-i18next';
const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <TypingChallenge />
    </I18nextProvider>
  );
};

export default App;
