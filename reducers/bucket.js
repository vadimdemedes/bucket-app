'use strict';

/**
 * Dependencies
 */

import assign from 'object-assign';

import { SET_BUCKET, SET_BUCKET_NAME } from '../constants/action-types';


/**
 * Bucket reducer
 */

function bucket (state = null, action) {
	switch (action.type) {
		case SET_BUCKET:
			return action.data;

		case SET_BUCKET_NAME:
			return assign({}, state, {
				name: action.data
			});

		default:
			return state;
	}
}


/**
 * Expose reducer
 */

export default bucket;
