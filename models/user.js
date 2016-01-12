'use strict';

/**
 * Dependencies
 */

import Promise from 'pinkie-promise';

import Model from './base';
import url from '../util/url';


/**
 * User
 */

const User = Model.extend({

}, {
	currentUser: function () {
		let authData = this.rootRef.getAuth();

		if (!authData) {
			return null;
		}

		return new User({
			profileImageURL: authData.github.profileImageURL,
			displayName: authData.github.displayName,
			username: authData.github.username,
			email: authData.github.email,
			id: authData.uid
		});
	},

	isLoggedIn: function () {
		return !!this.currentUser();
	},

	isInvited: function (username) {
		if (!username) {
			throw new Error('Expected a username in User.isInvited()');
		}

		return new Promise(resolve => {
			this.rootRef.child('invites').once('value', snapshot => {
				let invites = snapshot.val() || {};
				let isInvited = !!invites[username];

				resolve(isInvited);
			});
		});
	},

	logIn: function () {
		if (this.isLoggedIn()) {
			return Promise.resolve(this.currentUser());
		}

		return new Promise((resolve, reject) => {
			this.rootRef.authWithOAuthPopup('github', (err, authData) => {
				if (err) {
					reject(err);
					return;
				}

				let user = this.currentUser();

				this.rootRef.child(url('users', user.get('id'))).set(user.toJSON(), err => {
					if (err) {
						reject(err);
						return;
					}

					this.rootRef.child(url('usernames', user.get('id'))).set(user.get('username'));

					this.isInvited(user.get('username'))
						.catch(reject)
						.then(isInvited => {
							if (!isInvited) {
								let err = new Error('User is not invited');
								reject(err);
								return;
							}

							resolve(user);
						});
				});
			});
		});
	},

	logOut: function () {
		this.db.unauth();
	}
});


/**
 * Expose model
 */

export default User;
