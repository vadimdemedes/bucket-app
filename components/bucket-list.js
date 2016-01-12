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
					<h4>{ bucket.name }</h4>
				</Link>
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
