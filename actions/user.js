'use strict';

/**
 * Dependencies
 */

import Promise from 'pinkie-promise';

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
	return (dispatch, getState) => {
		let authenticatedUser = getState().authenticatedUser;

		if (authenticatedUser && authenticatedUser.username === username) {
			dispatch(setUser(authenticatedUser));
			return Promise.resolve();
		}

		return User.find(username)
			.then(user => {
				dispatch(setUser(user));

				return user;
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
