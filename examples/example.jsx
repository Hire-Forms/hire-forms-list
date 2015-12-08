import React from "react";
import Code from "./code";

class Example extends React.Component {
	render() {
		return (
			<div className="example">
				<header>
					<h2>{this.props.title}</h2>
				</header>
				{this.props.children}
				<Code>
					{this.props.children}
				</Code>
			</div>
		);
	}
}

Example.propTypes = {};

Example.defaultProps = {};

export default Example;