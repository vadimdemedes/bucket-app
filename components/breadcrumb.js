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
			let image = <img
				key={ 'picture' }
				src={ this.props.image }
				className="breadcumb-image" />;

			items.push(image);
		}

		React.Children.forEach(children, (item, index) => {
			let wrappedItem = <span key={ 'item' + index }>{ item }</span>;
			items.push(wrappedItem);

			if (index + 1 < children.length) {
				let separator = <span key={ 'separator' + index } className="ml1 mr1">/</span>;
				items.push(separator);
			}
		});

		return <div className="relative">
			{ items }
		</div>;
	}
});


/**
 * Expose component
 */

export default Breadcrumb;
