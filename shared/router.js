'use strict';

/**
 * Dependencies
 */

import Router from '../lib/router';


/**
 * Router
 */

const router = new Router({
	routes: {
		'': 'homepage',
		'join': 'join',
		':user': 'buckets',
		':user/:slug': 'bucket'
	}
});


/**
 * Expose router
 */

export default router;
