import { combineReducers } from 'redux';
import topicReducers from './topics';

export default combineReducers({
  topics: topicReducers,
});
