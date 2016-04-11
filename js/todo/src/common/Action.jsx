import React from 'react';
import * as Const from './Const.jsx';


export const addItem = (content) => {
	return {
		type: Const.ADD_ITEM,
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

export const сompleteItem = (id, completed) => {
	return {
		type: Const.COMPLETE_ITEM,
		id,
		completed
	}
}

export const changeFilter = (filter) => {
	return {
		type: Const.CHANGE_FILTER,
		filter
	}
}

export const changeSort = (sort) => {
	return {
		type: Const.CHANGE_SORT,
		sort
	}
}