import { combineReducers } from 'redux';
import topicReducers from './topics';
import userReducers from './user';

export default combineReducers({
  topics: topicReducers,
  user: userReducers,
});
