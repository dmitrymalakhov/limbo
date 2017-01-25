'use strict';

export const CHANGE_VIEW = 'changeView';
export const PLAY_VIDEO = 'playVideo';
export const CHANGE_VIDEO = 'changeVideo';

export const changeView = index => ({
  type: CHANGE_VIEW,
  index,
});

export const playVideo = () => ({
  type: PLAY_VIDEO,
  mode: 'play',
});

export const changeVideo = index => ({
  type: CHANGE_VIDEO,
  index,
})
