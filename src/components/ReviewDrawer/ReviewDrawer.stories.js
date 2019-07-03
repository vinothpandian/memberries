import React from 'react';

import { storiesOf } from '@storybook/react';

import { FullPageGrid } from '..';
import TopicDrawer from '../TopicDrawer';
import ReviewDrawer from '.';

storiesOf('Review Drawer', module)
  .addDecorator(story => (
    <FullPageGrid>
      {story()}
      <TopicDrawer />
    </FullPageGrid>
  ))
  .add('default', () => <ReviewDrawer />);
