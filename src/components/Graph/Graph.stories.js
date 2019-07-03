import React from 'react';

import { storiesOf } from '@storybook/react';

import { DefaultGraph, MultiTopicGraph, TopicGraph } from '.';

storiesOf('Default Graph', module)
  .add('default', () => <DefaultGraph />)
  .add('topics', () => <MultiTopicGraph />)
  .add('single topic', () => <TopicGraph />);
