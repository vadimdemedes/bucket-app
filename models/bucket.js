'use strict';

/**
 * Dependencies
 */

import Promise from 'pinkie-promise';
import url from 'url-join';

import Model from './base';


/**
 * Bucket
 */

const Bucket = Model.extend({

}, {
	find: function (user) {
		if (!user) {
			throw new Error('Expected username in Bucket.find()');
		}

		return new Promise(resolve => {
			this.rootRef.child(url('buckets', user)).once('value', snapshot => {
				let buckets = [];

				snapshot.forEach(child => {
					let bucket = new Bucket(child.val(), {
						ref: child.ref()
					});

					buckets.push(bucket);
				});

				resolve(buckets);
			});
		});
	},

	findOne: function (user, slug) {
		if (!user) {
			throw new Error('Expected username in Bucket.findOne()');
		}

		if (!slug) {
			throw new Error('Expected bucket slug in Bucket.findOne()');
		}

		return new Promise(resolve => {
			this.rootRef
				.child(url('buckets', user))
				.orderByChild('slug')
				.equalTo(slug)
				.once('child_added', snapshot => {
					let bucket = new Bucket(snapshot.val(), {
						ref: snapshot.ref()
					});

					resolve(bucket);
				});
		});
	},

	create: function (user) {
		if (!user) {
			throw new Error('Expected a User object in Bucket.create()');
		}

		let ref = this.rootRef.child(url('buckets', user.username)).push();
		let bucket = new Bucket({
			userId: user.id,
			name: 'New Bucket',
			slug: 'new-bucket' + ref.key(),
			id: ref.key()
		}, { ref });

		return bucket.save();
	}
});


/**
 * Expose model
 */

export default Bucket;
