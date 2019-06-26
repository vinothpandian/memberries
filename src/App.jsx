import React from 'react';
import './App.scss';
import { DbProvider } from './db';

import Home from './containers/Home';

function App() {
  return (
    <DbProvider>
      <Home />
    </DbProvider>
  );
}

export default App;
