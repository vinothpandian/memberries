import { handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { signIn, signUp, signOut } from '../utils/firebase';

import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../actions/user';

const defaultState = {
  uid: '',
};

const defaultReducer = (state, action) => {
  console.log(action);
  return state;
};

const signInUser = (state, action) => ({
  uid: action.uid,
});

const signOutUser = (state) => {
  signOut();
  return state;
};

export default handleActions(
  {
    [SIGN_IN]: signInUser,
    [SIGN_UP]: defaultReducer,
    [SIGN_OUT]: signOutUser,
  },
  defaultState,
);
