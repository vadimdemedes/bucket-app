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

		return <div className="py4">
			<header className="center">
				<img src="/images/logo.png" className="logo-image block block-center mb2" />
				<Link to="/" className="h1 black">Bucket</Link>

				<h3 className="mt4 regular">
					Make <span className="bold">interactive readme</span> for your Node.js projects
				</h3>

				<p className="mt2 mb4">
					<Link to="/vdemedes/what-is-bucket" className="underline">Check out a live example.</Link>
				</p>

				<LogInButton className="mt4" user={ this.props.authenticatedUser } onClick={ actions.logIn } />
			</header>

			<div className="container py4">
				<div className="clearfix mt4 py2">
					<div className="md-col md-col-6 px2 md-px4">
						<h2 className="mt0">Live code playground</h2>
						<p>
							Impress users by providing code examples, that they can edit,
							run and instantly see the output.
						</p>
					</div>

					<div className="md-col md-col-6 px2 md-px0 mt3 md-mt0">
						{ this.codeExample() }
					</div>
				</div>

				<div className="clearfix mt4 py2">
					<div className="md-col md-col-6 px2 md-px4">
						<h2 className="mt0">Markdown documentation</h2>
						<p>
							Guide user through your code using markdown text blocks.
						</p>
					</div>

					<div className="md-col md-col-6 px2 md-px0 mt3 md-mt0">
						{ this.textExample() }
					</div>
				</div>
			</div>

			<div className="py4 md-mt4 bg-blue white">
				<h2 className="center mt0">
					Integrated with
					<img src="/images/npm.svg" className="npm-logo ml2 mr2" />
					and
					<img src="/images/github.svg" className="github-logo ml2" />
				</h2>

				<div className="container clearfix mt4">
					<div className="md-col md-col-6 px2 py2 md-py4">
						<h3 className="underline inline-block mt0">Require any npm module</h3>
						<p>
							All core Node.js module (fs, path, ...) and any module available on npm can also be used in your code.
						</p>

						<p>
							Just <b>require()</b> module you want and Bucket automatically installs it for you under the hood.
						</p>
					</div>

					<div className="md-col md-col-6 px2 py2 md-py4">
						<h3 className="underline inline-block mt0">Connect with a GitHub repository</h3>
						<span className="h5 border border-white rounded bold px1 ml2">SOON</span>

						<p>
							To avoid writing documentation multiple times, connect your GitHub repository
							and we will convert Guide.md into interactive bucket on every push.
						</p>

						<p>
							All markdown code blocks will be transformed into editable code rows in your bucket.
						</p>
					</div>
				</div>

				<div className="center mt2">
					<LogInButton
						label="Get started with GitHub"
						color="white"
						type="outline"
						user={ this.props.authenticatedUser }
						onClick={ actions.logIn } />
				</div>
			</div>

			<div className="mt4">
				<h2 className="center">
					Bucket
					<img src="/images/heart-icon.svg" className="ml2 mr2 heart-icon" />
					Open Source
				</h2>

				<div className="container clearfix">
					{ /* height: 1px is needed for empty col to fill its space */ }
					<div className="sm-col sm-col-3" style={{ height: '1px' }}></div>
					<p className="sm-col sm-col-6 px2 sm-px0">
						Bucket's frontend application is open-sourced on <a href="https://github.com/vdemedes/bucket">GitHub</a>.
						Feel free to contribute and help to shape Bucket's future!
					</p>
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
