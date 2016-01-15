'use strict';

/**
 * Dependencies
 */

import assign from 'object-assign';

import { SET_BUCKET, UPDATE_BUCKET } from '../constants/action-types';


/**
 * Bucket reducer
 */

function bucket (state = null, action) {
	switch (action.type) {
		case SET_BUCKET:
			return action.data;

		case UPDATE_BUCKET:
			return assign({}, state, action.data);

		default:
			return state;
	}
}


/**
 * Expose reducer
 */

export default bucket;
