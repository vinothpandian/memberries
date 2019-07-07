import { handleActions } from 'redux-actions';

import { Map } from 'immutable';

import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../actions/user';

const defaultState = Map({
  uid: null,
});

const defaultReducer = (state, action) => {
  console.log(action);
  return state;
};

const signInUser = (state, action) => state.set('uid', action.uid);

const signOutUser = state => state.set('uid', null);

export default handleActions(
  {
    [SIGN_IN]: signInUser,
    [SIGN_UP]: defaultReducer,
    [SIGN_OUT]: signOutUser,
  },
  defaultState,
);
