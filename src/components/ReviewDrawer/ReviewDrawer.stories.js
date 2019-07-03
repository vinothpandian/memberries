import React from 'react';

import { storiesOf } from '@storybook/react';

import { MemoryRouter } from 'react-router-dom';
// import ReviewDrawer from '.';
import { FullPageGrid } from '..';
import TopicDrawer from '../TopicDrawer';
import { DbProvider } from '../../db';

storiesOf('Review Drawer', module)
  .addDecorator(story => (
    <FullPageGrid>
      {story()}
      <TopicDrawer />
    </FullPageGrid>
  ))
  .add('default', () => <div />);
