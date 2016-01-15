'use strict';

/**
 * Dependencies
 */

import debounce from 'debounce';
import React from 'react';

import { userPath, bucketPath } from '../helpers/urls';
import Link from './link';
import Code from './code';
import Text from './text';
import Row from './row';


/**
 * Bucket component
 */

const Bucket = React.createClass({
	render: function () {
		let user = this.props.user;
		let slug = this.props.slug;

		return <div>
			<div className="row">
				<Link to={ userPath(user) }>{ user }</Link>
				<span className="mr1 ml1">/</span>
				<Link to={ bucketPath(user, slug) } className="bold">{ slug }</Link>
			</div>

			<div className="row">
				{ this.bucketName() }
			</div>

			{ this.rows() }
		</div>;
	},

	bucketName: function () {
		if (this.props.readOnly) {
			return <h1>{ this.props.name }</h1>;
		}

		return <input
			type="text"
			className="bucket-name"
			value={ this.props.name }
			onChange={ this.changeName } />;
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

		return <Text
			placeholder={ placeholder }
			autoFocus={ row.isNew }
			readOnly={ this.props.readOnly }
			onChange={ this.save }
			ref={ 'row' + index }>{ row.value }</Text>;
	},

	code: function (row, index) {
		let placeholder = row.value ? '' : '// Start typing...';

		return <Code
			placeholder={ placeholder }
			autoFocus={ row.isNew }
			readOnly={ this.props.readOnly }
			ref={ 'row' + index }
			onChange={ this.save }>{ row.value }</Code>;
	},

	row: function (row, index, children) {
		return <Row
			type={ row.type }
			key={ row.id }
			readOnly={ this.props.readOnly }
			output={ row.output ? row.output[row.selectedOutput] : null }
			outputTypes={ Object.keys(row.output || {}) }
			selectedOutputType={ row.selectedOutput }
			onRun={ this.props.onRun }
			onAddText={ this.addRow.bind(this, index, 'text') }
			onAddCode={ this.addRow.bind(this, index, 'code') }
			onDelete={ this.deleteRow.bind(this, index) }
			onChangeOutputType={ this.changeOutputType.bind(this, index) }>{ children }</Row>;
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
