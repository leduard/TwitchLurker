import React from 'react';
import { HashRouter } from 'react-router-dom';

import { GlobalStyle } from './styles/GlobalStyle';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <HashRouter>
      <GlobalStyle />
      <Routes />
    </HashRouter>
  );
};

export default App;
