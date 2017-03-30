"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const cx = require("classnames");
const list_item_1 = require("./list-item");
const hire_forms_utils_1 = require("hire-forms-utils");
class List extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            editItemIndex: null,
        };
        this.handleListItemClick = (index, ev) => {
            this.setState({
                editItemIndex: index,
            });
            if (this.props.onClick) {
                this.props.onClick(index, ev);
            }
        };
        this.handleListItemChange = (index, newValue) => {
            this.setState({ editItemIndex: null });
            this.props.values[index] = newValue;
            this.props.onChange(this.props.values);
        };
        this.handleListItemRemove = (index) => {
            this.setState({ editItemIndex: null });
            this.props.values.splice(index, 1);
            this.props.onChange(this.props.values);
        };
    }
    render() {
        const { editable, emptyMessage, mutable, ordered, showEmptyListMessage, values } = this.props;
        const listItems = values.map((item, index) => React.createElement(list_item_1.default, { active: this.state.editItemIndex === index, editable: editable, index: index, key: index, mutable: mutable, onCancel: () => this.setState({ editItemIndex: null }), onChange: this.handleListItemChange, onClick: this.handleListItemClick, onRemove: this.handleListItemRemove, value: hire_forms_utils_1.castKeyValue(item) }));
        const list = ordered ?
            React.createElement("ol", null, listItems) :
            React.createElement("ul", null, listItems);
        const emptyListMessage = (React.createElement("span", { className: "hire-empty-list" }, emptyMessage));
        return (React.createElement("div", { className: cx('hire-forms-list', { mutable, editable }) }, listItems.length ? list : (showEmptyListMessage ? emptyListMessage : null)));
    }
}
List.defaultProps = {
    editable: false,
    emptyMessage: 'The list is empty',
    mutable: false,
    ordered: false,
    showEmptyListMessage: false,
    values: [],
};
exports.default = List;
