import React from 'react';

import { storiesOf } from '@storybook/react';

import { StoryBookDecorator } from '..';
import TopicListItem from '.';

export const props = {
  retention: 77,
  topicName: 'React',
  lastReviewed: '8 days ago',
  to: '/review/react',
};

storiesOf('Topic List Item', module)
  .addDecorator(StoryBookDecorator)
  .add('default', () => <TopicListItem {...props} />);
