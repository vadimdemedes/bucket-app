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
		let props = {
			className: 'btn btn-lg btn-primary mt4',
			onClick: this.props.onClick
		};

		return <button { ...props }>
			<img src="/images/github-icon.svg" />
			Sign in with GitHub
		</button>;
	}
});


/**
 * Expose component
 */

export default LogInButton;
