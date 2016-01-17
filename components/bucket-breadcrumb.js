'use strict';

/**
 * Dependencies
 */

import React from 'react';

import { bucketPath, userPath } from '../helpers/urls';
import Breadcrumb from './breadcrumb';
import Link from './link';


/**
 * Bucket breadcrumb component
 */

const BucketBreadcrumb = React.createClass({
	render: function () {
		let bucket = this.props.bucket;
		let user = this.props.user;

		return <Breadcrumb image={ user.profileImageURL }>
			<Link to={ userPath(user.username) }>
				{ user.username }
			</Link>
			<Link to={ bucketPath(user.username, bucket.slug) } className="bold">
				{ bucket.slug }
			</Link>
		</Breadcrumb>
	}
});


/**
 * Expose component
 */

export default BucketBreadcrumb;
