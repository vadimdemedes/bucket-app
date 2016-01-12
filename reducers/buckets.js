'use strict';

/**
 * Dependencies
 */

import { SET_BUCKETS } from '../constants/action-types';


/**
 * Buckets reducer
 */

function buckets (state = [], action) {
	switch (action.type) {
		case SET_BUCKETS:
			return action.data;

		default:
			return state;
	}
}


/**
 * Expose reducer
 */

export default buckets;
