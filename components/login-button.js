'use strict';

/**
 * Dependencies
 */

import React from 'react';


/**
 * Log In Button
 */

const LogInButton = React.createClass({
	render: function () {
		return <button className="mt4 btn btn-lg btn-primary" onClick={ this.props.onClick }>
			<img src="/images/github-icon.svg" />
			Sign in with GitHub
		</button>;
	}
});


/**
 * Expose component
 */

export default LogInButton;
