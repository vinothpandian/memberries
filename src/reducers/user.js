import { handleActions } from 'redux-actions';

import { Map } from 'immutable';

import { SIGN_IN, SIGN_OUT, SIGN_UP, FETCH_USER } from '../actions/user';

const defaultState = Map({
  uid: null,
});

const addUser = (state, action) => state.set('uid', action.uid);

const signOutUser = state => state.set('uid', null);

export default handleActions(
  {
    [FETCH_USER]: addUser,
    [SIGN_IN]: addUser,
    [SIGN_UP]: addUser,
    [SIGN_OUT]: signOutUser,
  },
  defaultState,
);
