import {
  call, cancel, cancelled, fork, put, take,
} from 'redux-saga/effects';
import {
  SIGN_IN, SIGN_IN_ASYNC, SIGN_OUT, SIGN_UP, SIGN_OUT_ASYNC,
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

import { signIn, signUp, signOut } from '../utils/firebase';

// function* signInAsync(action) {
//   const { payload } = action;
//   const response = yield call(signIn, payload);
//   yield put({ type: SIGN_IN, uid: response });
// }

// function* watchSignInAsync() {
//   yield takeEvery(SIGN_IN_ASYNC, signInAsync);
// }

export function* authorize(payload) {
  try {
    const uid = yield call(signIn, payload);
    yield put({ type: SIGN_IN, uid });
    yield put({ type: DIALOG_CLOSE });
    yield put({ type: SIGN_IN_SUCCESS });
  } catch (error) {
    // yield put({ type: DIALOG_CLOSE });
    yield put({ type: SIGN_IN_ERROR, message: error.message });
  } finally {
    if (yield cancelled()) {
      yield put({ type: DIALOG_CLOSE });
      yield put({ type: SIGN_IN_CANCELLED });
    }
  }
}

export function* signInFlow() {
  while (true) {
    const { payload } = yield take(SIGN_IN_ASYNC);
    const task = yield fork(authorize, payload);
    const action = yield take([SIGN_OUT_ASYNC, SIGN_IN_ERROR]);
    if (action.type === SIGN_OUT_ASYNC) {
      yield cancel(task);
      yield call(signOut);
      yield put({ type: SIGN_OUT });
      yield put({ type: SIGN_OUT_SUCCESS });
    }
  }
}

export default [signInFlow()];
