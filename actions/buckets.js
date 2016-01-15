'use strict';

/**
 * Dependencies
 */

import slugify from 'slugg';

import { transitionTo } from './transitions';
import { createBucketRow } from './bucket-rows';
import * as ActionTypes from '../constants/action-types';
import serialize from '../util/serialize';
import Bucket from '../models/bucket';
import { bucketPath } from '../helpers/urls';


/**
 * Bucket actions
 */


/**
 * Load buckets of some user and add them to the store
 */

export function loadBuckets (options) {
	return dispatch => {
		Bucket.find(options.user).then(buckets => {
			dispatch(setBuckets(buckets));

			return buckets;
		});
	};
}


/**
 * Load bucket and set it as a current one
 */

export function loadBucket (options) {
	return dispatch => {
		return Bucket.findOne(options.user, options.slug).then(bucket => {
			dispatch(setBucket(bucket));

			return bucket;
		});
	};
}


/**
 * Set current buckets
 */

export function setBuckets (buckets) {
	return {
		type: ActionTypes.SET_BUCKETS,
		data: buckets.map(serialize)
	};
}


/**
 * Create new bucket and redirect to it
 */

export function createBucket () {
	return (dispatch, getState) => {
		let user = getState().authenticatedUser;

		if (!user) {
			return;
		}

		return Bucket.create(user)
			.then(bucket => {
				return dispatch(createBucketRow({
					bucket: bucket.get('id')
				})).then(() => bucket);
			})
			.then(bucket => {
				dispatch(transitionTo(bucketPath(user.username, bucket.get('slug'))));
			});
	};
}


/**
 * Set current bucket
 */

export function setBucket (bucket) {
	return {
		type: ActionTypes.SET_BUCKET,
		data: serialize(bucket)
	};
}


/**
 * Update current bucket name
 */

export function setBucketName (name) {
	return (dispatch, getState) => {
		let state = getState();

		let bucket = Bucket.unserialize(state.bucket);
		let user = state.authenticatedUser;
		let slug = slugify(name);

		bucket.set({ name, slug });

		dispatch({
			type: ActionTypes.SET_BUCKET_NAME,
			data: name
		});

		dispatch(transitionTo(bucketPath(user.username, slug), { replace: true }));

		return bucket.save({ update: true });
	};
}
