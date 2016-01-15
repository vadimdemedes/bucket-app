'use strict';

/**
 * Dependencies
 */

import assign from 'object-assign';

import * as TransitionActions from './transition';
import * as BucketRowActions from './bucket-row';
import * as BucketActions from './bucket';
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
