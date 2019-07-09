import { createAction } from 'redux-actions';

import randomColor from 'randomcolor';
import { Map } from 'immutable';

export const FETCH_TOPICS = 'FETCH_TOPICS';
export const FETCH_TOPICS_ASYNC = 'FETCH_TOPICS_ASYNC';

export const ADD_TOPIC = 'ADD_TOPIC';
export const ADD_TOPIC_ASYNC = 'ADD_TOPIC_ASYNC';

export const UPDATE_TOPIC = 'UPDATE_TOPIC';
export const UPDATE_TOPIC_ASYNC = 'UPDATE_TOPIC_ASYNC';

export const DELETE_TOPIC = 'DELETE_TOPIC';
export const DELETE_TOPIC_ASYNC = 'DELETE_TOPIC_ASYNC';

export const deleteTopic = createAction(DELETE_TOPIC_ASYNC);

export const updateTopic = createAction(UPDATE_TOPIC_ASYNC, ({ id, difficulty, lastReviewed }) => {
  const updatedReviewDates = lastReviewed.push(
    Map({
      reviewDate: Date.now().valueOf(),
      difficulty,
    }),
  );

  return {
    id,
    updatedReviewDates,
  };
});

export const addTopic = createAction(ADD_TOPIC_ASYNC, ({
  id, name, difficulty, description,
}) => {
  const color = randomColor({ luminosity: 'bright' });
  const lastReviewed = [
    {
      reviewDate: Date.now().valueOf(),
      difficulty,
    },
  ];

  const newTopic = {
    id,
    name,
    description,
    lastReviewed,
    difficulty,
    color,
  };

  return newTopic;
});
