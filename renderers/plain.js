'use strict';

/**
 * Dependencies
 */

import React from 'react';

import Editor from '../components/editor';


/**
 * Plain renderer
 */

const Plain = React.createClass({
	render: function () {
		let value = JSON.parse(this.props.value);
		let formatted = JSON.stringify(value, null, '  ');

		if (/^\[Function\: .+\]$/.test(value)) {
			formatted = value;
		}

		return <div className="bucket-row-output">
			<Editor
				lineNumbers={ false }
				mode="javascript"
				readOnly={ true }>{ formatted }</Editor>
		</div>;
	}
});


/**
 * Expose renderer
 */

export default Plain;
