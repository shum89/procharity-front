import './wdyr';
import { hijackEffectHook } from 'stop-runaway-react-effects';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';

if (process.env.NODE_ENV === 'development') {
  hijackEffectHook('useLayoutEffect', { callCount: 5, timeLimit: 1000 });
}
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
