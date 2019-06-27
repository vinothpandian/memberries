import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import uniqueId from 'lodash/uniqueId';

const adapter = new LocalStorage('db');

class Database {
  constructor() {
    this.db = low(adapter);

    this.db.defaults({ topics: [] }).write();
  }

  pushTopic(name, description, difficulty) {
    return this.db
      .get('topics')
      .push({
        id: uniqueId('topic_'),
        name,
        description,
        lastReviewed: [Date.now()],
        difficulty,
      })
      .write().id;
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
