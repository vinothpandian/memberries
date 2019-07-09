import { handleActions } from 'redux-actions';

import { fromJS, List, mergeDeep } from 'immutable';

import {
  ADD_TOPIC, UPDATE_TOPIC, DELETE_TOPIC, FETCH_TOPICS,
} from '../actions/topics';

import Database from '../utils/database';

const db = new Database();

const topics = db.getTopics();

const localTopics = fromJS(topics);
const defaultState = localTopics;

const addTopic = (state, action) => {
  const { payload } = action;

  const newState = state.push(fromJS(payload));

  db.setState(newState);
  return newState;
};

const updateTopic = (state, action) => {
  const { payload } = action;
  const { id, updatedReviewDates } = payload;

  const index = state.findIndex(item => item.get('id') === id);

  const newState = state.update(index, item => item.set('lastReviewed', fromJS(updatedReviewDates)));

  db.setState(newState);

  return newState;
};

const deleteTopic = (state, action) => {
  const { payload } = action;
  const { id } = payload;

  const newState = state.filter(topic => topic.get('id') !== id);

  db.setState(newState);

  return newState;
};

const fetchTopics = (state, action) => {
  const { mergedTopics } = action;

  const newState = mergeDeep(state, mergedTopics);

  db.setState(newState);

  return newState;
};

export default handleActions(
  {
    [FETCH_TOPICS]: fetchTopics,
    [ADD_TOPIC]: addTopic,
    [DELETE_TOPIC]: deleteTopic,
    [UPDATE_TOPIC]: updateTopic,
  },
  defaultState,
);
