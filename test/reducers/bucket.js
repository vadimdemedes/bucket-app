'use strict';

/**
 * Dependencies
 */

import test from 'ava';

import * as ActionTypes from '../../constants/action-types';
import bucketReducer from '../../reducers/bucket';


/**
 * Tests
 */

test('initial state', t => {
	let state = bucketReducer(undefined, {});
	t.is(state, null);
});

test('set bucket', t => {
	let state = bucketReducer(undefined, {
		type: ActionTypes.SET_BUCKET,
		data: {
			name: 'test'
		}
	});

	t.same(state, {
		name: 'test'
	});
});

test('update bucket', t => {
	let prevState = {
		name: 'old'
	};

	let state = bucketReducer(prevState, {
		type: ActionTypes.UPDATE_BUCKET,
		data: {
			name: 'new'
		}
	});

	t.same(prevState, {
		name: 'old'
	});

	t.same(state, {
		name: 'new'
	});
});

test('alien action', t => {
	let prevState = {};
	let state = bucketReducer(prevState, {});
	t.is(state, prevState);
});
