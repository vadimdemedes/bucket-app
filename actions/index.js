'use strict';

/**
 * Dependencies
 */

import assign from 'object-assign';

import * as TransitionActions from './transitions';
import * as BucketRowActions from './bucket-rows';
import * as BucketActions from './buckets';
import * as AuthenticatedUserActions from './authenticated-user';


/**
 * Expose all actions at once
 */

const actions = assign(
	{},
	TransitionActions,
	BucketRowActions,
	BucketActions,
	AuthenticatedUserActions
);

export default actions;
