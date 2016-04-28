// TODO merge with static-list/list-item?

import React from "react";
import cx from "classnames";
import insertCss from "insert-css";

import Input from "hire-forms-input";

import {keyValueMap} from "hire-forms-prop-types";

let fs = require("fs");
let css = fs.readFileSync(__dirname + "/index.css");

if (typeof window !== "undefined" && window.document) {
	insertCss(css, {prepend: true});
}

class ListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value.value
		};
	}

	componentWillUpdate(nextProps, nextState) {
		if (!nextProps.active) {
			nextState.value = nextProps.value.value;
		}
	}

	componentDidUpdate() {
		if (this.props.active && this.props.editable) {
			let node = this.refs.input;
			node.focus();
			node.value = node.value;
		}
	}

	onInputChange(value) {
		this.setState({value: value});
	}

	onInputKeyDown(ev) {
		// if keyCode is "enter" or "tab"
		if (ev.keyCode === 13 || ev.keyCode === 9) {
			if (this.state.value === this.props.value.value) {
				this.props.onCancel();
			} else {
				this.props.onChange(this.state.value);
			}
		}

		// if keyCode is "escape"
		if (ev.keyCode === 27) {
			this.props.onCancel();
		}
	}

	render() {
		let remove;

		let el = (this.props.active && this.props.editable) ?
			<Input
				onChange={this.onInputChange.bind(this)}
				onKeyDown={this.onInputKeyDown.bind(this)}
				ref="input"
				value={this.state.value} /> :
			<span
				className="value"
				onClick={this.props.onClick.bind(this)}>
				{this.props.value.value}
			</span>;

		if (this.props.mutable) {
			remove = (
				<button
					className="remove"
					onClick={this.props.onRemove}>
					x
				</button>);
		}

		return (
			<li
				className={cx(
					"hire-forms-list-item",
					{active: this.props.active}
				)}>
				{el}
				{remove}
			</li>
		);
	}
}

ListItem.defaultProps = {
	active: false,
	editable: false,
	mutable: false
};

ListItem.propTypes = {
	active: React.PropTypes.bool,
	editable: React.PropTypes.bool,
	mutable: React.PropTypes.bool,
	onCancel: React.PropTypes.func,
	onChange: React.PropTypes.func,
	onClick: React.PropTypes.func,
	onRemove: React.PropTypes.func,
	value: keyValueMap
};

export default ListItem;
