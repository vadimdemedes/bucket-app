'use strict';

/**
 * Dependencies
 */

import assign from 'object-assign';

import {
	SET_BUCKET_ROWS,
	ADD_BUCKET_ROW,
	UPDATE_BUCKET_ROW,
	REMOVE_BUCKET_ROW
} from '../constants/action-types';


/**
 * Rows reducer
 */

function rows (state = [], action) {
	switch (action.type) {
		case SET_BUCKET_ROWS:
			return action.data;

		case ADD_BUCKET_ROW:
			state = [...state];
			state.splice(action.data.index, 0, action.data);
			return state;

		case UPDATE_BUCKET_ROW:
			state = [...state];
			assign(state[action.data.index], action.data);
			return state;

		case REMOVE_BUCKET_ROW:
			state = [...state];
			state.splice(action.data.index, 1);
			return state;

		default:
			return state;
	}
}


/**
 * Expose reducer
 */

export default rows;
