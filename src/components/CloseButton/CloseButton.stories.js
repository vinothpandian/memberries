import React from 'react';

import { storiesOf } from '@storybook/react';

import CloseButton from '.';

const props = {
  to: '/',
};

storiesOf('Close button', module).add('default', () => <CloseButton {...props} />);
