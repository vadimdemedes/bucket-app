'use strict';

/**
 * Dependencies
 */

import React from 'react';

import { bucketPath } from '../helpers/urls';
import Link from './link';


/**
 * Bucket list
 */

const BucketList = React.createClass({
	render: function () {
		let user = this.props.user;

		let buckets = this.props.buckets.map(bucket => {
			return <li key={ bucket.id }>
				<Link to={ bucketPath(user, bucket.slug) }>
					{ bucket.slug }
				</Link>

				<p>
					{ bucket.name }
				</p>
			</li>;
		});

		return <ul className="list-reset">
			{ buckets }
		</ul>;
	}
});


/**
 * Expose component
 */

export default BucketList;
