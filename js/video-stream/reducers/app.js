'use strict';

import {
    CHANGE_VIEW,
    PLAY_VIDEO,
    CHANGE_VIDEO,
} from '../actions/app';

const initialState = {
  currentVideo: 0,
  currentView: 0,
  videoMode: 'play',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return Object.assign({}, state, {
        currentView: action.index,
      });
    
    case PLAY_VIDEO:
      return Object.assign({}, state, {
        videoMode: 'play',
      });
      
    case CHANGE_VIDEO:
      return Object.assign({}, state, {
        currentVideo: action.index,
      });

    default:
      return state;
  }
};
