import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import shortid from 'shortid';

import lastReviewed from './testcase';

const adapter = new LocalStorage('db');

const defaultData = [
  {
    id: 'oaJwnzK1s',
    name: 'Storybook',
    description: 'storybook basix',
    lastReviewed: [
      {
        reviewDate: 1561801119171,
        difficulty: 1,
      },
      {
        reviewDate: 1561541919171,
        difficulty: 1,
      },
      {
        reviewDate: 1561369119171,
        difficulty: 2,
      },
      {
        reviewDate: 1560850719171,
        difficulty: 2,
      },
      {
        reviewDate: 1560591519171,
        difficulty: 3,
      },
    ],
    difficulty: 1,
  },
  {
    id: 'c9dC1SXtD',
    name: 'Redux',
    description: 'redux with react',
    lastReviewed: [
      {
        reviewDate: 1561801119171,
        difficulty: 1,
      },
      {
        reviewDate: 1561541919171,
        difficulty: 1,
      },
      {
        reviewDate: 1561369119171,
        difficulty: 2,
      },
      {
        reviewDate: 1560850719171,
        difficulty: 2,
      },
      {
        reviewDate: 1560591519171,
        difficulty: 3,
      },
    ],
    difficulty: 4,
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
        reviewDate: 1561541919171,
        difficulty: 1,
      },
      {
        reviewDate: 1561369119171,
        difficulty: 2,
      },
      {
        reviewDate: 1560850719171,
        difficulty: 2,
      },
      {
        reviewDate: 1560591519171,
        difficulty: 3,
      },
    ],
    difficulty: 5,
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

      this.db
        .get('topics')
        .push({
          id,
          name,
          description,
          lastReviewed,
          difficulty,
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
