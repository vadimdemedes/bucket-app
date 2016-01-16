'use strict';

/**
 * Dependencies
 */

import test from 'ava';

import * as ActionTypes from '../../constants/action-types';
import bucketsReducer from '../../reducers/buckets';


/**
 * Tests
 */

test('initial state', t => {
	let state = bucketsReducer(undefined, {});
	t.same(state, []);
});

test('set buckets', t => {
	let state = bucketsReducer(undefined, {
		type: ActionTypes.SET_BUCKETS,
		data: [{
			name: 'test'
		}]
	});

	t.same(state, [{
		name: 'test'
	}]);
});

test('alien action', t => {
	let prevState = {};
	let state = bucketsReducer(prevState, {});
	t.is(state, prevState);
});
