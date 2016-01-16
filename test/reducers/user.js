'use strict';

/**
 * Dependencies
 */

import test from 'ava';

import * as ActionTypes from '../../constants/action-types';
import userReducer from '../../reducers/user';


/**
 * Tests
 */

test('initial state', t => {
	let state = userReducer(undefined, {});
	t.is(state, null);
});

test('set user', t => {
	let state = userReducer(undefined, {
		type: ActionTypes.SET_USER,
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
	let state = userReducer(prevState, {});
	t.is(state, prevState);
});
