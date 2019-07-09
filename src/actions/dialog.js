import { createAction } from 'redux-actions';

export const DIALOG_OPEN = 'DIALOG_OPEN';
export const DIALOG_CLOSE = 'DIALOG_CLOSE';

export const dialogOpen = createAction(DIALOG_OPEN);
export const dialogClose = createAction(DIALOG_CLOSE);
