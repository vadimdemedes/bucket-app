'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import Header from '../components/header';
import Actions from '../actions';


/**
 * App container
 */

const App = React.createClass({
	render: function () {
		let actions = this.props.actions;

		return <div className="container">
			<Header
				user={ this.props.authenticatedUser }
				onLogIn={ actions.logIn }
				onLogOut={ actions.logOut } />

			{ this.props.children }
		</div>;
	}
});


/**
 * Connect to store
 */

function mapStateToProps (state) {
	return {
		authenticatedUser: state.authenticatedUser
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
