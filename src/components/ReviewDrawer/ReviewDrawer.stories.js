import React from 'react';

import { storiesOf } from '@storybook/react';

import { MemoryRouter } from 'react-router-dom';
import ReviewDrawer from '.';
import { StoryBookDecorator, FullPageGrid } from '..';
import TopicDrawer from '../TopicDrawer';
import { DbProvider } from '../../db';

storiesOf('Review Drawer', module)
  .addDecorator(story => (
    <DbProvider>
      <MemoryRouter initialEntries={['/', '/add']}>
        <FullPageGrid>
          {story()}
          <TopicDrawer />
        </FullPageGrid>
      </MemoryRouter>
    </DbProvider>
  ))
  .add('default', () => <div />);
