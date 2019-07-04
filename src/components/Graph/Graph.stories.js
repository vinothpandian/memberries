import React from 'react';

import { storiesOf } from '@storybook/react';

import { DefaultGraph, MultiTopicGraph, TopicGraph } from '.';
import { FullPageGrid } from '..';

storiesOf('Graph', module)
  .addDecorator(story => <FullPageGrid>{story()}</FullPageGrid>)
  .add('default', () => <DefaultGraph />)
  .add('topics', () => <MultiTopicGraph />)
  .add('single topic', () => <TopicGraph type="monotone" />);
