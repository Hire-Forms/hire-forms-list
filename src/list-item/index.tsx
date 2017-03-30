// TODO merge with static-list/list-item?

import * as React from "react";
import * as cx from "classnames";
import Input from "hire-forms-input";
import {IKeyValue} from "../index";

interface IProps {
	active: boolean;
	editable: boolean;
	index?: number;
	mutable: boolean;
	onCancel?: () => void;
	onClick?: (index: number, event: React.MouseEvent<HTMLSpanElement>) => void;
	onChange?: (index: number, value: IKeyValue) => void;
	onRemove?: (index: number) => void;
	value?: IKeyValue;
}

interface IState {
	inputValue: string;
}

class ListItem extends React.Component<IProps, IState> {
	public state = {
		inputValue: this.props.value.value
	};

	public static defaultProps: IProps = {
		active: false,
		editable: false,
		mutable: false
	};

	private inputNode;

	public componentDidUpdate() {
		if (this.props.active && this.props.editable) {
			this.inputNode.focus();
			this.inputNode.value = this.inputNode.value;
		}
	}

	private onInputChange = (inputValue) =>
		this.setState({ inputValue });

	private onInputKeyDown = (ev) => {
		// if keyCode is "enter" or "tab"
		if (ev.keyCode === 13 || ev.keyCode === 9) {
			if (this.state.inputValue === this.props.value.value) {
				this.props.onCancel();
			} else {
				this.props.onChange(this.props.index, {
					...this.props.value,
					...{ value: this.state.inputValue }
				});
			}
		}

		// if keyCode is "escape"
		if (ev.keyCode === 27) {
			this.props.onCancel();
		}
	}

	public render() {
		const { active, editable, index, mutable, onClick, onRemove, value } = this.props;

		const el = (active && editable) ?
			<Input
				onChange={this.onInputChange}
				onKeyDown={this.onInputKeyDown}
				ref={(node) => {
					this.inputNode = node;
				}}
				value={this.state.inputValue}
			/> :
			<span
				className="value"
				onClick={(ev) => onClick(index, ev)}>
				{value.value}
			</span>;

		const remove = (mutable) ?
			<button
				className="remove"
				onClick={(ev) => onRemove(index)}>
				x
			</button> :
			null;

		return (
			<li className={cx('hire-forms-list-item', { active })}>
				{el}
				{remove}
			</li>
		);
	}
}

export default ListItem;
