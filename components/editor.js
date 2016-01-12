'use strict';

/**
 * Dependencies
 */

import CodeMirror from 'codemirror';
import React from 'react';

// modes for CodeMirror
// TODO: replace with `import`
require('codemirror/addon/display/placeholder');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/gfm/gfm');


/**
 * Editor component
 */

const Editor = React.createClass({
	componentDidMount: function () {
		let value = React.Children.toArray(this.props.children)[0];

		this.editor = CodeMirror.fromTextArea(this.refs.textarea, this.codeMirrorOptions());

		if (value) {
			this.setValue(value);
		}

		if (this.props.onChange) {
			this.editor.on('change', this.props.onChange);
		}
	},

	componentWillUnmount: function () {
		if (this.props.onChange) {
			this.editor.off('change', this.props.onChange);
		}

		this.editor.toTextArea();
	},

	render: function () {
		return <textarea ref="textarea"></textarea>;
	},

	codeMirrorOptions: function () {
		// automatically enable line numbers on js
		let lineNumbers = this.props.mode === 'javascript';

		if (this.props.lineNumbers === false) {
			lineNumbers = false;
		}

		return {
			viewportMargin: Infinity,
			matchBrackets: true,
			lineWrapping: true,
			placeholder: this.props.placeholder,
			lineNumbers: lineNumbers,
			autofocus: this.props.autoFocus,
			readOnly: this.props.readOnly,
			dragDrop: false,
			theme: 'neo',
			mode: this.props.mode
		};
	},

	getValue: function () {
		return this.editor.getValue();
	},

	setValue: function (value) {
		this.editor.setValue(value);
	}
});


/**
 * Expose component
 */

export default Editor;
