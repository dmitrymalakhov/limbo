'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import { App } from './component/App';

const store = createStore(
  rootReducer,
);

const videoList = [
  {
    title: 'jellyfish-3-mbps-hd-h264.mkv',
    src: 'http://jell.yfish.us/media/jellyfish-3-mbps-hd-h264.mkv',
  },
  {
    title: 'jellyfish-3-mbps-hd-hevc.mkv',
    src: 'http://jell.yfish.us/media/jellyfish-3-mbps-hd-hevc.mkv',
  },
];

ReactDOM.render(
  <Provider store={store}>
    <App videoList={videoList} />
  </Provider>,
  document.getElementById('app'),
);
