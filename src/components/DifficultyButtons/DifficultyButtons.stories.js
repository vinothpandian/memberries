import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DifficultyButtons from '.';
import { StoryBookDecorator } from '..';

const props = {
  label: 'Difficulty',
  name: 'difficulty',
  size: 'medium',
  value: 3,
  error: false,
  helperText: 'Difficulty must be chosen',
};

const actions = {
  setFieldValue: action('setFieldValue'),
  handleBlur: action('handleBlur'),
};

storiesOf('Difficulty buttons', module)
  .addDecorator(StoryBookDecorator)
  .addDecorator(story => <div style={{ width: '100px' }}>{story()}</div>)
  .add('default', () => <DifficultyButtons {...props} {...actions} />)
  .add('small', () => <DifficultyButtons {...props} {...actions} size="small" />)
  .add('default as 2', () => <DifficultyButtons {...props} {...actions} difficulty={2} />)
  .add('error', () => <DifficultyButtons {...props} {...actions} error />);
