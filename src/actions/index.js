import { createAction } from 'redux-actions';
import { ADD_TOPIC, UPDATE_TOPIC } from '../constants';

export const addTopic = createAction(ADD_TOPIC);
export const updateTopic = createAction(UPDATE_TOPIC);
