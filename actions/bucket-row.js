'use strict';

/**
 * Dependencies
 */

import * as ActionTypes from '../constants/action-types';
import BucketRow from '../models/bucket-row';
import serialize from '../helpers/serialize';


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
 * Watch bucket rows for output changes
 */

export function watchBucketRows () {
	return (dispatch, getState) => {
		let bucket = getState().bucket;

		// firebase sends first event with current value
		// so we need not to treat it as update
		let skippedFirstValue = false;
		let rowsRef = BucketRow.rootRef.child('rows').child(bucket.id);

		rowsRef.on('value', snapshot => {
			if (!skippedFirstValue) {
				skippedFirstValue = true;
				return;
			}

			snapshot.forEach(child => {
				let row = child.val();

				dispatch(updateBucketRow({
					index: row.index,
					output: null
				}));

				dispatch(updateBucketRow({
					index: row.index,
					output: row.output
				}));
			});
		});

		// return unsubscribe function, redux style
		return () => {
			rowsRef.off();
		};
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

			return row;
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
 * Update bucket row
 */

export function updateBucketRow (data) {
	return {
		type: ActionTypes.UPDATE_BUCKET_ROW,
		data: data
	};
}


/**
 * Update & save bucket row to Firebase
 */

export function saveBucketRow (data) {
	return (dispatch, getState) => {
		let state = getState();

		let row = BucketRow.unserialize(state.rows[data.index]);
		row.set(data);
		dispatch(updateBucketRow(data));

		return row.save({ update: true });
	};
}


/**
 * Delete bucket row and remove it from the store
 */

export function deleteBucketRow (data) {
	return (dispatch, getState) => {
		let state = getState();

		// can't delete the only row left
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
