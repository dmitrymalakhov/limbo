/**
 * @author Dmitriy Bizyaev
 */

'use strict';

import {
    APP_GET_MOST_RELEVANT_PROFESSION
} from '../actions/app';

import { Record } from 'immutable';

const AppState = Record({
    currentProfession: ''
});

export default (state = new AppState(), action) => {
    switch (action.type) {
        case APP_GET_MOST_RELEVANT_PROFESSION: {
            console.log(state);
            return state;
        }

        default:
            return state;
    }
};
