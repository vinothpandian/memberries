import { combineReducers } from 'redux';
import topicReducers from './topics';
import userReducers from './user';
import notificationReducers from './notifications';
import dialogReducers from './dialog';

export default combineReducers({
  topics: topicReducers,
  user: userReducers,
  notification: notificationReducers,
  dialog: dialogReducers,
});
