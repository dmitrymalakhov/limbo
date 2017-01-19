import { save } from '../common/localStorage';

export const keeper = store => next => action => {
  save(store.getState());
  return next(action);
};
