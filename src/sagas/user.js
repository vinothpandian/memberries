import {
  call, cancel, cancelled, fork, put, take, takeEvery,
} from 'redux-saga/effects';
import {
  SIGN_IN,
  SIGN_IN_ASYNC,
  SIGN_OUT,
  SIGN_UP,
  SIGN_UP_ASYNC,
  SIGN_OUT_ASYNC,
  FETCH_USER,
  FETCH_USER_ASYNC,
} from '../actions/user';

import {
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_CANCELLED,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_OUT_SUCCESS,
} from '../actions/notifications';

import { DIALOG_CLOSE } from '../actions/dialog';
import { CLEAR_TOPICS, FETCH_TOPICS_ASYNC } from '../actions/topics';

import {
  signIn, signUp, signOut, getUserID,
} from '../utils/firebase';

function* signUpAsync(payload) {
  try {
    const uid = yield call(signUp, payload);
    yield put({ type: SIGN_UP, uid });
    yield put({ type: DIALOG_CLOSE });
    yield put({ type: SIGN_UP_SUCCESS });
    yield put({ type: FETCH_TOPICS_ASYNC });
  } catch (error) {
    yield put({ type: SIGN_UP_ERROR, message: error.message });
  } finally {
    if (yield cancelled()) {
      yield put({ type: DIALOG_CLOSE });
      yield put({ type: SIGN_IN_CANCELLED, message: 'Sign up cancelled' });
    }
  }
}

function* authorize(payload) {
  try {
    const uid = yield call(signIn, payload);
    yield put({ type: SIGN_IN, uid });
    yield put({ type: DIALOG_CLOSE });
    yield put({ type: SIGN_IN_SUCCESS });
    yield put({ type: FETCH_TOPICS_ASYNC });
  } catch (error) {
    yield put({ type: SIGN_IN_ERROR, message: error.message });
  } finally {
    if (yield cancelled()) {
      yield put({ type: DIALOG_CLOSE });
      yield put({ type: SIGN_IN_CANCELLED });
    }
  }
}

function* signInSignUpFlow() {
  while (true) {
    const action = yield take([SIGN_IN_ASYNC, SIGN_UP_ASYNC, SIGN_OUT_ASYNC]);
    const { payload } = action;
    let task = null;

    if (action.type === SIGN_OUT_ASYNC) {
      yield call(signOut);
      yield put({ type: SIGN_OUT });
      yield put({ type: SIGN_OUT_SUCCESS });
    } else {
      //  IF sign up or sign in comes then
      if (action.type === SIGN_UP_ASYNC) {
        task = yield fork(signUpAsync, payload);
      } else if (action.type === SIGN_IN_ASYNC) {
        task = yield fork(authorize, payload);
      }

      const followUpAction = yield take([SIGN_OUT_ASYNC, SIGN_IN_ERROR, SIGN_UP_ERROR]);
      if (followUpAction.type === SIGN_OUT_ASYNC) {
        yield cancel(task);
        yield call(signOut);
        yield put({ type: SIGN_OUT });
        yield put({ type: SIGN_OUT_SUCCESS });
        // yield put({ type: CLEAR_TOPICS });
      }
    }
  }
}

function* fetchUserAsync() {
  const uid = yield call(getUserID);
  if (uid) {
    yield put({ type: FETCH_USER, uid });
    yield put({ type: FETCH_TOPICS_ASYNC });
  }
}

function* watchFetchUser() {
  yield takeEvery(FETCH_USER_ASYNC, fetchUserAsync);
}

export default [signInSignUpFlow(), watchFetchUser()];
