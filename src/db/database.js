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
        lastReviewed: [],
        difficulty,
      })
      .write().id;
  }

  getTopic(id) {
    return this.db
      .get('topics')
      .find({ id })
      .value();
  }

  getTopics() {
    return this.db.get('topics').value();
  }
}

export default Database;
