import React from 'react';

import { storiesOf } from '@storybook/react';

import { DefaultGraph, MultiTopicGraph } from '.';

storiesOf('Default Graph', module)
  .add('default', () => <DefaultGraph />)
  .add('topics', () => <MultiTopicGraph />);
