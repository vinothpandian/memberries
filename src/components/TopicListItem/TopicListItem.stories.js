import React from 'react';

import { storiesOf } from '@storybook/react';

import TopicListItem from '.';

export const props = {
  id: 'LDLFK34D',
  retention: 77.45,
  name: 'React',
  lastReviewed: [
    {
      reviewDate: 1561801119171,
      difficulty: 1,
    },
    {
      reviewDate: 1561541919171,
      difficulty: 1,
    },
    {
      reviewDate: 1561369119171,
      difficulty: 2,
    },
    {
      reviewDate: 1560850719171,
      difficulty: 2,
    },
    {
      reviewDate: 1560591519171,
      difficulty: 3,
    },
  ],
};

storiesOf('Topic List Item', module)
  .add('default', () => <TopicListItem {...props} />)
  .add('float retention', () => <TopicListItem {...props} retention={84.44343434} />);
