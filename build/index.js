(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HireFormsMutableList = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = _dereq_("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var Input = _react2["default"].createClass({
	displayName: "Input",

	propTypes: {
		onChange: _react2["default"].PropTypes.func,
		onInvalid: _react2["default"].PropTypes.func,
		onKeyDown: _react2["default"].PropTypes.func,
		onKeyUp: _react2["default"].PropTypes.func,
		placeholder: _react2["default"].PropTypes.string,
		style: _react2["default"].PropTypes.object,
		valid: _react2["default"].PropTypes.bool,
		validate: _react2["default"].PropTypes.func,
		value: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.number])
	},

	getDefaultProps: function getDefaultProps() {
		return {
			value: ""
		};
	},

	getInitialState: function getInitialState() {
		return {
			focus: false,
			valid: true
		};
	},

	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (this.props.value === nextProps.value) {
			return;
		}

		if (nextProps.value === "") {
			if (!this.state.valid) {
				this.setState({ valid: true });
			}

			return;
		}

		if (this.props.validate) {
			var valid = this.props.validate(nextProps.value);

			this.setState({ valid: valid });

			if (!valid && this.props.onInvalid) {
				this.props.onInvalid(nextProps.value);
			}
		}
	},

	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		var propsValueChange = this.props.value !== nextProps.value;
		var stateFocusChange = this.state.focus !== nextState.focus;

		return propsValueChange || stateFocusChange;
	},

	toggleFocus: function toggleFocus() {
		this.setState({ focus: !this.state.focus });
	},

	handleKeyDown: function handleKeyDown(ev) {
		if (this.props.onKeyDown) {
			this.props.onKeyDown(ev);
		}
	},

	handleKeyUp: function handleKeyUp(ev) {
		if (this.props.onKeyUp) {
			this.props.onKeyUp(ev);
		}
	},

	handleChange: function handleChange(ev) {
		this.props.onChange(ev.currentTarget.value, ev);
	},

	render: function render() {
		return _react2["default"].createElement("input", {
			className: (0, _classnames2["default"])("hire-input", { invalid: !this.state.valid }),
			onBlur: this.toggleFocus,
			onChange: this.handleChange,
			onFocus: this.toggleFocus,
			onKeyDown: this.handleKeyDown,
			onKeyUp: this.handleKeyUp,
			placeholder: this.props.placeholder,
			style: this.props.style,
			value: this.props.value });
	}
});

exports["default"] = Input;
module.exports = exports["default"];

},{"classnames":"classnames","react":"react"}],2:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _listItem = _dereq_("./list-item");

var _listItem2 = _interopRequireDefault(_listItem);

var List = (function (_React$Component) {
	function List(props) {
		_classCallCheck(this, List);

		_get(Object.getPrototypeOf(List.prototype), "constructor", this).call(this, props);

		this.state = { editItemIndex: null };
	}

	_inherits(List, _React$Component);

	_createClass(List, [{
		key: "handleListItemClick",
		value: function handleListItemClick(index, ev) {
			this.setState({ editItemIndex: index });

			if (this.props.onClick) {
				this.props.onClick(index, ev);
			}
		}
	}, {
		key: "handleListItemCancel",
		value: function handleListItemCancel() {
			this.setState({ editItemIndex: null });
		}
	}, {
		key: "handleListItemChange",
		value: function handleListItemChange(index, newValue) {
			this.setState({ editItemIndex: null });

			this.props.values[index] = newValue;
			this.props.onChange(this.props.values);
		}
	}, {
		key: "handleListItemRemove",
		value: function handleListItemRemove(index) {
			this.setState({ editItemIndex: null });

			this.props.values.splice(index, 1);
			this.props.onChange(this.props.values);
		}
	}, {
		key: "render",
		value: function render() {
			var _this = this;

			var list = this.props.values.map(function (item, index) {
				return _react2["default"].createElement(_listItem2["default"], {
					active: _this.state.editItemIndex === index,
					editable: _this.props.editable,
					key: index,
					onCancel: _this.handleListItemCancel.bind(_this, index),
					onChange: _this.handleListItemChange.bind(_this, index),
					onClick: _this.handleListItemClick.bind(_this, index),
					onRemove: _this.handleListItemRemove.bind(_this, index),
					removable: _this.props.removable,
					value: item });
			});

			list = list.length ? this.props.ordered ? _react2["default"].createElement(
				"ol",
				null,
				list
			) : _react2["default"].createElement(
				"ul",
				null,
				list
			) : _react2["default"].createElement(
				"span",
				{ className: "hire-empty-list" },
				"The list is empty"
			);

			return _react2["default"].createElement(
				"div",
				{ className: "hire-list" },
				list
			);
		}
	}]);

	return List;
})(_react2["default"].Component);

