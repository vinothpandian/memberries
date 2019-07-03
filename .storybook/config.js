// .storybook/config.js

import { configure, addDecorator } from '@storybook/react';
import { StoryBookDecorator } from '../src/components';
import StoryRouter from 'storybook-react-router';

const req = require.context('../src', true, /\.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(StoryRouter());
addDecorator(StoryBookDecorator);

configure(loadStories, module);
