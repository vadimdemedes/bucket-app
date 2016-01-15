'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import slugify from 'slugg';
import React from 'react';

import { userPath, bucketPath } from '../helpers/urls';
import Actions from '../actions';
import Bucket from '../components/bucket';
import Link from '../components/link';


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

		actions.loadUser(user);
	},

	componentWillUnmount: function () {
		let actions = this.props.actions;

		actions.setBucket(null);
	},

	render: function () {
		let actions = this.props.actions;
		let bucket = this.props.bucket;
		let rows = this.props.rows;
		let user = this.props.user;

		if (!bucket || !user) {
			return <div></div>;
		}

		let authenticatedUser = this.props.authenticatedUser;
		let isReadOnly = !authenticatedUser || authenticatedUser.username !== this.props.params.user;

		return <div>
			<div>
				<Link to={ userPath(user.username) } className="bold relative">
					<img src={ user.profileImageURL } className="user-profile-image" />
					{ user.username }
				</Link>
				<span className="mr1 ml1">/</span>
				<Link to={ bucketPath(user.username, bucket.slug) } className="bold">{ bucket.slug }</Link>
			</div>

			<Bucket
				name={ bucket.name }
				id={ bucket.id }
				rows={ rows }
				readOnly={ isReadOnly }
				onChangeName={ this.updateName }
				onAddRow={ actions.createBucketRow }
				onDeleteRow={ actions.deleteBucketRow }
				onUpdateRow={ actions.updateBucketRow }
				onChangeRowOutputType={ actions.setBucketRowOutputType }
			/>
		</div>;
	},

	updateName: function (name) {
		let actions = this.props.actions;
		let bucket = this.props.bucket;

		let slug = slugify(name);

		actions.updateBucket({ name, slug });
		actions.transitionTo(bucketPath(this.props.params.user, slug), { replace: true });
	}
});


/**
 * Connect with a store
 */

function mapStateToProps (state) {
	return {
		authenticatedUser: state.authenticatedUser,
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
