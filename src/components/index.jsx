import React from 'react';

import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import DbProvider from '../db/DbProvider';

const StorybookDiv = styled(Grid)`
  padding: 3rem;
`;

export const FullPageGrid = styled(Grid)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StoryBookDecorator = story => (
  <DbProvider>
    <MemoryRouter initialEntries={['/', '/add']}>
      <FullPageGrid>{story()}</FullPageGrid>
    </MemoryRouter>
  </DbProvider>
);

export default StorybookDiv;
