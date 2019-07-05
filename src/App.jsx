import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import './App.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { DbProvider } from './db';

import Routes from './routes';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <DbProvider>
        <React.Fragment>
          <CssBaseline />
          <Router>
            <Routes />
          </Router>
        </React.Fragment>
      </DbProvider>
    </Provider>
  );
}

export default App;
