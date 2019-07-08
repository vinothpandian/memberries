import { put, takeEvery, all } from 'redux-saga/effects';
import {
  UPDATE_TOPIC_ASYNC,
  UPDATE_TOPIC,
  ADD_TOPIC_ASYNC,
  DELETE_TOPIC,
  DELETE_TOPIC_ASYNC,
  ADD_TOPIC,
} from '../actions/topics';

function* addTopicAsync({ payload }) {
  yield put({ type: ADD_TOPIC, payload });
}

function* updateTopicAsync({ payload }) {
  yield put({ type: UPDATE_TOPIC, payload });
}

function* deleteTopicAsync({ payload }) {
  yield put({ type: DELETE_TOPIC, payload });
}

function* watchUpdateTopic() {
  yield all([
    takeEvery(ADD_TOPIC_ASYNC, addTopicAsync),
    takeEvery(UPDATE_TOPIC_ASYNC, updateTopicAsync),
    takeEvery(DELETE_TOPIC_ASYNC, deleteTopicAsync),
  ]);
}

export default [watchUpdateTopic()];
