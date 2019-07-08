import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

app.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database = app.database();
export const databaseRef = ref => database.ref(`users/${ref}`);

export const getUserID = () => {
  const user = auth.currentUser;

  if (!user) {
    return null;
  }
  return user.uid;
};

export const signUp = async ({ email, password }) => {
  const user = await auth.createUserWithEmailAndPassword(email, password);

  if (user) {
    return user.user.uid;
  }

  return null;
};

export const signIn = async ({ email, password }) => {
  const user = await auth.signInWithEmailAndPassword(email, password);

  if (user) {
    return user.user.uid;
  }

  return null;
};

export const signOut = () => {
  auth.signOut();
};

export const setState = (newState) => {
  const userID = getUserID();

  if (!userID) {
    window.alert('Not signed in. Data not synced');
    return;
  }

  databaseRef(userID).update(newState.toJS());
};

export const getTopics = async () => {
  const userID = getUserID();

  if (!userID) {
    return [];
  }

  const topics = await databaseRef(userID)
    .child('topics')
    .once('value');

  return topics;
};
