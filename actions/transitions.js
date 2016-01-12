'use strict';

/**
 * Dependencies
 */

import ActionTypes from '../constants/action-types';


/**
 * Transitions
 */


/**
 * Transition to a new page
 */

const defaultOptions = {
	trigger: true
};

export function transitionTo (path, options = defaultOptions) {
	return {
		type: ActionTypes.TRANSITION,
		transition: {
			to: path,
			replace: options.replace,
			trigger: options.trigger
		}
	};
}
