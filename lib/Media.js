'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MediaHeading = require('./MediaHeading');

var _MediaHeading2 = _interopRequireDefault(_MediaHeading);

var _MediaBody = require('./MediaBody');

var _MediaBody2 = _interopRequireDefault(_MediaBody);

var _MediaLeft = require('./MediaLeft');

var _MediaLeft2 = _interopRequireDefault(_MediaLeft);

var _MediaRight = require('./MediaRight');

var _MediaRight2 = _interopRequireDefault(_MediaRight);

var _MediaList = require('./MediaList');

var _MediaList2 = _interopRequireDefault(_MediaList);

var _MediaListItem = require('./MediaListItem');

var _MediaListItem2 = _interopRequireDefault(_MediaListItem);

var Media = _react2['default'].createClass({
  displayName: 'Media',
  propTypes: {
    /**
     * You can use a custom element for the media container
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var _props = this.props;
    var ComponentClass = _props.componentClass;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['componentClass', 'className']);

    return _react2['default'].createElement(ComponentClass, _extends({}, props, { className: _classnames2['default'](className, 'media') }));
  }
});

Media = _Object$assign(Media, { Heading: _MediaHeading2['default'], Body: _MediaBody2['default'], Left: _MediaLeft2['default'], Right: _MediaRight2['default'], List: _MediaList2['default'], ListItem: _MediaListItem2['default'] });

exports['default'] = Media;
module.exports = exports['default'];