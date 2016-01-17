'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import LoadingIndicator from '../components/loading-indicator';
import Header from '../components/header';
import Actions from '../actions';


/**
 * App container
 */

const App = React.createClass({
	render: function () {
		let actions = this.props.actions;

		let headerProps = {
			user: this.props.authenticatedUser,
			onLogIn: actions.logIn,
			onLogOut: actions.logOut
		};

		return <div className="container mt2 px2">
			<LoadingIndicator display={ this.props.loadingIndicator } />
			<Header { ...headerProps } />

			{ this.props.children }
		</div>;
	}
});


/**
 * Connect to store
 */

function mapStateToProps (state) {
	return {
		authenticatedUser: state.authenticatedUser,
		loadingIndicator: state.loadingIndicator
	};
}

function mapDispatchToProps (dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}


/**
 * Expose container
 */

export default connect(mapStateToProps, mapDispatchToProps)(App);
