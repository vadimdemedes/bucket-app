'use strict';

/**
 * Dependencies
 */

import React from 'react';

import renderers from '../renderers';
import Editor from './editor';


/**
 * Row component
 */

const Row = React.createClass({
	getInitialState: function () {
		return {
			showActions: false
		};
	},

	render: function () {
		let showActions = this.state.showActions;
		if (this.props.readOnly) {
			showActions = false;
		}

		let classes = [
			'clearfix',
			showActions ? 'visible' : 'hidden'
		];

		let props = {
			className: 'row py1 mb3',
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseLeave
		};

		return <div { ...props }>
			<div>
				{ this.props.children }
			</div>

			{ this.output() }

			<div className={ classes.join(' ') }>
				{ this.outputTypes() }
				{ this.actions() }
			</div>
		</div>;
	},

	output: function () {
		if (!this.hasOutput()) {
			return;
		}

		let renderer = renderers[this.props.selectedOutputType];
		let output = React.createElement(renderer, {
			value: this.props.output
		});

		return output;
	},

	outputTypes: function () {
		if (!this.hasOutput() || this.props.readOnly) {
			return;
		}

		let types = this.props.outputTypes;
		if (types.length <= 1) {
			return;
		}

		let options = types.map(item => {
			let props = {
				value: item,
				key: item
			};

			return <option { ...props }>{ item }</option>;
		});

		let props = {
			value: this.props.selectedOutputType,
			size: 1,
			onChange: this.changeOutputType
		};

		return <div className="left">
			<select { ...props }>{ options }</select>
		</div>;
	},

	actions: function () {
		if (this.props.readOnly) {
			return;
		}

		return <div className="right">
			{ this.runButton() }
			{ this.addTextButton() }
			{ this.addCodeButton() }
			{ this.deleteButton() }
		</div>;
	},

	runButton: function () {
		if (this.props.type !== 'code') {
			return;
		}

		let props = {
			className: 'btn gray',
			onClick: this.props.onRun
		};

		return <a { ...props }>Run</a>;
	},

	addTextButton: function () {
		let props = {
			className: 'btn gray',
			onClick: this.props.onAddText
		};

		return <a { ...props }>Add Text</a>;
	},

	addCodeButton: function () {
		let props = {
			className: 'btn gray',
			onClick: this.props.onAddCode
		};

		return <a { ...props }>Add Code</a>;
	},

	deleteButton: function () {
		let props = {
			className: 'btn gray',
			onClick: this.props.onDelete
		};

		return <a { ...props }>Delete</a>;
	},

	hasOutput: function () {
		return this.props.type === 'code' && !!this.props.output;
	},

	onMouseEnter: function () {
		this.setState({ showActions: true });
	},

	onMouseLeave: function () {
		this.setState({ showActions: false });
	},

	changeOutputType: function (e) {
		this.props.onChangeOutputType(e.target.value);
	}
});


/**
 * Expose component
 */

export default Row;
