import {
  call, cancel, cancelled, fork, put, take,
} from 'redux-saga/effects';
import {
  SIGN_IN,
  SIGN_IN_ASYNC,
  SIGN_OUT,
  SIGN_UP,
  SIGN_UP_ASYNC,
  SIGN_OUT_ASYNC,
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

function* signUpAsync(payload) {
  try {
    const uid = yield call(signUp, payload);
    yield put({ type: SIGN_UP, uid });
    yield put({ type: DIALOG_CLOSE });
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (error) {
    yield put({ type: SIGN_UP_ERROR, message: error.message });
  } finally {
    if (yield cancelled()) {
      yield put({ type: DIALOG_CLOSE });
      yield put({ type: SIGN_IN_CANCELLED, message: 'Sign up cancelled' });
    }
  }
}

export function* authorize(payload) {
  try {
    const uid = yield call(signIn, payload);
    yield put({ type: SIGN_IN, uid });
    yield put({ type: DIALOG_CLOSE });
    yield put({ type: SIGN_IN_SUCCESS });
  } catch (error) {
    yield put({ type: SIGN_IN_ERROR, message: error.message });
  } finally {
    if (yield cancelled()) {
      yield put({ type: DIALOG_CLOSE });
      yield put({ type: SIGN_IN_CANCELLED });
    }
  }
}

export function* signInSignUpFlow() {
  while (true) {
    const action = yield take([SIGN_IN_ASYNC, SIGN_UP_ASYNC]);
    const { payload } = action;
    let task = null;
    if (action.type === SIGN_UP_ASYNC) {
      task = yield fork(signUpAsync, payload);
    } else {
      task = yield fork(authorize, payload);
    }

    const followUpAction = yield take([SIGN_OUT_ASYNC, SIGN_IN_ERROR, SIGN_UP_ERROR]);
    if (followUpAction.type === SIGN_OUT_ASYNC) {
      yield cancel(task);
      yield call(signOut);
      yield put({ type: SIGN_OUT });
      yield put({ type: SIGN_OUT_SUCCESS });
    }
  }
}

export default [signInSignUpFlow()];
