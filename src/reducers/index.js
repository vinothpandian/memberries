import { randomColor } from 'randomcolor';
import { handleActions } from 'redux-actions';

import {
  FETCH_TOPIC, FETCH_TOPICS, ADD_TOPIC, UPDATE_TOPIC,
} from '../constants';

const defaultState = {
  topics: [
    {
      id: 'oaJwnzK1s',
      name: 'Storybook',
      description: 'storybook basix',
      lastReviewed: [
        {
          reviewDate: new Date(2019, 5, 29).valueOf(),
          difficulty: 1,
        },
        {
          reviewDate: new Date(2019, 6, 2).valueOf(),
          difficulty: 5,
        },
        {
          reviewDate: new Date(2019, 6, 3).valueOf(),
          difficulty: 1,
        },
      ],
      difficulty: 1,
      color: randomColor({ luminosity: 'dark' }),
    },
    {
      id: 'c9dC1SXtD',
      name: 'Redux',
      description: 'redux with react',
      lastReviewed: [
        {
          reviewDate: new Date(2019, 6, 3).valueOf(),
          difficulty: 1,
        },
      ],
      difficulty: 4,
      color: randomColor({ luminosity: 'bright' }),
    },
    {
      id: 'cYr6DEOpz',
      name: 'Deep learning',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      lastReviewed: [
        {
          reviewDate: 1561801119171,
          difficulty: 1,
        },
        {
          reviewDate: Date.now().valueOf(),
          difficulty: 2,
        },
      ],
      difficulty: 5,
      color: randomColor({ luminosity: 'bright' }),
    },
  ],
};

const fetchTopic = (state, action) => state;
const fetchTopics = (state, action) => state;
const addTopic = (state, action) => state;
const updateTopic = (state, action) => state;

export default handleActions(
  {
    [FETCH_TOPIC]: fetchTopic,
    [FETCH_TOPICS]: fetchTopics,
    [ADD_TOPIC]: addTopic,
    [UPDATE_TOPIC]: updateTopic,
  },
  defaultState,
);
