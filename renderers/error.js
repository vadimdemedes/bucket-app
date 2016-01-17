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

		return <div className="bucket-row-output is-error">
			<Editor
				lineNumbers={ false }
				mode="gfm"
				readOnly={ true }>{ value }</Editor>
		</div>;
	}
});


/**
 * Expose renderer
 */

export default Err;
