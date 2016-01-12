'use strict';

/**
 * Dependencies
 */

import { Provider } from 'react-redux';
import Firebase from 'firebase';
import ReactDOM from 'react-dom';
import React from 'react';

import Actions from './actions';
import BucketsPage from './pages/buckets';
import BucketPage from './pages/bucket';
import HomePage from './pages/homepage';
import JoinPage from './pages/join';

import BucketRow from './models/bucket-row';
import Bucket from './models/bucket';
import User from './models/user';

import router from './shared/router';
import store from './shared/store';


/**
 * Set up models
 */

const ref = new Firebase('https://bucketdev.firebaseio.com');

BucketRow.setup(ref);
Bucket.setup(ref);
User.setup(ref);


/**
 * Initialize & monitor auth state
 */

let currentUser = User.currentUser();

if (currentUser) {
	store.dispatch(Actions.setCurrentUser(currentUser));
}

// monitor auth changes
ref.onAuth(data => {
	if (!data) {
		store.dispatch(Actions.setCurrentUser(null));
		return;
	}

	store.dispatch(Actions.setCurrentUser(User.currentUser()));
});

// var LoadingIndicator = React.createClass({
// 	render: function () {
// 		return <div className="loading-indicator">
// 			<img src="/images/loading.gif" />
// 			<span>LOADING</span>
// 		</div>;
// 	}
// });


/**
 * App
 */

const App = React.createClass({
	getInitialState: function () {
		return {
			component: null,
			params: {}
		};
	},

	componentWillMount: function () {
		router.on('route:homepage', () => {
			this.transition(HomePage);
		});

		router.on('route:join', () => {
			this.transition(JoinPage);
		});

		router.on('route:buckets', user => {
			this.transition(BucketsPage, { user });
		});

		router.on('route:bucket', (user, slug) => {
			this.transition(BucketPage, { user, slug });
		});

		router.run();
	},

	componentWillUnmount: function () {
		router.off();
	},

	render: function () {
		let component;

		if (this.state.component) {
			component = React.createElement(this.state.component, {
				params: this.state.params
			});
		}

		return <Provider store={ store }>
			{ component }
		</Provider>;
	},

	transition: function (component, params) {
		this.setState({ component, params });
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
