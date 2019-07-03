import React from 'react';

import { storiesOf } from '@storybook/react';

import TopicListItem from '.';

export const props = {
  retention: 77.45,
  name: 'React',
  lastReviewed: [Date.now()],
  to: '/review/react',
};

storiesOf('Topic List Item', module)
  .add('default', () => <TopicListItem {...props} />)
  .add('float retention', () => <TopicListItem {...props} retention={84.44343434} />);
