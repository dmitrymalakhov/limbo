'use strict';

export const CHANGE_VIEW = 'changeView';

export const changeView = index => ({
  type: CHANGE_VIEW,
  index,
});
