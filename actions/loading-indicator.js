'use strict';

/**
 * Dependencies
 */

import * as ActionTypes from '../constants/action-types';


/**
 * Loading indicator actions
 */


/**
 * Show loading indicator
 */

export function showLoadingIndicator () {
	return {
		type: ActionTypes.SHOW_LOADING_INDICATOR
	};
}


/**
 * Hide loading indicator
 */

export function hideLoadingIndicator () {
	return {
		type: ActionTypes.HIDE_LOADING_INDICATOR
	};
}
