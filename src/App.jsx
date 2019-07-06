import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { DbProvider } from './contexts/db';
import { FirebaseProvider } from './contexts/Firebase';
import { AuthUserProvider } from './contexts/Session';

import Routes from './routes';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <FirebaseProvider>
        <AuthUserProvider>
          <DbProvider>
            <React.Fragment>
              <CssBaseline />
              <Router>
                <Routes />
              </Router>
            </React.Fragment>
          </DbProvider>
        </AuthUserProvider>
      </FirebaseProvider>
    </Provider>
  );
}

export default App;
