'use strict';

import {
    CHANGE_VIEW,
} from '../actions/app';

const initialState = {
  currentVideo: 0,
  currentView: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return Object.assign({}, state, {
        currentView: action.index,
      });

    default:
      return state;
  }
};
