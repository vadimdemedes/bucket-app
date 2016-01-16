'use strict';

/**
 * Dependencies
 */

import {
	SHOW_LOADING_INDICATOR,
	HIDE_LOADING_INDICATOR
} from '../constants/action-types';


/**
 * Loading indicator reducer
 */

function loadingIndicator (state = false, action) {
	switch (action.type) {
		case SHOW_LOADING_INDICATOR:
			return true;

		case HIDE_LOADING_INDICATOR:
			return false;

		default:
			return state;
	}
}


/**
 * Expose reducer
 */

export default loadingIndicator;
