import randomColor from 'randomcolor';
import shortid from 'shortid';
import { handleActions } from 'redux-actions';

import moment from 'moment';

import { fromJS } from 'immutable';

import { ADD_TOPIC, UPDATE_TOPIC } from '../constants';
import { findRecentReviewInDays } from '../utils/date';

const defaultState = fromJS({
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
});

const addTopic = (state, action) => {
  const { payload } = action;
  const { name, difficulty, description } = payload;

  const id = shortid.generate();
  const color = randomColor({ luminosity: 'bright' });
  const lastReviewed = [
    {
      reviewDate: Date.now().valueOf(),
      difficulty,
    },
  ];

  const newTopic = {
    id,
    name,
    description,
    lastReviewed,
    difficulty,
    color,
  };

  const newState = state.topics.push(newTopic);

  return newState;
};

const updateTopic = (state, action) => {
  const { payload } = action;
  const { topics } = state;
  const { id, difficulty } = payload;

  const [topic] = topics.filter(obj => obj.id === id);
  const { lastReviewed } = topic;

  const isSameDay = moment().isSame(findRecentReviewInDays(lastReviewed), 'day');

  if (isSameDay) return state;

  lastReviewed.push({
    reviewDate: Date.now().valueOf(),
    difficulty,
  });

  const updatedTopic = {
    ...topic,
    lastReviewed,
  };

  const newTopics = [...topics, updatedTopic];

  return { topics: newTopics };
};

export default handleActions(
  {
    [ADD_TOPIC]: addTopic,
    [UPDATE_TOPIC]: updateTopic,
  },
  defaultState,
);
