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

const addUser = (state, action) => state.set('uid', action.uid);

const signOutUser = state => state.set('uid', null);

export default handleActions(
  {
    [SIGN_IN]: addUser,
    [SIGN_UP]: addUser,
    [SIGN_OUT]: signOutUser,
  },
  defaultState,
);
