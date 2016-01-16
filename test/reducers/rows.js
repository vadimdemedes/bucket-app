'use strict';

/**
 * Dependencies
 */

import test from 'ava';

import * as ActionTypes from '../../constants/action-types';
import rowsReducer from '../../reducers/rows';


/**
 * Tests
 */

test('initial state', t => {
	let state = rowsReducer(undefined, {});
	t.same(state, []);
});

test('set rows', t => {
	let state = rowsReducer(undefined, {
		type: ActionTypes.SET_BUCKET_ROWS,
		data: [{
			id: 1
		}]
	});

	t.same(state, [{
		id: 1
	}]);
});

test('add row', t => {
	let prevState = [{
		id: 1
	}, {
		id: 3
	}];

	let state = rowsReducer(prevState, {
		type: ActionTypes.ADD_BUCKET_ROW,
		data: {
			index: 1,
			id: 2
		}
	});

	t.same(state, [{
		id: 1
	}, {
		index: 1,
		id: 2
	}, {
		id: 3
	}]);
});

test('alien action', t => {
	let prevState = [];
	let state = rowsReducer(prevState, {});
	t.is(state, prevState);
});
