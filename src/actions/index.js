import { createActions } from 'redux-actions';
import {
  FETCH_TOPIC, FETCH_TOPICS, ADD_TOPIC, UPDATE_TOPIC,
} from '../constants';

export default createActions({
  [FETCH_TOPIC]: FETCH_TOPIC,
  [FETCH_TOPICS]: FETCH_TOPICS,
  [ADD_TOPIC]: ADD_TOPIC,
  [UPDATE_TOPIC]: UPDATE_TOPIC,
});
