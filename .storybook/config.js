// .storybook/config.js

import { configure, addDecorator } from '@storybook/react';
import { StoryBookDecorator } from '../src/components';

const req = require.context('../src', true, /\.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(StoryBookDecorator);

configure(loadStories, module);
