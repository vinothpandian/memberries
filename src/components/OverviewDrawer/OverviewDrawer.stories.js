import React from 'react';

import { storiesOf } from '@storybook/react';

import { FullPageGrid } from '..';
import TopicDrawer from '../TopicDrawer';
import OverviewDrawer from '.';

storiesOf('Overview Drawer', module)
  .addDecorator(story => (
    <FullPageGrid>
      {story()}
      <TopicDrawer />
    </FullPageGrid>
  ))
  .add('default', () => <OverviewDrawer />);
