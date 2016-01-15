'use strict';

/**
 * Dependencies
 */

import React from 'react';

import { userPath } from '../helpers/urls';
import Link from './link';


/**
 * Header component
 */

const Header = React.createClass({
	render: function () {
		return <header className="header clearfix">
			<ul className="left list-reset">
				{ this.leftItems() }
			</ul>

			<ul className="right list-reset">
				{ this.rightItems() }
			</ul>
		</header>;
	},

	leftItems: function () {
		let user = this.props.user;

		if (!this.props.user) {
			return <li>
				<Link to="/">Bucket</Link>
			</li>;
		}

		return <li>
			<Link to={ userPath(this.props.user.username) }>Dashboard</Link>
		</li>;
	},

	rightItems: function () {
		if (!this.props.user) {
			return <li>
				<button
					className="btn btn-outline"
					onClick={ this.props.onLogIn }>Log In</button>
			</li>;
		}

		return <li>
			<button
				className="btn btn-outline"
				onClick={ this.props.onLogOut }>Log Out</button>
		</li>;
	}
});


/**
 * Expose component
 */

module.exports = Header;
