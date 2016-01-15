'use strict';

/**
 * Dependencies
 */

import assign from 'object-assign';

import * as AuthenticatedUserActions from './authenticated-user';
import * as TransitionActions from './transition';
import * as BucketRowActions from './bucket-row';
import * as BucketActions from './bucket';
import * as UserActions from './user';


/**
 * Expose all actions at once
 */

const actions = assign(
	{},
	AuthenticatedUserActions,
	TransitionActions,
	BucketRowActions,
	BucketActions,
	UserActions
);

export default actions;
