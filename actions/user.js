'use strict';

/**
 * Dependencies
 */

import * as ActionTypes from '../constants/action-types';
import serialize from '../util/serialize';
import User from '../models/user';


/**
 * Current user
 */


/**
 * Load user
 */

export function loadUser (username) {
	return dispatch => {
		return User.find(username)
			.then(user => {
				dispatch(setUser(user));
			});
	};
}

/**
 * Set current viewing user
 */

export function setUser (user) {
	return {
		type: ActionTypes.SET_USER,
		data: serialize(user)
	};
}
