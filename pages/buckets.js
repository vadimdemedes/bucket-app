'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { userPath } from '../helpers/urls';
import BucketList from '../components/bucket-list';
import Breadcrumb from '../components/breadcrumb';
import Actions from '../actions';
import Link from '../components/link';


/**
 * Buckets page
 */

const BucketsPage = React.createClass({
	componentWillMount: function () {
		let actions = this.props.actions;
		let user = this.props.params.user;

		actions.loadBuckets({ user });
		actions.loadUser(user);
	},

	componentWillUnmount: function () {
		var actions = this.props.actions;

		actions.setBuckets([]);
	},

	componentDidMount: function () {
		document.title = this.props.params.user + ' - Bucket';
	},

	render: function () {
		let buckets = this.props.buckets;
		let user = this.props.user;

		if (!user) {
			return <div></div>;
		}

		return <div>
			<div className="clearfix">
				<div className="left">
					<Breadcrumb image={ user.profileImageURL }>
						<Link to={ userPath(user.username) } className="bold">{ user.username }</Link>
					</Breadcrumb>
				</div>

				<div className="right">
					{ this.newBucketButton() }
				</div>
			</div>

			<BucketList user={ user.username } buckets={ buckets } />
		</div>;
	},

	newBucketButton: function () {
		let authenticatedUser = this.props.authenticatedUser;
		if (!authenticatedUser) {
			return;
		}

		let isOwnDashboard = this.props.params.user === authenticatedUser.username;
		if (!isOwnDashboard) {
			return;
		}

		let actions = this.props.actions;
		let props = {
			className: 'btn btn-outline',
			href: '#',
			onClick: actions.createBucket
		};

		return <a { ...props }>New Bucket</a>;
	}
});


/**
 * Build props
 */

function mapStateToProps (state) {
	return {
		authenticatedUser: state.authenticatedUser,
		buckets: state.buckets,
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

export default connect(mapStateToProps, mapDispatchToProps)(BucketsPage);
