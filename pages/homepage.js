'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import LogInButton from '../components/login-button';
import Actions from '../actions';
import Link from '../components/link';


/**
 * Home page
 */

const HomePage = React.createClass({
	componentWillMount: function () {
		document.title = 'Bucket - Interactive README for your Node.js project';
	},

	render: function () {
		let actions = this.props.actions;

		return <div className="p4 center">
			<img src="/images/logo.png" className="logo-image" />
			<Link to="/" className="logo-link">
				<h1>Bucket</h1>
			</Link>

			<p className="mt2">
				What is Bucket? <Link to="/vdemedes/what-is-bucket">Discover the answer here.</Link>
			</p>

			<LogInButton user={ this.props.user } onClick={ actions.logIn } />
		</div>;
	}
});


/**
 * Build props
 */

function mapStateToProps (state) {
	return {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
