'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import App from './component/App';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
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
    <div>
      <App videoList={videoList} />
    </div>
  </Provider>,
  document.getElementById('app'),
);
