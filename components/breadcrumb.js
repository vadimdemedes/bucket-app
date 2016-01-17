'use strict';

/**
 * Dependencies
 */

import React from 'react';


/**
 * Breadcrumb component
 */

const Breadcrumb = React.createClass({
	render: function () {
		let children = this.props.children;
		let items = [];

		if (this.props.image) {
			let props = {
				key: 'picture',
				src: this.props.image,
				className: 'breadcrumb-image'
			};

			let image = <img { ...props } />;
			items.push(image);
		}

		React.Children.forEach(children, (item, index) => {
			let props = {
				key: 'item' + index
			};

			let wrappedItem = <span { ...props }>{ item }</span>;
			items.push(wrappedItem);

			if (index + 1 < children.length) {
				let props = {
					key: 'separator' + index,
					className: 'ml1 mr1'
				};

				let separator = <span { ...props }>/</span>;
				items.push(separator);
			}
		});

		return <div className="breadcrumb relative">
			{ items }
		</div>;
	}
});


/**
 * Expose component
 */

export default Breadcrumb;
