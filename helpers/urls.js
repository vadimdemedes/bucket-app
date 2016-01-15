'use strict';

/**
 * Generate URL for routes
 */

export function userPath (username) {
	return '/' + username;
};

export function bucketPath (username, slug) {
	return '/' + username + '/' + slug;
};
