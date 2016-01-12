'use strict';

/**
 * Dependencies
 */

import React from 'react';
import L from 'mapbox.js';


/**
 * Set up MapBox
 */

L.mapbox.accessToken = process.env.MAPBOX_ACCESS_TOKEN;


/**
 * Map renderer
 */

const Map = React.createClass({
	componentDidMount: function () {
		let coordinates = JSON.parse(this.props.value);

		let latitude = coordinates.latitude || coordinates.lat;
		let longtitude = coordinates.longtitude || coordinates.lon;

		this.map = L.mapbox.map(this.refs.map, 'mapbox.streets', {
			attributionControl: {
				compact: true
			}
		});

		this.map.setView([latitude, longtitude], 5);
	},

	componentWillUnmount: function () {
		this.map.remove();
	},

	render: function () {
		return <div ref="map" className="map"></div>;
	}
});


/**
 * Expose renderer
 */

export default Map;
