'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var ListGroup = (function (_React$Component) {
  function ListGroup() {
    _classCallCheck(this, ListGroup);

    _get(Object.getPrototypeOf(ListGroup.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(ListGroup, _React$Component);

  _createClass(ListGroup, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var items = _utilsValidComponentChildren2['default'].map(this.props.children, function (item, index) {
        return (0, _react.cloneElement)(item, { key: item.key ? item.key : index });
      });

      var childrenAnchors = false;

      if (!this.props.children) {
        return this.renderDiv(items);
      } else if (_react2['default'].Children.count(this.props.children) === 1 && !Array.isArray(this.props.children)) {
        var child = this.props.children;

        childrenAnchors = this.isAnchor(child.props);
      } else {

        childrenAnchors = Array.prototype.some.call(this.props.children, function (child) {
          return !Array.isArray(child) ? _this.isAnchor(child.props) : Array.prototype.some.call(child, function (subChild) {
            return _this.isAnchor(subChild.props);
          });
        });
      }

      if (childrenAnchors) {
        return this.renderDiv(items);
      } else {
        return this.renderUL(items);
      }
    }
  }, {
    key: 'isAnchor',
    value: function isAnchor(props) {
      return props.href || props.onClick;
    }
  }, {
    key: 'renderUL',
    value: function renderUL(items) {
      var listItems = _utilsValidComponentChildren2['default'].map(items, function (item, index) {
        return (0, _react.cloneElement)(item, { listItem: true });
      });

      return _react2['default'].createElement(
        'ul',
        _extends({}, this.props, {
          className: (0, _classnames2['default'])(this.props.className, 'list-group') }),
        listItems
      );
    }
  }, {
    key: 'renderDiv',
    value: function renderDiv(items) {
      return _react2['default'].createElement(
        'div',
        _extends({}, this.props, {
          className: (0, _classnames2['default'])(this.props.className, 'list-group') }),
        items
      );
    }
  }]);

  return ListGroup;
})(_react2['default'].Component);

ListGroup.propTypes = {
  className: _react2['default'].PropTypes.string,
  id: _react2['default'].PropTypes.string
};

exports['default'] = ListGroup;
module.exports = exports['default'];