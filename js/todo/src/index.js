'use strict';

import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "./reducers";
import ToDoList from "./component/ToDoList.js";

const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<ToDoList />
	</Provider>,
	document.getElementById('app')
);
