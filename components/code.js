'use strict';

/**
 * Dependencies
 */

import React from 'react';

import Editor from './editor';


/**
 * Code row
 */

const Code = React.createClass({
	render: function () {
		let props = {
			placeholder: this.props.placeholder,
			autoFocus: this.props.autoFocus,
			readOnly: this.props.readOnly,
			mode: 'javascript',
			ref: 'editor',
			onChange: this.props.onChange
		};

		return <Editor { ...props }>{ this.props.children }</Editor>;
	},

	getValue: function () {
		return this.refs.editor.getValue();
	},

	setValue: function (value) {
		return this.refs.editor.setValue(value);
	}
});


/**
 * Expose component
 */

export default Code;
