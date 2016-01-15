'use strict';

/**
 * Dependencies
 */

import { combineReducers } from 'redux';

import authenticatedUser from './authenticated-user';
import buckets from './buckets';
import bucket from './bucket';
import rows from './rows';


/**
 * Main reducer function
 */

const reducer = combineReducers({
	authenticatedUser: authenticatedUser, // logged in user
	buckets: buckets,
	bucket: bucket,
	rows: rows
});


/**
 * Expose reducer
 */

export default reducer;
