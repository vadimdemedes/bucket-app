'use strict';

/**
 * Dependencies
 */

import { combineReducers } from 'redux';

import buckets from './buckets';
import bucket from './bucket';
import user from './user';
import rows from './rows';


/**
 * Main reducer function
 */

const reducer = combineReducers({
	buckets,
	bucket,
	user,
	rows
});


/**
 * Expose reducer
 */

export default reducer;
