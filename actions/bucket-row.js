'use strict';

/**
 * Dependencies
 */

import * as ActionTypes from '../constants/action-types';
import BucketRow from '../models/bucket-row';
import serialize from '../util/serialize';


/**
 * Bucket row actions
 */


/**
 * Load bucket rows
 */

export function loadBucketRows (options) {
	return dispatch => {
		return BucketRow.find(options.bucket).then(rows => {
			dispatch(setBucketRows(rows));

			return rows;
		});
	};
}


/**
 * Set bucket rows
 */

export function setBucketRows (rows) {
	return {
		type: ActionTypes.SET_BUCKET_ROWS,
		data: rows.map(serialize)
	};
}


/**
 * Create new bucket row and add it to the store
 */

export function createBucketRow (data) {
	return (dispatch, getState) => {
		let state = getState();

		return BucketRow.create({
			bucket: data.bucket || state.bucket.id,
			index: data.index,
			type: data.type,
			value: ''
		}).then(row => {
			dispatch(addBucketRow(row));
		});
	};
}


/**
 * Add bucket row
 */

export function addBucketRow (row) {
	return {
		type: ActionTypes.ADD_BUCKET_ROW,
		data: serialize(row)
	};
}


/**
 * Update bucket row index, value and update the store
 */

export function updateBucketRow (data) {
	return (dispatch, getState) => {
		let state = getState();

		let row = BucketRow.unserialize(state.rows[data.index]);
		row.set(data);

		dispatch({
			type: ActionTypes.UPDATE_BUCKET_ROW,
			data: data
		});

		return row.save({ update: true });
	};
}


/**
 * Delete bucket row and remove it from the store
 */

export function deleteBucketRow (data) {
	return (dispatch, getState) => {
		let state = getState();

		if (data.index === 0 && state.rows.length === 1) {
			return;
		}

		let row = BucketRow.unserialize(state.rows[data.index]);
		dispatch(removeBucketRow(row));

		return row.remove();
	};
}


/**
 * Remove bucket row
 */

export function removeBucketRow (row) {
	return {
		type: ActionTypes.REMOVE_BUCKET_ROW,
		data: serialize(row)
	};
}
