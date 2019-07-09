import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import './App.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';

import Routes from './routes';
import store from './store';
import Notification from './components/Notification';


function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
        <Notification />
      </React.Fragment>
    </Provider>
  );
}

export default App;
