'use strict';

/**
 * Dependencies
 */

import debounce from 'debounce';
import React from 'react';

import Code from './code';
import Text from './text';
import Row from './row';


/**
 * Bucket component
 */

const Bucket = React.createClass({
	render: function () {
		return <div>
			<div className="row">
				{ this.bucketName() }
			</div>

			{ this.rows() }
		</div>;
	},

	bucketName: function () {
		if (this.props.readOnly) {
			return <h1 className="mt0">{ this.props.name }</h1>;
		}

		let props = {
			type: 'text',
			value: this.props.name,
			className: 'bucket-name',
			onChange: this.changeName
		};

		return <input { ...props } />;
	},

	rows: function () {
		let rows = this.props.rows.map((row, index) => {
			let component;

			if (row.type === 'text') {
				component = this.text(row, index);
			}

			if (row.type === 'code') {
				component = this.code(row, index);
			}

			return this.row(row, index, component);
		});

		return rows;
	},

	text: function (row, index) {
		let placeholder = row.value ? '' : 'Start typing...';
		let props = {
			placeholder: placeholder,
			autoFocus: row.isNew,
			readOnly: this.props.readOnly,
			ref: 'row' + index,
			onChange: this.save
		};

		return <Text { ...props }>{ row.value }</Text>;
	},

	code: function (row, index) {
		let placeholder = row.value ? '' : '// Start typing...';
		let props = {
			placeholder: placeholder,
			autoFocus: row.isNew,
			readOnly: this.props.readOnly,
			ref: 'row' + index,
			onChange: this.save
		};

		return <Code { ...props }>{ row.value }</Code>;
	},

	row: function (row, index, children) {
		let allOutput = row.output || {};

		// if output has error, display it
		// otherwise render what user wants
		// defaulting to 'plain'
		let selectedOutputType = allOutput.error ? 'error' : (row.selectedOutputType || 'plain');
		let outputTypes = Object.keys(allOutput);
		let output = allOutput[selectedOutputType];

		let props = {
			selectedOutputType: selectedOutputType,
			outputTypes: outputTypes,
			readOnly: this.props.readOnly,
			output: output,
			type: row.type,
			key: row.id,
			onChangeOutputType: this.changeOutputType.bind(this, index),
			onAddText: this.addRow.bind(this, index, 'text'),
			onAddCode: this.addRow.bind(this, index, 'code'),
			onDelete: this.deleteRow.bind(this, index),
			onRun: this.props.onRun
		};

		return <Row { ...props }>{ children }</Row>;
	},

	save: debounce(function () {
		this.props.rows.forEach((row, index) => {
			let value = this.getRowValue(index);

			this.props.onUpdateRow({ index, value });
		});
	}, 400),

	getRowValue: function (index) {
		return this.refs['row' + index].getValue();
	},

	addRow: function (afterIndex, type) {
		let index = this.props.rows.length === 0 ? 0 : ++afterIndex;

		this.props.onAddRow({ index, type }).then(this.save);
	},

	deleteRow: function (index) {
		this.props.onDeleteRow({ index }).then(this.save);
	},

	changeName: function (e) {
		this.props.onChangeName(e.target.value);
	},

	changeOutputType: function (index, selectedOutput) {
		this.props.onUpdateRow({ index, selectedOutput });
	}
});


/**
 * Expose component
 */

export default Bucket;
