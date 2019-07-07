import { createAction } from 'redux-actions';

export const ADD_TOPIC = 'ADD_TOPIC';
export const UPDATE_TOPIC = 'UPDATE_TOPIC';
export const DELETE_TOPIC = 'DELETE_TOPIC';

export const deleteTopic = createAction(DELETE_TOPIC);
export const addTopic = createAction(ADD_TOPIC);
export const updateTopic = createAction(UPDATE_TOPIC);
