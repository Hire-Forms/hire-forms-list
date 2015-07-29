// TODO merge with static-list/list-item?
// TODO move css to default css file

import React from "react";
import cx from "classnames";

import Input from "hire-forms-input";

import {keyValueMap} from "hire-forms-prop-types";

let ext = function(...styles) {
	return Object.assign({}, ...styles);
};

let liStyle = {
	cursor: "pointer"
};

let inputStyle = {
	width: "90%"
};

let buttonStyle = {
	width: "10%"
};

let spanStyle = {
	width: "90%"
};

let inlineBlockStyle = {
	display: "inline-block",
	boxSizing: "border-box",
	verticalAlign: "top"
};

class ListItem extends React.Component {
	componentWillUpdate(nextProps, nextState) {
		if (!nextProps.active) {
			nextState.value = nextProps.value.value;
		}
	}

	componentDidUpdate() {
		if (this.props.active && this.props.editable) {
			let node = React.findDOMNode(this.refs.input);
			node.focus();
			node.value = node.value;
		}
	}

	constructor(props) {
		super(props);

		this.state = {value: props.value.value};
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
				style={ext(
					inlineBlockStyle,
					inputStyle
				)}
				value={this.state.value} /> :
			<span
				className="value"
				onClick={this.props.onClick.bind(this)}
				style={ext(
					inlineBlockStyle,
					spanStyle
				)}>
				{this.props.value.value}
			</span>;

		if (this.props.active && this.props.removable) {
			remove = (
				<button
					className="remove"
					onClick={this.props.onRemove}
					style={ext(
						inlineBlockStyle,
						buttonStyle
					)}>
					x
				</button>);
		}

		return (
			<li
				className={cx(
					"hire-list-item",
					{active: this.props.active}
				)}
				style={liStyle}>
				{el}
				{remove}
			</li>
		);
	}
}

ListItem.defaultProps = {
	active: false,
	editable: false,
	removable: true
};

ListItem.propTypes = {
	active: React.PropTypes.bool,
	editable: React.PropTypes.bool,
	onCancel: React.PropTypes.func,
	onChange: React.PropTypes.func,
	onClick: React.PropTypes.func,
	onRemove: React.PropTypes.func,
	removable: React.PropTypes.bool,
	value: keyValueMap
};

export default ListItem;