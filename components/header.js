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
		return <header className="container header px2 md-px0 clearfix">
			<ul className="left list-reset">
				{ this.leftItems() }
			</ul>

			<ul className="right list-reset">
				{ this.rightItems() }
			</ul>
		</header>;
	},

	leftItems: function () {
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
			let props = {
				href: '#',
				onClick: this.logIn
			};

			return <li>
				<a { ...props }>Log In</a>
			</li>;
		}

		let props = {
			href: '#',
			onClick: this.logOut
		};

		return <li>
			<a { ...props }>Log Out</a>
		</li>;
	},

	logIn: function (e) {
		e.preventDefault();

		this.props.onLogIn();
	},

	logOut: function (e) {
		e.preventDefault();

		this.props.onLogOut();
	}
});


/**
 * Expose component
 */

module.exports = Header;
