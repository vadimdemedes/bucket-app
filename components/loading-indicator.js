'use strict';

/**
 * Dependencies
 */

import React from 'react';


/**
 * Loading indicator component
 */

const LoadingIndicator = React.createClass({
	render: function () {
		let classes = [
			'loading-indicator'
		];

		if (this.props.display === false) {
			classes.push('hide');
		}

		return <div className={ classes.join(' ') }>
			<img src="/images/loading.gif" />
			<span>LOADING</span>
		</div>;
	}
});


/**
 * Expose component
 */

module.exports = LoadingIndicator;
