import React from 'react';
import cx from 'classnames';
import ListItem from './list-item';
import {arrayOfStringsOrArrayOfKeyValueMaps} from 'hire-forms-prop-types';
import {castKeyValue} from 'hire-forms-utils';

class List extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editItemIndex: null,
		};
	}

	handleListItemClick(index, ev) {
		this.setState({
			editItemIndex: index,
		});

		if (this.props.onClick) {
			this.props.onClick(index, ev);
		}
	}

	handleListItemChange(index, newValue) {
		this.setState({ editItemIndex: null });

		this.props.values[index] = newValue;
		this.props.onChange(this.props.values);
	}

	handleListItemRemove(index) {
		this.setState({ editItemIndex: null });

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
				onCancel={() => this.setState({ editItemIndex: null })}
				onChange={this.handleListItemChange.bind(this, index)}
				onClick={this.handleListItemClick.bind(this, index)}
				onRemove={this.handleListItemRemove.bind(this, index)}
				value={castKeyValue(item)}
			/>
		);

		list = list.length ?
			(this.props.ordered ?
				<ol>{list}</ol> :
				<ul>{list}</ul>
			) :
			<span className="hire-empty-list">{this.props.emptyMessage}</span>;

		return (
			<div
				className={cx(
					'hire-forms-list',
					{
						mutable: this.props.mutable,
						editable: this.props.editable,
					}
				)}
			>
				{list}
			</div>
		);
	}
}

List.defaultProps = {
	editable: false,
	emptyMessage: 'The list is empty',
	ordered: false,
	mutable: false,
	values: [],
};

List.propTypes = {
	editable: React.PropTypes.bool,
	emptyMessage: React.PropTypes.string,
	mutable: React.PropTypes.bool,
	onChange: React.PropTypes.func,
	onClick: React.PropTypes.func,
	options: arrayOfStringsOrArrayOfKeyValueMaps,
	ordered: React.PropTypes.bool,
	values: arrayOfStringsOrArrayOfKeyValueMaps,
};

export default List;
