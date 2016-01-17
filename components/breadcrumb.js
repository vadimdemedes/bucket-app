'use strict';

/**
 * Dependencies
 */

import flatten from 'arr-flatten';
import React from 'react';


/**
 * Breadcrumb component
 */

const Breadcrumb = React.createClass({
	render: function () {
		let items = React.Children.map(this.props.children, this.breadcrumbItem);
		items = flatten(items);

		if (this.props.image) {
			let props = {
				key: 'picture',
				src: this.props.image,
				className: 'breadcrumb-image'
			};

			let image = <img { ...props } />;
			items.unshift(image);
		}

		return <div className="breadcrumb relative">
			{ items }
		</div>;
	},

	breadcrumbItem: function (item, index) {
		let result = [];
		let props = {
			key: 'item' + index
		};

		// all items need to be wrapped into <span> with a key
		let wrappedItem = <span { ...props }>{ item }</span>;
		result.push(wrappedItem);

		// detect whether we need to insert a separator
		if (index + 1 < this.props.children.length) {
			let props = {
				key: 'separator' + index,
				className: 'ml1 mr1'
			};

			let separator = <span { ...props }>/</span>;
			result.push(separator);
		}

		return result;
	}
});


/**
 * Expose component
 */

export default Breadcrumb;
