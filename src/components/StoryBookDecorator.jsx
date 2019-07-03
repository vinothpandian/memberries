import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DbProvider } from '../db';
import Routes from '../routes';

const StoryBookDecorator = story => (
  <DbProvider>
    <CssBaseline />
    <MemoryRouter initialEntries={['/']}>
      {story()}
      <Routes />
    </MemoryRouter>
  </DbProvider>
);

export default StoryBookDecorator;
