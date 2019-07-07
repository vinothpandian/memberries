import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { DIALOG_OPEN, DIALOG_CLOSE } from '../actions/dialog';

const defaultState = Map({
  open: false,
});

const setDialogOpen = open => state => state.set('open', open);

export default handleActions(
  {
    [DIALOG_OPEN]: setDialogOpen(true),
    [DIALOG_CLOSE]: setDialogOpen(false),
  },
  defaultState,
);
