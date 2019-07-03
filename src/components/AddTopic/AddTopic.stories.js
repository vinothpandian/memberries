import React from 'react';

import { storiesOf } from '@storybook/react';

import AddTopic from '.';
import { StoryBookDecorator } from '..';

storiesOf('Add Topic', module)
  .addDecorator(StoryBookDecorator)
  .add('default', () => <AddTopic />);
