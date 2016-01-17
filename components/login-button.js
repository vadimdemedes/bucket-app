'use strict';

/**
 * Dependencies
 */

import React from 'react';

import Button from './button';


/**
 * Log In Button
 */

const LogInButton = React.createClass({
	render: function () {
		let label = this.props.label || 'Sign in with GitHub';

		return <Button { ...this.props }>
			<img src="/images/github-icon.svg" />
			{ label }
		</Button>;
	}
});


/**
 * Expose component
 */

export default LogInButton;
