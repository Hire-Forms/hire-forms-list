import * as React from 'react';
import * as cx from 'classnames';
import ListItem from './list-item';
import {castKeyValue} from 'hire-forms-utils';

export interface IKeyValue {
	key: string | number;
	value: string;
}

export interface IListProps {
	editable: boolean;
	emptyMessage: string;
	onChange?: (items: IKeyValue[]) => void;
	onClick?: (index: number, ev: Event) => void;
	ordered: boolean;
	showEmptyListMessage: boolean;
	mutable: boolean;
	values: IKeyValue[];
}

interface IState {
	editItemIndex: number;
}

class List extends React.Component<IListProps, IState> {
	public static defaultProps: IListProps = {
		editable: false,
		emptyMessage: 'The list is empty',
		mutable: false,
		ordered: false,
		showEmptyListMessage: false,
		values: [],
	};

	public state = {
		editItemIndex: null,
	};

	private handleListItemClick = (index, ev) => {
		this.setState({
			editItemIndex: index,
		});

		if (this.props.onClick) {
			this.props.onClick(index, ev);
		}
	};

	private handleListItemChange = (index, newValue) => {
		this.setState({ editItemIndex: null });

		this.props.values[index] = newValue;
		this.props.onChange(this.props.values);
	};

	private handleListItemRemove = (index) => {
		this.setState({ editItemIndex: null });

		this.props.values.splice(index, 1);
		this.props.onChange(this.props.values);
	};

	public render() {
		const { editable, emptyMessage, mutable, ordered, showEmptyListMessage, values } = this.props;

		const listItems = values.map((item, index) =>
			<ListItem
				active={this.state.editItemIndex === index}
				editable={editable}
				index={index}
				key={index}
				mutable={mutable}
				onCancel={() => this.setState({ editItemIndex: null })}
				onChange={this.handleListItemChange}
				onClick={this.handleListItemClick}
				onRemove={this.handleListItemRemove}
				value={castKeyValue(item)}
			/>
		);

		const list = ordered ?
			<ol>{listItems}</ol> :
			<ul>{listItems}</ul>;

		const emptyListMessage = (
			<span className="hire-empty-list">
				{emptyMessage}
			</span>
		);

		return (
			<div
				className={cx(
					'hire-forms-list',
					{ mutable, editable }
				)}
			>
				{ listItems.length ? list : (showEmptyListMessage ? emptyListMessage : null) }
			</div>
		);
	}
}

// List.propTypes = {
// 	editable: React.PropTypes.bool,
// 	emptyMessage: React.PropTypes.string,
// 	mutable: React.PropTypes.bool,
// 	onChange: React.PropTypes.func,
// 	onClick: React.PropTypes.func,
// 	options: arrayOfStringsOrArrayOfKeyValueMaps,
// 	ordered: React.PropTypes.bool,
// 	values: arrayOfStringsOrArrayOfKeyValueMaps,
// };

export default List;

