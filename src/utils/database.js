import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

import moment from 'moment';
import random from 'lodash/random';
import range from 'lodash/range';
import { fromJS } from 'immutable';

import randomColor from 'randomcolor';

const adapter = new LocalStorage('db');

const defaultData = [];

class Database {
  constructor() {
    this.db = low(adapter);

    this.db.defaults({ topics: defaultData }).write();
  }

  setState(newState) {
    this.db.setState({ topics: newState }).write();
  }

  getTopics() {
    return this.db.get('topics').value();
  }

  clearState() {
    this.db.setState({ topics: [] }).write();
  }
}

export default Database;

const now = moment();

export const lastReviewed = range(random(1, 6, false))
  .map(_ => random(1, 6, false))
  .map(day => ({
    reviewDate: now.subtract(day, 'days').valueOf(),
    difficulty: random(1, 5),
  }));

export const debugState = fromJS({
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
    {
      id: 'Gh0wgcwSV',
      name: 'a',
      description: 'a',
      lastReviewed: [
        {
          reviewDate: 1562361933790,
          difficulty: 3,
        },
      ],
      difficulty: 3,
      color: '#c55be5',
    },
  ],
});
