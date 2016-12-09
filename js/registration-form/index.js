'use strict';

import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "./reducers";

import App from "./components/App/App";

const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
        <App />
	</Provider>,
	document.getElementById('app')
);
