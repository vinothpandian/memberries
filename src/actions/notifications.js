import { createAction } from 'redux-actions';

export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_CANCELLED = 'SIGN_IN_CANCELLED';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';

export const signInError = createAction(SIGN_IN_ERROR);
export const signInSuccess = createAction(SIGN_IN_SUCCESS);
export const signInCancelled = createAction(SIGN_IN_CANCELLED);
export const signUpError = createAction(SIGN_UP_ERROR);
export const signUpSuccess = createAction(SIGN_UP_SUCCESS);
export const signOutSuccess = createAction(SIGN_OUT_SUCCESS);
