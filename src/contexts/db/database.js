import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db');

const defaultData = [];

class Database {
  constructor() {
    this.db = low(adapter);

    this.db.defaults({ topics: defaultData }).write();
  }

  setState(newState) {
    this.db.setState(newState.toJS()).write();
  }

  getTopics() {
    return this.db.get('topics').value();
  }
}

export default Database;
