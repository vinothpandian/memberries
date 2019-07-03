import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DbProvider } from './db';

import Routes from './routes';

function App() {
  return (
    <DbProvider>
      <CssBaseline />
      <Router>
        <Routes />
      </Router>
    </DbProvider>
  );
}

export default App;
