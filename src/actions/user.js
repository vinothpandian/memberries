import { createAction } from 'redux-actions';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';

export const SIGN_IN_ASYNC = 'SIGN_IN_ASYNC';
export const SIGN_UP_ASYNC = 'SIGN_UP_ASYNC';
export const SIGN_OUT_ASYNC = 'SIGN_OUT_ASYNC';

export const signIn = createAction(SIGN_IN_ASYNC);
export const signUp = createAction(SIGN_UP_ASYNC);
export const signOut = createAction(SIGN_OUT_ASYNC);
