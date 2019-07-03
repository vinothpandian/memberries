import React from 'react';

import { storiesOf } from '@storybook/react';

import TopicDrawer from '.';
import { StoryBookDecorator } from '..';

storiesOf('Topic Drawer', module)
  .addDecorator(StoryBookDecorator)
  .add('default', () => <TopicDrawer />);
