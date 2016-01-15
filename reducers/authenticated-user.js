'use strict';

/**
 * Dependencies
 */

import { SET_AUTHENTICATED_USER } from '../constants/action-types';


/**
 * Authorized user reducer
 */

function authenticatedUser (state = null, action) {
	switch (action.type) {
		case SET_AUTHENTICATED_USER:
			return action.data;

		default:
			return state;
	}
}


/**
 * Expose reducer
 */

export default authenticatedUser;
