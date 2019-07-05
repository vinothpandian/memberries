import { createAction } from 'redux-actions';
import { ADD_TOPIC, UPDATE_TOPIC, DELETE_TOPIC } from '../constants';

export const deleteTopic = createAction(DELETE_TOPIC);
export const addTopic = createAction(ADD_TOPIC);
export const updateTopic = createAction(UPDATE_TOPIC);
