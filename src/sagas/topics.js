import {
  put, takeEvery, all, call, select,
} from 'redux-saga/effects';
import { fromJS, mergeDeep, List } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import {
  UPDATE_TOPIC_ASYNC,
  UPDATE_TOPIC,
  ADD_TOPIC_ASYNC,
  DELETE_TOPIC,
  DELETE_TOPIC_ASYNC,
  ADD_TOPIC,
  FETCH_TOPICS_ASYNC,
  FETCH_TOPICS,
} from '../actions/topics';
import {
  addTopic, fetchTopics, updateTopic, deleteTopic, syncUpload,
} from '../utils/firebase';
import { stateToFirebase } from '../utils';

// TODO: Fetch when user signs in
// TODO: Add timestamp to state to check which one is up to date and update the other one
function* fetchTopicsAsync() {
  const topicsInFirebase = yield call(fetchTopics);
  const topicsInState = yield select(state => state.topics);

  if (isEmpty(topicsInFirebase)) {
    console.log('FIREBASE EMPTY');
  } else if (topicsInState.isEmpty()) {
    console.log('STATES_EMPTY');
  } else {
    console.log('MERGE ALL');
  }

  const topicsInStateForMerging = stateToFirebase(topicsInState);
  const mergedMap = fromJS(mergeDeep(topicsInFirebase, topicsInStateForMerging));

  const mergedTopics = List([...mergedMap.values()]);

  console.log(mergedTopics.toJS());
  console.log(!mergedTopics.equals(topicsInState));
  console.log(!mergedMap.equals(topicsInFirebase));

  // if (!mergedTopics.equals(topicsInState)) {
  //   yield put({ type: FETCH_TOPICS, mergedTopics });
  // }

  // if (!mergedTopics.equals(fetchedTopics)) {
  //   yield call(syncUpload, mergedTopics);
  // }
}

function* forkWithFirebase({ callFunction, finalAction }, action) {
  const { payload } = action;
  try {
    yield call(callFunction, payload);
  } catch (error) {
    // eslint-disable-next-line
    console.warn(error.message);
  } finally {
    yield put({ type: finalAction, payload });
  }
}

function* watchTopicActions() {
  yield all([
    takeEvery(ADD_TOPIC_ASYNC, forkWithFirebase, {
      callFunction: addTopic,
      finalAction: ADD_TOPIC,
    }),
    takeEvery(UPDATE_TOPIC_ASYNC, forkWithFirebase, {
      callFunction: updateTopic,
      finalAction: UPDATE_TOPIC,
    }),
    takeEvery(DELETE_TOPIC_ASYNC, forkWithFirebase, {
      callFunction: deleteTopic,
      finalAction: DELETE_TOPIC,
    }),
  ]);
}

function* watchFetchTopics() {
  yield takeEvery(FETCH_TOPICS_ASYNC, fetchTopicsAsync);
}

export default [watchTopicActions(), watchFetchTopics()];
