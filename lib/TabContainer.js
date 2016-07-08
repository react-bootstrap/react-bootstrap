'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var idPropType = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]);

var TabContainer = _react2['default'].createClass({
  displayName: 'TabContainer',

  propTypes: {
    /**
     * HTML id attribute, required if no `generateChildId` prop
     * is specified.
     */
    id: function id(props) {
      var error = null;

      if (!props.generateChildId) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        error = idPropType.apply(undefined, [props].concat(args));

        if (!error && !props.id) {
          error = new Error('In order to properly initialize Tabs in a way that is accessible to assistive technologies ' + '(such as screen readers) an `id` or a `generateChildId` prop to TabContainer is required');
        }
      }
      return error;
    },

    /**
     * A function that takes an eventKey and type and returns a
     * unique id for child tab NavItems and TabPanes. The function _must_ be a pure function,
     * meaning it should always return the _same_ id for the same set of inputs. The default
     * value requires that an `id` to be set for the TabContainer.
     *
     * The `type` argument will either be `"tab"` or `"pane"`.
     *
     * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
     */
    generateChildId: _react.PropTypes.func,

    /**
     * A callback fired when a tab is selected.
     *
     * @controllable activeKey
     */
    onSelect: _react.PropTypes.func,

    /**
     * The `eventKey` of the currently active tab.
     *
     * @controllable onSelect
     */
    activeKey: _react.PropTypes.any
  },

  childContextTypes: {
    $bs_tabcontainer: _react2['default'].PropTypes.shape({
      activeKey: _react.PropTypes.any,
      onSelect: _react.PropTypes.func,
      getId: _react.PropTypes.func
    })
  },

  getChildContext: function getChildContext() {
    var _props = this.props;
    var activeKey = _props.activeKey;
    var onSelect = _props.onSelect;
    var generateChildId = _props.generateChildId;
    var id = _props.id;

    return {
      $bs_tabcontainer: {
        activeKey: activeKey,
        onSelect: onSelect,
        getId: generateChildId || function (key, type) {
          return id ? id + '-' + type + '-' + key : null;
        }
      }
    };
  },

  render: function render() {
    var _props2 = this.props;
    var children = _props2.children;

    var props = _objectWithoutProperties(_props2, ['children']);

    delete props.generateChildId;
    delete props.onSelect;
    delete props.activeKey;

    return _react2['default'].cloneElement(_react2['default'].Children.only(children), props);
  }
});

exports['default'] = _uncontrollable2['default'](TabContainer, { activeKey: 'onSelect' });
module.exports = exports['default'];