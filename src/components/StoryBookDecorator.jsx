import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
// import Routes from '../routes';

import store from '../store';

const StoryBookDecorator = story => (
  <Provider store={store}>
    <React.Fragment>
      <CssBaseline />
      <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    </React.Fragment>
  </Provider>
);

export default StoryBookDecorator;
