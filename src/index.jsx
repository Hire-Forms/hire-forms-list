import React from "react";

import ListItem from "./list-item";

import {arrayOfStringsOrArrayOfKeyValueMaps} from "hire-forms-prop-types";
import {castKeyValue} from "hire-forms-utils";

class List extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editItemIndex: null
		};
	}

	handleListItemClick(index, ev) {
		this.setState({
			editItemIndex: index
		});

		if (this.props.onClick) {
			this.props.onClick(index, ev);
		}
	}

	handleListItemCancel() {
		this.setState({editItemIndex: null});
	}

	handleListItemChange(index, newValue) {
		this.setState({editItemIndex: null});

		this.props.values[index] = newValue;
		this.props.onChange(this.props.values);
	}

	handleListItemRemove(index) {
		this.setState({editItemIndex: null});

		this.props.values.splice(index, 1);
		this.props.onChange(this.props.values);
	}

	render() {
		let list = this.props.values.map((item, index) =>
			<ListItem
				active={this.state.editItemIndex === index}
				editable={this.props.editable}
				key={index}
				mutable={this.props.mutable}
				onCancel={this.handleListItemCancel.bind(this, index)}
				onChange={this.handleListItemChange.bind(this, index)}
				onClick={this.handleListItemClick.bind(this, index)}
				onRemove={this.handleListItemRemove.bind(this, index)}
				value={castKeyValue(item)} />
		);

		list = list.length ?
			(this.props.ordered ?
				<ol>{list}</ol> :
				<ul>{list}</ul>
			) :
			<span className="hire-empty-list">The list is empty</span>;

		return (
			<div className="hire-forms-list">
				{list}
			</div>
		);
	}
}

List.defaultProps = {
	editable: false,
	ordered: false,
	mutable: false,
	values: []
};

List.propTypes = {
	editable: React.PropTypes.bool,
	mutable: React.PropTypes.bool,
	onChange: React.PropTypes.func,
	onClick: React.PropTypes.func,
	options: arrayOfStringsOrArrayOfKeyValueMaps,
	ordered: React.PropTypes.bool,
	values: arrayOfStringsOrArrayOfKeyValueMaps
};

export default List;