import React from 'react';
import { storiesOf } from '@storybook/react';

import { StoryBookDecorator } from '..';
import AddButton from '.';

storiesOf('Add Button', module)
  .addDecorator(StoryBookDecorator)
  .add('default', () => <AddButton />);
