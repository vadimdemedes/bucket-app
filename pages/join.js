'use strict';

/**
 * Dependencies
 */

import React from 'react';


/**
 * Join page
 */

const JoinPage = React.createClass({
	componentDidMount: function () {
		document.title = 'Join - Bucket';
	},

	render: function () {
		return <div className="center p4">
			<h1>Bucket is in Private Beta</h1>

			<p className="mt2">
				You'll get an invitation as soon as open slots are available, stay tuned!
			</p>
		</div>;
	}
});


/**
 * Expose page
 */

export default JoinPage;
