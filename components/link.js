'use strict';

/**
 * Dependencies
 */

import React from 'react';

import router from '../shared/router';


/**
 * Link component
 */

const Link = React.createClass({
	navigate: function (e) {
		e.preventDefault();

		let to = this.props.to;

		if (!to) {
			throw new Error('Expected a target in Link');
		}

		if (to[0] === '/') {
			to = to.slice(1);
		}

		router.navigate(to, { trigger: true });
	},

	render: function () {
		return <a
			href={ this.props.to }
			className={ this.props.className }
			onClick={ this.navigate }
		>{ this.props.children }</a>;
	}
});


/**
 * Expose component
 */

export default Link;
