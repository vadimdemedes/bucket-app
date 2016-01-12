'use strict';

/**
 * Dependencies
 */

import assign from 'object-assign';

import * as TransitionActions from './transitions';
import * as BucketRowActions from './bucket-rows';
import * as BucketActions from './buckets';
import * as UserActions from './users';


/**
 * Expose all actions at once
 */

const actions = assign(
	{},
	TransitionActions,
	BucketRowActions,
	BucketActions,
	UserActions
);

export default actions;
