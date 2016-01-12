'use strict';

/**
 * Dependencies
 */

import Promise from 'pinkie-promise';

import Model from './base';
import url from '../util/url';


/**
 * Bucket Row
 */

const BucketRow = Model.extend({

}, {
	create: function (attrs) {
		if (!attrs.bucket) {
			throw new Error('Expected a bucket id in BucketRow.create()');
		}

		let ref = this.rootRef.child(url('rows', attrs.bucket)).push();
		let row = new BucketRow({
			index: attrs.index || 0,
			type: attrs.type || 'text',
			value: attrs.value || '',
			id: ref.key()
		}, { ref });

		return row.save();
	},

	find: function (bucket) {
		if (!bucket) {
			throw new Error('Expected a bucket id in BucketRow.find()');
		}

		return new Promise(resolve => {
			this.rootRef.child(url('rows', bucket)).once('value', snapshot => {
				let rows = [];

				snapshot.forEach(child => {
					let row = new BucketRow(child.val(), {
						ref: child.ref()
					});

					rows.push(row);
				});

				rows.sort((a, b) => {
					return a.get('index') - b.get('index');
				});

				resolve(rows);
			});
		});
	}
});


/**
 * Expose model
 */

export default BucketRow;
