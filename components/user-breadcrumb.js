'use strict';

/**
 * Dependencies
 */

import React from 'react';

import { userPath } from '../helpers/urls';
import Breadcrumb from './breadcrumb';
import Link from './link';


/**
 * User breadcrumb component
 */

const UserBreadcrumb = React.createClass({
	render: function () {
		let user = this.props.user;

		return <Breadcrumb image={ user.profileImageURL }>
			<Link to={ userPath(user.username) }>
				{ user.username }
			</Link>
		</Breadcrumb>
	}
});


/**
 * Expose component
 */

export default UserBreadcrumb;
