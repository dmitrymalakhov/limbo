'use strict';

import { save } from '../common/localStorage';

export const keeper = store => next => action => {
  next(action);

  const state = store.getState();

  save(state);
  return state;
};
