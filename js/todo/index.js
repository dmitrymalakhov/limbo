'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import { keeper } from './middleware';
import ToDoList from './component/ToDoList';

const store = createStore(
  rootReducer,
  applyMiddleware(keeper),
);

ReactDOM.render(
  <Provider store={store}>
    <ToDoList />
  </Provider>,
  document.getElementById('app'),
);
