import { all } from 'redux-saga/effects';
import userSaga from './user';
import topicSaga from './topics';

export default function* rootSaga() {
  yield all([...userSaga, ...topicSaga]);
}
