import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import { DbProvider } from './db';

import Routes from './routes';

function App() {
  return (
    <DbProvider>
      <Router>
        <Routes />
      </Router>
    </DbProvider>
  );
}

export default App;
