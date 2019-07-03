import React from 'react';
import { storiesOf } from '@storybook/react';

import { MemoryRouter } from 'react-router-dom';
import StorybookDiv from '..';
import AddButton from '.';

storiesOf('Add Button', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>
      <StorybookDiv>{story()}</StorybookDiv>
    </MemoryRouter>
  ))
  .add('default', () => <AddButton />);
