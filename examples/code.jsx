import React from "react";
import prism from "prismjs";
import jsxToString from "jsx-to-string";
import pretty from "pretty";
import {Tabs, Tab} from "hire-tabs";

require("prismjs/components/prism-jsx.js");

class Code extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: "JSX"
		};
	}

	render() {
		let jsxString =
			jsxToString(this.props.children)
				// Add a linebreak and tab to every property
				.replace(/\s(\w+)=/g, (match, p1) =>
					` \n\t${p1}=`
				);

		let highlightedJsx = prism.highlight(
			jsxString,
			prism.languages.jsx
		);


		let highlightedHtml = prism.highlight(
			pretty(React.renderToStaticMarkup(this.props.children)),
			prism.languages.html
		);

		return (
			<div
				className="code">
				<Tabs onChange={(label) => this.setState({tab: label})}>
					<Tab
						active={this.state.tab === "JSX"}
						label="JSX">
						<pre>
							<code
								className="language-jsx"
								dangerouslySetInnerHTML={{__html: highlightedJsx}}/>
						</pre>
					</Tab>
					<Tab
						active={this.state.tab === "HTML"}
						label="HTML">
						<pre>
							<code
								className="language-html"
								dangerouslySetInnerHTML={{__html: highlightedHtml}}/>
						</pre>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

Code.propTypes = {};

Code.defaultProps = {};

export default Code;