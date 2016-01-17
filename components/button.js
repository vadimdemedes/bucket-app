'use strict';

/**
 * Dependencies
 */

import React from 'react';


/**
 * Button component
 */

const Button = React.createClass({
	render: function () {
		let classes = ['btn'];

		let background = this.props.background || 'blue';
		let color = this.props.color || 'white';
		let size = this.props.size || 'md';
		let type = this.props.type || 'primary';

		classes.push('bg-' + background);
		classes.push(color);
		classes.push('btn-' + type);
		classes.push('btn-' + size);

		let className = classes.join(' ');

		// add any custom class names
		className += this.props.className || '';

		return <button className={ className } onClick={ this.props.onClick }>
			{ this.props.children }
		</button>;
	}
});


/**
 * Expose component
 */

export default Button;
