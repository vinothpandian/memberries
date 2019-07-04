import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import shortid from 'shortid';
import * as randomColor from 'randomcolor';

import moment from 'moment';
import lastReviewed from './testcase';
import { findRecentReview } from '../utils/date';

const adapter = new LocalStorage('db');

localStorage.clear();
const defaultData = [
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
];

class Database {
  constructor() {
    this.db = low(adapter);

    this.db.defaults({ topics: defaultData }).write();
  }

  pushTopic(name, description, difficulty) {
    return new Promise((resolve, reject) => {
      const id = shortid.generate();
      const color = randomColor({ luminosity: 'bright' });

      this.db
        .get('topics')
        .push({
          id,
          name,
          description,
          lastReviewed,
          difficulty,
          color,
        })
        .write();

      const found = this.getTopic(id);

      if (found) {
        resolve(found);
      }

      const error = new Error("Couldn't store data");
      reject(error);
    });
  }

  updateTopic(id, difficulty) {
    return new Promise((resolve, reject) => {
      const topic = this.db
        .get('topics')
        .find({ id: 'oaJwnzK1s' })
        .value();

      if (!topic) reject(new Error('Topic not found'));

      const { lastReviewed: reviews } = topic;
      if (!reviews) reject(new Error('Topic is missing data'));

      const isSameDay = moment().isSame(findRecentReview(reviews), 'day');

      if (isSameDay) reject(new Error('You reviewed this already for today!'));

      console.log(isSameDay);

      this.db
        .get('topics')
        .find({ id })
        .assign({
          lastReviewed: [
            ...reviews,
            {
              reviewDate: Date.now(),
              difficulty,
            },
          ],
        })
        .write();

      resolve();
    });
  }

  getTopic(id) {
    return new Promise((resolve, reject) => {
      const value = this.db
        .get('topics')
        .find({ id })
        .value();

      if (value) {
        resolve(value);
      }

      const error = new Error(`${id} not found`);
      reject(error);
    });
  }

  getTopics() {
    return this.db.get('topics').value();
  }
}

export default Database;
