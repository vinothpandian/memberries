import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import shortid from 'shortid';

const adapter = new LocalStorage('db');

class Database {
  constructor() {
    this.db = low(adapter);

    this.db.defaults({ topics: [] }).write();
  }

  pushTopic(name, description, difficulty) {
    return new Promise((resolve, reject) => {
      const id = shortid.generate();

      const lastReview = Date.now();

      this.db
        .get('topics')
        .push({
          id,
          name,
          description,
          lastReviewed: [lastReview],
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
