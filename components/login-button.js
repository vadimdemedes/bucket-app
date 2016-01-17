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
		return <Button { ...this.props }>
			<img src="/images/github-icon.svg" />
			Sign in with GitHub
		</Button>;
	}
});


/**
 * Expose component
 */

export default LogInButton;
