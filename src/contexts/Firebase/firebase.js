import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from './config';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.database = app.database();
    this.databaseRef = ref => this.database.ref(`users/${ref}`);
  }

  getUserID() {
    const user = this.auth.currentUser;

    if (!user) {
      return null;
    }
    return user.uid;
  }

  createUser({ email, password }) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signInUser({ email, password }) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOutUser() {
    this.auth.signOut();
  }

  setState(newState) {
    this.db.setState(newState.toJS()).write();
    const userID = this.getUserID();

    if (!userID) {
      window.alert('Not signed in. Data not synced');
      return;
    }

    this.databaseRef(userID).update(newState.toJS());
  }

  async getTopics() {
    const userID = this.getUserID();

    if (!userID) {
      return [];
    }

    const topics = await this.databaseRef(userID)
      .child('topics')
      .once('value');

    return topics;
  }
}

export default Firebase;
