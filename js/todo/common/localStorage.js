'use strict';

export const save = state => {
  localStorage.setItem('state', JSON.stringify(state));
};

export const load = () => JSON.parse(localStorage.getItem('state'));
