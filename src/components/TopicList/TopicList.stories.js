import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import StorybookDiv from '..';
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

storiesOf('Topic List', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>
      <StorybookDiv>{story()}</StorybookDiv>
    </MemoryRouter>
  ))
  .addDecorator(withKnobs)
  .add('default', () => <TopicList {...props} />);
