import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { stateToFirebase } from './index';

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
export const databaseRef = ref => database.ref(`users/${ref}/topics`);

export const getUserID = async () => {
  const uid = await new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user.uid);
      } else {
        resolve();
      }
    });
  });

  return uid;
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

export const fetchTopics = async () => {
  const userID = await getUserID();

  if (!userID) {
    return [];
  }

  const snapshot = await databaseRef(userID).once('value');

  const topics = {};

  snapshot.forEach((child) => {
    topics[child.key] = child.val();
  });

  return topics;
};

export const addTopic = async (topic) => {
  const userID = await getUserID();

  if (!userID) {
    return;
  }

  await databaseRef(userID)
    .child(topic.id)
    .set(topic);
};

export const updateTopic = async ({ id, updatedReviewDates }) => {
  const userID = await getUserID();

  if (!userID) {
    return;
  }

  await databaseRef(userID)
    .child(id)
    .update({
      lastReviewed: updatedReviewDates.toJS(),
    });
};

export const deleteTopic = async ({ id }) => {
  const userID = await getUserID();

  if (!userID) {
    return;
  }

  await databaseRef(userID)
    .child(id)
    .remove();
};

export const syncUpload = async (topics) => {
  const userID = await getUserID();

  if (!userID) {
    return;
  }

  const topicsToUpload = stateToFirebase(topics);

  await databaseRef(userID).set(topicsToUpload);
};
