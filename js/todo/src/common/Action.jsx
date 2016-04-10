import React from 'react';
import * as Const from './Const.jsx';

let itemCounter = 0;

export const addItem = (content) => {
	return {
		type: Const.ADD_ITEM,
		id: itemCounter++,
		content
	}
}

export const changeInput = (content) => {
	return {
		type: Const.CHANGE_INPUT,
		content
	}
}

export const removeItem = (id) => {
	return {
		type: Const.REMOVE_ITEM,
		id
	}
}