'use strict';

/**
 * Dependencies
 */

import React from 'react';

import router from '../shared/router';
import Link from './link';


/**
 * Log In Button
 */

const LogInButton = React.createClass({
	render: function () {
		let button = this.authorized() || this.unauthorized();

		return button;
	},

	authorized: function () {
		let user = this.props.user;

		if (!user) {
			return;
		}

		return <Link to={ user.username } className="mt4 btn btn-primary">
			<img src="/images/logo-glyph.svg" />
			Continue to Dashboard
		</Link>;
	},

	unauthorized: function () {
		// TODO: rename "this.props.onClick"
		return <button className="mt4 btn btn-primary" onClick={ this.props.onClick }>
			<img src="/images/github-icon.svg" />
			Sign in with GitHub
		</button>;
	}
});


/**
 * Expose component
 */

export default LogInButton;
