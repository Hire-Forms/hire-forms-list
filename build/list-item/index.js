"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const cx = require("classnames");
const hire_forms_input_1 = require("hire-forms-input");
class ListItem extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputValue: this.props.value.value
        };
        this.onInputChange = (inputValue) => this.setState({ inputValue });
        this.onInputKeyDown = (ev) => {
            if (ev.keyCode === 13 || ev.keyCode === 9) {
                if (this.state.inputValue === this.props.value.value) {
                    this.props.onCancel();
                }
                else {
                    this.props.onChange(this.props.index, Object.assign({}, this.props.value, { value: this.state.inputValue }));
                }
            }
            if (ev.keyCode === 27) {
                this.props.onCancel();
            }
        };
    }
    componentDidUpdate() {
        if (this.props.active && this.props.editable) {
            this.inputNode.focus();
            this.inputNode.value = this.inputNode.value;
        }
    }
    render() {
        const { active, editable, index, mutable, onClick, onRemove, value } = this.props;
        const el = (active && editable) ?
            React.createElement(hire_forms_input_1.default, { onChange: this.onInputChange, onKeyDown: this.onInputKeyDown, ref: (node) => {
                    this.inputNode = node;
                }, value: this.state.inputValue }) :
            React.createElement("span", { className: "value", onClick: (ev) => onClick(index, ev) }, value.value);
        const remove = (mutable) ?
            React.createElement("button", { className: "remove", onClick: (ev) => onRemove(index) }, "x") :
            null;
        return (React.createElement("li", { className: cx('hire-forms-list-item', { active }) },
            el,
            remove));
    }
}
ListItem.defaultProps = {
    active: false,
    editable: false,
    mutable: false
};
exports.default = ListItem;
