import {
  call, cancel, cancelled, fork, put, take,
} from 'redux-saga/effects';
import {
  SIGN_IN,
  SIGN_IN_ASYNC,
  SIGN_OUT,
  SIGN_UP,
  SIGN_OUT_ASYNC,
  SIGN_IN_CANCELLED,
  SIGN_IN_ERROR,
} from '../actions/user';

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
  } catch (error) {
    yield put({ type: SIGN_IN_ERROR, error });
  } finally {
    if (yield cancelled()) {
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
    }
  }
}

export default [signInFlow()];
