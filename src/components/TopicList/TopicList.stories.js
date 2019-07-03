import React from 'react';

import { storiesOf } from '@storybook/react';

import TopicList from '.';

const topics = [
  {
    id: 'asdfasd',
    retention: 77,
    topicName: 'React',
    lastReviewed: '8 days ago',
    to: '/review/asdfasd',
  },
  {
    id: 'eradfa',
    retention: 97,
    topicName: 'Deep learning',
    lastReviewed: '2 days ago',
    to: '/review/eradfa',
  },
  {
    id: '234df',
    retention: 37,
    topicName: 'Typescript',
    lastReviewed: '12 days ago',
    to: '/review/234df',
  },
];

const props = {
  topics,
};

storiesOf('Topic List', module).add('default', () => <TopicList {...props} />);
