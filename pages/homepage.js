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
import Text from '../components/text';
import Code from '../components/code';
import Row from '../components/row';


/**
 * Home page
 */

const HomePage = React.createClass({
	componentWillMount: function () {
		document.title = 'Bucket - Interactive README for your Node.js project';
	},

	render: function () {
		let actions = this.props.actions;

		return <div className="container py4">
			<header className="center">
				<img src="/images/logo.png" className="logo-image block block-center mb2" />
				<Link to="/" className="h1 black">Bucket</Link>

				<h3 className="mt4 regular">
					Make <span className="bold">interactive readme</span> for your Node.js projects
				</h3>

				<p className="mt2 mb4">
					<Link to="/vdemedes/what-is-bucket" className="underline">Check out a live example.</Link>
				</p>

				<LogInButton user={ this.props.authenticatedUser } onClick={ actions.logIn } />
			</header>

			<div className="clearfix mt4 py2">
				<div className="md-col md-col-6 px4">
					<h2 className="mt0">Live code playground</h2>
					<p>
						Impress users by providing code examples, that they can edit,
						run and instantly see the output.
					</p>
				</div>

				<div className="md-col md-col-6">
					{ this.codeExample() }
				</div>
			</div>

			<div className="clearfix mt4 py2">
				<div className="md-col md-col-6 px4">
					<h2 className="mt0">Markdown documentation</h2>
					<p>
						Guide user through your code using markdown text blocks.
					</p>
				</div>

				<div className="md-col md-col-6">
					{ this.textExample() }
				</div>
			</div>

			<div className="clearfix mt4 py2">
				<div className="md-col md-col-6 px4">
					<h2 className="mt0">Require any NPM module</h2>
					<p>
						All core Node.js module (fs, path, ...) and any module available
						on NPM can also be used in your code.
					</p>
				</div>

				<div className="md-col md-col-6">
					{ this.npmExample() }
				</div>
			</div>
		</div>;
	},

	codeExample: function () {
		let code = [
			'var catFacts = require(\'cat-facts\')',
			'',
			'var fact = catFacts.random();'
		].join('\n');

		let output = JSON.stringify('Researchers are unsure exactly how a cat purrs');

		let props = {
			type: 'code',
			output: output,
			readOnly: true,
			outputTypes: ['plain'],
			selectedOutputType: 'plain'
		};

		return <Row { ...props }>
			<Code readOnly={ true }>{ code }</Code>
		</Row>;
	},

	textExample: function () {
		let text = [
			'### Cat Facts',
			'',
			'This *amazing* module generates random & interesting facts about **cats**.'
		].join('\n');

		return <Text readOnly={ true }>{ text }</Text>;
	},

	npmExample: function () {
		let code = [
			'require(\'request\')',
			'require(\'moment\')',
			'require(\'cancan\')',
			'require(\'fs\')'
		].join('\n');

		return <Code readOnly={ true }>{ code }</Code>;
	}
});


/**
 * Build props
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
 * Expose page
 */

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
