import React from 'react';

import { storiesOf } from '@storybook/react';

import ErrorPage from '.';
import { StoryBookDecorator } from '../../components';

storiesOf('Error page', module)
  .addDecorator(StoryBookDecorator)
  .add('default', () => <ErrorPage />);
