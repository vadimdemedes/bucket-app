'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import Actions from '../actions';
import Bucket from '../components/bucket';


/**
 * Bucket page
 */

const BucketPage = React.createClass({
	componentWillMount: function () {
		let actions = this.props.actions;
		let user = this.props.params.user;
		let slug = this.props.params.slug;

		actions.loadBucket({ user, slug }).then(bucket => {
			document.title = bucket.get('name') + ' - Bucket';

			actions.loadBucketRows({
				bucket: bucket.get('id')
			});
		});
	},

	componentWillUnmount: function () {
		let actions = this.props.actions;

		actions.setBucket(null);
	},

	render: function () {
		let actions = this.props.actions;
		let bucket = this.props.bucket;
		let rows = this.props.rows;

		if (!bucket) {
			return <div></div>;
		}

		let isLoggedIn = !!this.props.user;
		let isReadOnly = !isLoggedIn || this.props.user.username !== this.props.params.user;

		return <Bucket
			user={ this.props.params.user }
			slug={ bucket.slug }
			name={ bucket.name }
			id={ bucket.id }
			rows={ rows }
			readOnly={ isReadOnly }
			onChangeName={ actions.setBucketName }
			onAddRow={ actions.createBucketRow }
			onDeleteRow={ actions.deleteBucketRow }
			onUpdateRow={ actions.updateBucketRow }
			onChangeRowOutputType={ actions.setBucketRowOutputType }
		/>;
	}
});


/**
 * Connect with a store
 */

function mapStateToProps (state) {
	return {
		bucket: state.bucket,
		rows: state.rows,
		user: state.user
	};
}

function mapDispatchToProps (dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}


/**
 * Expose page
 */

export default connect(mapStateToProps, mapDispatchToProps)(BucketPage);
