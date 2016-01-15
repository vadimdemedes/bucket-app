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
 * Authorized user
 */


/**
 * Log in and redirect to user's dashboard
 */

export function logIn () {
	return dispatch => {
		return User.logIn()
			.then(user => {
				dispatch(setAuthenticatedUser(user));
				dispatch(transitionTo(userPath(user.get('username'))));
			});
	};
}


/**
 * Set current authorized user
 */

export function setAuthenticatedUser (user) {
	return {
		type: ActionTypes.SET_AUTHORIZED_USER,
		data: serialize(user)
	};
}


/**
 * Log out
 */

export function logOut () {
	return dispatch => {
		dispatch(setAuthenticatedUser(null));
		dispatch(transitionTo(''));
	};
}
