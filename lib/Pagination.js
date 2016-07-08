'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _PaginationButton = require('./PaginationButton');

var _PaginationButton2 = _interopRequireDefault(_PaginationButton);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var Pagination = _react2['default'].createClass({
  displayName: 'Pagination',

  propTypes: {
    activePage: _react2['default'].PropTypes.number,
    items: _react2['default'].PropTypes.number,
    maxButtons: _react2['default'].PropTypes.number,
    /**
     * When `true`, will display the first and the last button page
     */
    boundaryLinks: _react2['default'].PropTypes.bool,
    /**
     * When `true`, will display the default node value ('&hellip;').
     * Otherwise, will display provided node (when specified).
     */
    ellipsis: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
    /**
     * When `true`, will display the default node value ('&laquo;').
     * Otherwise, will display provided node (when specified).
     */
    first: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
    /**
     * When `true`, will display the default node value ('&raquo;').
     * Otherwise, will display provided node (when specified).
     */
    last: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
    /**
     * When `true`, will display the default node value ('&lsaquo;').
     * Otherwise, will display provided node (when specified).
     */
    prev: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
    /**
     * When `true`, will display the default node value ('&rsaquo;').
     * Otherwise, will display provided node (when specified).
     */
    next: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
    onSelect: _react2['default'].PropTypes.func,
    /**
     * You can use a custom element for the buttons
     */
    buttonComponentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      activePage: 1,
      items: 1,
      maxButtons: 0,
      first: false,
      last: false,
      prev: false,
      next: false,
      ellipsis: true,
      boundaryLinks: false,
      buttonComponentClass: _SafeAnchor2['default'],
      bsClass: 'pagination'
    };
  },

  renderPageButtons: function renderPageButtons() {
    var pageButtons = [];
    var startPage = undefined,
        endPage = undefined,
        hasHiddenPagesAfter = undefined;
    var _props = this.props;
    var maxButtons = _props.maxButtons;
    var activePage = _props.activePage;
    var items = _props.items;
    var onSelect = _props.onSelect;
    var ellipsis = _props.ellipsis;
    var buttonComponentClass = _props.buttonComponentClass;
    var boundaryLinks = _props.boundaryLinks;

    if (maxButtons) {
      var hiddenPagesBefore = activePage - parseInt(maxButtons / 2, 10);
      startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
      hasHiddenPagesAfter = startPage + maxButtons <= items;

      if (!hasHiddenPagesAfter) {
        endPage = items;
        startPage = items - maxButtons + 1;
        if (startPage < 1) {
          startPage = 1;
        }
      } else {
        endPage = startPage + maxButtons - 1;
      }
    } else {
      startPage = 1;
      endPage = items;
    }

    for (var pagenumber = startPage; pagenumber <= endPage; pagenumber++) {
      pageButtons.push(_react2['default'].createElement(
        _PaginationButton2['default'],
        {
          key: pagenumber,
          eventKey: pagenumber,
          active: pagenumber === activePage,
          onSelect: onSelect,
          buttonComponentClass: buttonComponentClass
        },
        pagenumber
      ));
    }

    if (boundaryLinks && ellipsis && startPage !== 1) {
      pageButtons.unshift(_react2['default'].createElement(
        _PaginationButton2['default'],
        {
          key: 'ellipsisFirst',
          disabled: true,
          buttonComponentClass: buttonComponentClass
        },
        _react2['default'].createElement(
          'span',
          { 'aria-label': 'More' },
          this.props.ellipsis === true ? '…' : this.props.ellipsis
        )
      ));

      pageButtons.unshift(_react2['default'].createElement(
        _PaginationButton2['default'],
        {
          key: 1,
          eventKey: 1,
          active: false,
          onSelect: onSelect,
          buttonComponentClass: buttonComponentClass
        },
        '1'
      ));
    }

    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
      pageButtons.push(_react2['default'].createElement(
        _PaginationButton2['default'],
        {
          key: 'ellipsis',
          disabled: true,
          buttonComponentClass: buttonComponentClass
        },
        _react2['default'].createElement(
          'span',
          { 'aria-label': 'More' },
          this.props.ellipsis === true ? '…' : this.props.ellipsis
        )
      ));

      if (boundaryLinks && endPage !== items) {
        pageButtons.push(_react2['default'].createElement(
          _PaginationButton2['default'],
          {
            key: items,
            eventKey: items,
            active: false,
            onSelect: onSelect,
            buttonComponentClass: buttonComponentClass
          },
          items
        ));
      }
    }

    return pageButtons;
  },

  renderPrev: function renderPrev() {
    if (!this.props.prev) {
      return null;
    }

    return _react2['default'].createElement(
      _PaginationButton2['default'],
      {
        key: 'prev',
        eventKey: this.props.activePage - 1,
        disabled: this.props.activePage === 1,
        onSelect: this.props.onSelect,
        buttonComponentClass: this.props.buttonComponentClass
      },
      _react2['default'].createElement(
        'span',
        { 'aria-label': 'Previous' },
        this.props.prev === true ? '‹' : this.props.prev
      )
    );
  },

  renderNext: function renderNext() {
    if (!this.props.next) {
      return null;
    }

    return _react2['default'].createElement(
      _PaginationButton2['default'],
      {
        key: 'next',
        eventKey: this.props.activePage + 1,
        disabled: this.props.activePage >= this.props.items,
        onSelect: this.props.onSelect,
        buttonComponentClass: this.props.buttonComponentClass
      },
      _react2['default'].createElement(
        'span',
        { 'aria-label': 'Next' },
        this.props.next === true ? '›' : this.props.next
      )
    );
  },

  renderFirst: function renderFirst() {
    if (!this.props.first) {
      return null;
    }

    return _react2['default'].createElement(
      _PaginationButton2['default'],
      {
        key: 'first',
        eventKey: 1,
        disabled: this.props.activePage === 1,
        onSelect: this.props.onSelect,
        buttonComponentClass: this.props.buttonComponentClass
      },
      _react2['default'].createElement(
        'span',
        { 'aria-label': 'First' },
        this.props.first === true ? '«' : this.props.first
      )
    );
  },

  renderLast: function renderLast() {
    if (!this.props.last) {
      return null;
    }

    return _react2['default'].createElement(
      _PaginationButton2['default'],
      {
        key: 'last',
        eventKey: this.props.items,
        disabled: this.props.activePage >= this.props.items,
        onSelect: this.props.onSelect,
        buttonComponentClass: this.props.buttonComponentClass
      },
      _react2['default'].createElement(
        'span',
        { 'aria-label': 'Last' },
        this.props.last === true ? '»' : this.props.last
      )
    );
  },

  render: function render() {
    return _react2['default'].createElement(
      'ul',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, _utilsBootstrapUtils.getClassSet(this.props))
      }),
      this.renderFirst(),
      this.renderPrev(),
      this.renderPageButtons(),
      this.renderNext(),
      this.renderLast()
    );
  }
});

exports['default'] = _utilsBootstrapUtils.bsClass('pagination', Pagination);
module.exports = exports['default'];