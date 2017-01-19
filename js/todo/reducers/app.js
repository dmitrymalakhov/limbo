'use strict';

import _ from 'lodash';
import { load } from '../common/localStorage';

import {
    ADD_ITEM,
    CHANGE_INPUT,
    REMOVE_ITEM,
    COMPLETE_ITEM,
    CHANGE_FILTER,
    CHANGE_SORT,
} from '../actions/app';

const getInitState = () => load() || {
  app: {
    items: [],
    content: '',
  },
};

const { app } = getInitState();

let lastId = app.items.reduce((acc, cur) => acc > cur.id ? acc : cur.id, 0);

export default (state = app, action) => {
  switch (action.type) {
    case ADD_ITEM:
      lastId++;

      return Object.assign({}, state, {
        content: '',
        items: state.items.concat({
          id: lastId,
          content: action.content,
          completed: false,
          show: true,
        }),
      });

    case REMOVE_ITEM:
      return Object.assign({}, state, {
        items: state.items.filter(obj => obj.id !== action.id),
      });

    case COMPLETE_ITEM:
      return Object.assign({}, state, {
        items: state.items.map(obj => Object.assign({}, obj, {
          completed: obj.id === action.id ? action.completed : obj.completed,
        })),
      });

    case CHANGE_INPUT:
      return Object.assign({}, state, {
        content: action.content,
      });

    case CHANGE_SORT:
      return Object.assign({}, state, {
        items: _.sortBy(state.items, item => [item[action.sort]]),
      });

    case CHANGE_FILTER:
      return Object.assign({}, state, {
        items: state.items.map(obj => {
          let show = true;

          if (action.filter === 'completed') {
            if (!obj.completed)
              show = false;
          } else if (action.filter === 'uncompleted') {
            if (obj.completed)
              show = false;
          }

          return Object.assign({}, obj, { show });
        }),
      });

    default:
      return state;
  }
};
