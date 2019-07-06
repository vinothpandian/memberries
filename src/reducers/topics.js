import randomColor from 'randomcolor';

import { handleActions } from 'redux-actions';

import moment from 'moment';

import { fromJS, Map, List } from 'immutable';

import { ADD_TOPIC, UPDATE_TOPIC, DELETE_TOPIC } from '../constants';
import { findRecentReviewInDays } from '../utils/date';
import { Database } from '../contexts/db';
import { debugState } from '../contexts/db/testcase';

const db = new Database();

const { topics } = db.getTopics();

let defaultState = topics ? fromJS(topics) : List();

defaultState = debugState.get('topics');

const addTopic = (state, action) => {
  const { payload } = action;
  const {
    id, name, difficulty, description,
  } = payload;

  const color = randomColor({ luminosity: 'bright' });
  const lastReviewed = [
    {
      reviewDate: Date.now().valueOf(),
      difficulty,
    },
  ];

  const newTopic = fromJS({
    id,
    name,
    description,
    lastReviewed,
    difficulty,
    color,
  });

  const newState = state.push(newTopic);

  db.setState(newState);

  return newState;
};

const updateTopic = (state, action) => {
  const { payload } = action;
  const { id, difficulty } = payload;

  const index = state.findIndex(item => item.get('id') === id);
  const topic = state.get(index);

  const lastReviewed = topic.get('lastReviewed');

  const isSameDay = moment().isSame(findRecentReviewInDays(lastReviewed), 'day');

  if (isSameDay) return state;

  const updatedReviewDates = lastReviewed.push(
    Map({
      reviewDate: Date.now().valueOf(),
      difficulty,
    }),
  );

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
    [ADD_TOPIC]: addTopic,
    [DELETE_TOPIC]: deleteTopic,
    [UPDATE_TOPIC]: updateTopic,
  },
  defaultState,
);
