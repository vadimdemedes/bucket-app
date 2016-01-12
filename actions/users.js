'use strict';

/**
 * Dependencies
 */

import { transitionTo } from './transitions';
import * as ActionTypes from '../constants/action-types';
import serialize from '../util/serialize';
import User from '../models/user';
import { userPath } from '../helpers/urls';


/**
 * Bucket actions
 */


/**
 * Log in and redirect to user's dashboard
 */

export function logIn () {
	return dispatch => {
		return User.logIn()
			.then(user => {
				dispatch(setCurrentUser(user));
				dispatch(transitionTo(userPath(user.get('username'))));
			});
	};
}


/**
 * Set current user
 */

export function setCurrentUser (user) {
	return {
		type: ActionTypes.SET_CURRENT_USER,
		data: serialize(user)
	};
}


/**
 * Log out
 */

export function logOut () {
	return dispatch => {
		dispatch(setCurrentUser(null));
		dispatch(transitionTo(''));
	};
}
