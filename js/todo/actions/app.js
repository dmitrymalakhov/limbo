'use strict';

export const ADD_ITEM = 'addItem';
export const CHANGE_INPUT = 'changeInput';
export const REMOVE_ITEM = 'removeItem';
export const COMPLETE_ITEM = 'сompleteItem';
export const CHANGE_FILTER = 'changeFilter';
export const CHANGE_SORT = 'changeSort';

export const addItem = content => ({
  type: ADD_ITEM,
  content,
});

export const changeInput = content => ({
  type: CHANGE_INPUT,
  content,
});

export const removeItem = id => ({
  type: REMOVE_ITEM,
  id,
});

export const сompleteItem = (id, completed) => ({
  type: COMPLETE_ITEM,
  id,
  completed,
});

export const changeFilter = filter => ({
  type: CHANGE_FILTER,
  filter,
});

export const changeSort = sort => ({
  type: CHANGE_SORT,
  sort,
});
