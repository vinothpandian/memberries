import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import ColorAvatar from '.';

storiesOf('Color avatar', module)
  .addDecorator(withKnobs)
  .add('default', () => <ColorAvatar color={text('color')} />);
