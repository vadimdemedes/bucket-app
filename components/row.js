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
		].join(' ');

		return <div className="row" onMouseEnter={ this.onMouseEnter } onMouseLeave={ this.onMouseLeave }>
			<div>
				{ this.props.children }
			</div>

			{ this.output() }

			<div className={ classes }>
				{ this.outputTypes() }
				{ this.actions() }
			</div>
		</div>;
	},

	runButton: function () {
		if (this.props.type === 'code') {
			return <a className="gray btn" onClick={ this.props.onRun }>Run</a>;
		}
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
		if (!this.hasOutput()) {
			return;
		}

		let types = this.props.outputTypes;

		if (types.length <= 1) {
			return;
		}

		let options = types.map(item => {
			return <option value={ item } key={ item }>{ item }</option>;
		});

		return <div className="left">
			<select
				value={ this.props.selectedOutputType }
				size="1"
				onChange={ this.changeOutputType }
			>{ options }</select>
		</div>;
	},

	actions: function () {
		let runButton = this.runButton();

		return <div className="right">
			{ runButton }
			<a className="gray btn" onClick={ this.props.onAddText }>Add Text</a>
			<a className="gray btn" onClick={ this.props.onAddCode }>Add Code</a>
			<a className="gray btn" onClick={ this.props.onDelete }>Delete</a>
		</div>;
	},

	hasOutput: function () {
		return this.props.type === 'code' && !!this.props.output;
	},

	onMouseEnter: function () {
		this.setState({
			showActions: true
		});
	},

	onMouseLeave: function () {
		this.setState({
			showActions: false
		});
	},

	changeOutputType: function (e) {
		this.props.onChangeOutputType(e.target.value);
	}
});


/**
 * Expose component
 */

export default Row;
