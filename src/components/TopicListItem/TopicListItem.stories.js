import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import StorybookDiv from '..';
import TopicListItem from '.';

export const props = {
  retention: 77,
  topicName: 'React',
  lastReviewed: '8 days ago',
  to: '/review/react',
};

storiesOf('Topic List Item', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>
      <StorybookDiv>{story()}</StorybookDiv>
    </MemoryRouter>
  ))
  .addDecorator(withKnobs)
  .add('default', () => <TopicListItem {...props} />);