List.defaultProps = {
	editable: false,
	ordered: false,
	removable: true,
	values: []
};

List.propTypes = {
	editable: _react2["default"].PropTypes.bool,
	onChange: _react2["default"].PropTypes.func,
	onClick: _react2["default"].PropTypes.func,
	options: _react2["default"].PropTypes.array,
	ordered: _react2["default"].PropTypes.bool,
	removable: _react2["default"].PropTypes.bool,
	values: _react2["default"].PropTypes.array
};

exports["default"] = List;
module.exports = exports["default"];

},{"./list-item":3,"react":"react"}],3:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

// TODO merge with static-list/list-item?
// TODO move css to default css file

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = _dereq_("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _hireFormsInput = _dereq_("hire-forms-input");

var _hireFormsInput2 = _interopRequireDefault(_hireFormsInput);

var ext = function ext() {
	for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
		styles[_key] = arguments[_key];
	}

	return _extends.apply(undefined, [{}].concat(styles));
};

var liStyle = {
	cursor: "pointer"
};

var inputStyle = {
	width: "90%"
};

var buttonStyle = {
	width: "10%"
};

var spanStyle = {
	width: "90%"
};

var inlineBlockStyle = {
	display: "inline-block",
	boxSizing: "border-box",
	verticalAlign: "top"
};

var ListItem = (function (_React$Component) {
	function ListItem(props) {
		_classCallCheck(this, ListItem);

		_get(Object.getPrototypeOf(ListItem.prototype), "constructor", this).call(this, props);

		this.state = { value: props.value };
	}

	_inherits(ListItem, _React$Component);

	_createClass(ListItem, [{
		key: "componentWillUpdate",
		value: function componentWillUpdate(nextProps, nextState) {
			if (!nextProps.active) {
				nextState.value = nextProps.value;
			}
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			if (this.props.active && this.props.editable) {
				var node = _react2["default"].findDOMNode(this.refs.input);
				node.focus();
				node.value = node.value;
			}
		}
	}, {
		key: "onInputChange",
		value: function onInputChange(value) {
			this.setState({ value: value });
		}
	}, {
		key: "onInputKeyDown",
		value: function onInputKeyDown(ev) {
			// if keyCode is "enter" or "tab"
			if (ev.keyCode === 13 || ev.keyCode === 9) {
				if (this.state.value === this.props.value) {
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
	}, {
		key: "render",
		value: function render() {
			var remove = undefined;

			var input = _react2["default"].createElement(_hireFormsInput2["default"], {
				onChange: this.onInputChange.bind(this),
				onKeyDown: this.onInputKeyDown.bind(this),
				ref: "input",
				style: ext(inlineBlockStyle, inputStyle),
				value: this.state.value });

			var span = _react2["default"].createElement(
				"span",
				{
					className: "value",
					onClick: this.props.onClick.bind(this),
					style: ext(inlineBlockStyle, spanStyle) },
				this.props.value
			);

			var el = this.props.active && this.props.editable ? input : span;

			if (this.props.active && this.props.removable) {
				remove = _react2["default"].createElement(
					"button",
					{
						className: "remove",
						onClick: this.props.onRemove,
						style: ext(inlineBlockStyle, buttonStyle) },
					"x"
				);
			}

			return _react2["default"].createElement(
				"li",
				{
					className: (0, _classnames2["default"])("hire-list", { active: this.props.active }),
					style: liStyle },
				el,
				remove
			);
		}
	}]);

	return ListItem;
})(_react2["default"].Component);

ListItem.defaultProps = {
	active: false,
	editable: false,
	removable: true
};

ListItem.propTypes = {
	active: _react2["default"].PropTypes.bool,
	editable: _react2["default"].PropTypes.bool,
	onCancel: _react2["default"].PropTypes.func,
	onChange: _react2["default"].PropTypes.func,
	onClick: _react2["default"].PropTypes.func,
	onRemove: _react2["default"].PropTypes.func,
	removable: _react2["default"].PropTypes.bool,
	value: _react2["default"].PropTypes.string
};

exports["default"] = ListItem;
module.exports = exports["default"];

},{"classnames":"classnames","hire-forms-input":1,"react":"react"}]},{},[2])(2)
});
