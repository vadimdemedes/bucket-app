'use strict';

/**
 * Dependencies
 */

import { combineReducers } from 'redux';

import authenticatedUser from './authenticated-user';
import loadingIndicator from './loading-indicator';
import buckets from './buckets';
import bucket from './bucket';
import rows from './rows';
import user from './user';


/**
 * Main reducer function
 */

const reducer = combineReducers({
	authenticatedUser, // logged in user
  loadingIndicator,
	buckets,
	bucket,
	rows,
	user // currently viewing user
});


/**
 * Expose reducer
 */

export default reducer;
