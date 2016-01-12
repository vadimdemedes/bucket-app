'use strict';

/**
 * Build a URL from segments
 */

export default function url () {
	return Array.prototype.join.call(arguments, '/');
};
