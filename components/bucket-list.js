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
		let buckets = this.props.buckets.map(this.listItem);

		return <ul className="list-reset">
			{ buckets }
		</ul>;
	},

	listItem: function (bucket) {
		let user = this.props.user;

		return <li key={ bucket.id }>
			<Link to={ bucketPath(user, bucket.slug) }>
				{ bucket.slug }
			</Link>

			<p>
				{ bucket.name }
			</p>
		</li>;
	}
});


/**
 * Expose component
 */

export default BucketList;
