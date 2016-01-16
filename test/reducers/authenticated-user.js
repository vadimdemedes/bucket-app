'use strict';

/**
 * Dependencies
 */

import test from 'ava';

import * as ActionTypes from '../../constants/action-types';
import authenticatedUserReducer from '../../reducers/authenticated-user';


/**
 * Tests
 */

test('initial state', t => {
	let state = authenticatedUserReducer(undefined, {});
	t.is(state, null);
});

test('set authenticated user', t => {
	let state = authenticatedUserReducer(undefined, {
		type: ActionTypes.SET_AUTHENTICATED_USER,
		data: {
			name: 'test'
		}
	});

	t.same(state, {
		name: 'test'
	});
});

test('alien action', t => {
	let prevState = {};
	let state = authenticatedUserReducer(prevState, {});
	t.is(state, prevState);
});
