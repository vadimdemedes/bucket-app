'use strict';

/**
 * Dependencies
 */

import React from 'react';

import { transitionTo } from '../actions/transition';
import store from '../shared/store';


/**
 * Link component
 */

const Link = React.createClass({
	navigate: function (e) {
		e.preventDefault();

		if (!this.props.to) {
			throw new Error('Expected a target in Link');
		}

		store.dispatch(transitionTo(this.props.to));
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
