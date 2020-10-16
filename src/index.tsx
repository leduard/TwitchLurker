import React from 'react';
import ReactDOM from 'react-dom';

import bootstrap from './bootstrap';
import App from './App';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

bootstrap();
// just to commit
// learning github actions 2
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  mainElement,
);
