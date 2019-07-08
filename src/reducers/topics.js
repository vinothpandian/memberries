import { handleActions } from 'redux-actions';

import moment from 'moment';

import { fromJS, Map, List } from 'immutable';

import { ADD_TOPIC_ASYNC, UPDATE_TOPIC, DELETE_TOPIC } from '../actions/topics';
import { findRecentReviewInDays } from '../utils/date';
import Database, { debugState } from '../utils/database';

const db = new Database();

const { topics } = db.getTopics();

let defaultState = topics ? fromJS(topics) : List();

defaultState = debugState.get('topics');

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

  const newState = state.update(index, item => item.set('lastReviewed', updatedReviewDates));

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

export default handleActions(
  {
    [ADD_TOPIC_ASYNC]: addTopic,
    [DELETE_TOPIC]: deleteTopic,
    [UPDATE_TOPIC]: updateTopic,
  },
  defaultState,
);
