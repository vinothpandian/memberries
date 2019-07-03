import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';

import TopicDrawer from '.';

storiesOf('Topic Drawer', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('default', () => <TopicDrawer />);
