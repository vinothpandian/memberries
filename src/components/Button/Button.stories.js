import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import { StoryBookDecorator } from '..';
import Button from '.';

export const props = {
  color: 'primary',
  variant: 'contained',
  children: 'Story',
};

export const actions = {
  onClick: action('onClick'),
};

storiesOf('Button', module)
  .addDecorator(StoryBookDecorator)
  .addDecorator(withKnobs)
  .add('default', () => <Button {...props} {...actions} />)
  .add('colors', () => <Button {...props} color={text('colors', 'secondary')} {...actions} />)
  .add('outlined', () => <Button {...props} variant="outlined" {...actions} />)
  .add('text', () => <Button {...props} variant="text" {...actions} />)
  .add('wide', () => <Button {...props} fullWidth {...actions} />);
