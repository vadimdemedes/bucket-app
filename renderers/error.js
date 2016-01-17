'use strict';

/**
 * Dependencies
 */

import React from 'react';

import Editor from '../components/editor';


/**
 * Error renderer
 */

const Err = React.createClass({
	render: function () {
		let error = this.props.value;
		let value = error.name + ': ' + error.message + '\n' + error.stack;

		let props = {
			lineNumbers: false,
			readOnly: true,
			mode: 'gfm'
		};

		return <div className="bucket-row-output is-error">
			<Editor { ...props }>{ value }</Editor>
		</div>;
	}
});


/**
 * Expose renderer
 */

export default Err;
