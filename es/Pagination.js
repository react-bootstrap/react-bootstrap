import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import PaginationButton from './PaginationButton';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

var propTypes = {
  activePage: React.PropTypes.number,
  items: React.PropTypes.number,
  maxButtons: React.PropTypes.number,

  /**
   * When `true`, will display the first and the last button page
   */
  boundaryLinks: React.PropTypes.bool,

  /**
   * When `true`, will display the default node value ('&hellip;').
   * Otherwise, will display provided node (when specified).
   */
  ellipsis: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.node]),

  /**
   * When `true`, will display the default node value ('&laquo;').
   * Otherwise, will display provided node (when specified).
   */
  first: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.node]),

  /**
   * When `true`, will display the default node value ('&raquo;').
   * Otherwise, will display provided node (when specified).
   */
  last: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.node]),

  /**
   * When `true`, will display the default node value ('&lsaquo;').
   * Otherwise, will display provided node (when specified).
   */
  prev: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.node]),

  /**
   * When `true`, will display the default node value ('&rsaquo;').
   * Otherwise, will display provided node (when specified).
   */
  next: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.node]),

  onSelect: React.PropTypes.func,

  /**
   * You can use a custom element for the buttons
   */
  buttonComponentClass: elementType
};

var defaultProps = {
  activePage: 1,
  items: 1,
  maxButtons: 0,
  first: false,
  last: false,
  prev: false,
  next: false,
  ellipsis: true,
  boundaryLinks: false
};

var Pagination = function (_React$Component) {
  _inherits(Pagination, _React$Component);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Pagination.prototype.renderPageButtons = function renderPageButtons(activePage, items, maxButtons, boundaryLinks, ellipsis, buttonProps) {
    var pageButtons = [];

    var startPage = void 0;
    var endPage = void 0;
    var hasHiddenPagesAfter = void 0;

    if (maxButtons) {
      var hiddenPagesBefore = activePage - parseInt(maxButtons / 2, 10);
      startPage = Math.max(hiddenPagesBefore, 1);
      hasHiddenPagesAfter = items >= startPage + maxButtons;

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
      pageButtons.push(React.createElement(
        PaginationButton,
        _extends({}, buttonProps, {
          key: pagenumber,
          eventKey: pagenumber,
          active: pagenumber === activePage
        }),
        pagenumber
      ));
    }

    if (boundaryLinks && ellipsis && startPage !== 1) {
      pageButtons.unshift(React.createElement(
        PaginationButton,
        {
          key: 'ellipsisFirst',
          disabled: true,
          componentClass: buttonProps.componentClass
        },
        React.createElement(
          'span',
          { 'aria-label': 'More' },
          ellipsis === true ? '\u2026' : ellipsis
        )
      ));

      pageButtons.unshift(React.createElement(
        PaginationButton,
        _extends({}, buttonProps, {
          key: 1,
          eventKey: 1,
          active: false
        }),
        '1'
      ));
    }

    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
      pageButtons.push(React.createElement(
        PaginationButton,
        {
          key: 'ellipsis',
          disabled: true,
          componentClass: buttonProps.componentClass
        },
        React.createElement(
          'span',
          { 'aria-label': 'More' },
          ellipsis === true ? '\u2026' : ellipsis
        )
      ));

      if (boundaryLinks && endPage !== items) {
        pageButtons.push(React.createElement(
          PaginationButton,
          _extends({}, buttonProps, {
            key: items,
            eventKey: items,
            active: false
          }),
          items
        ));
      }
    }

    return pageButtons;
  };

  Pagination.prototype.render = function render() {
    var _props = this.props,
        activePage = _props.activePage,
        items = _props.items,
        maxButtons = _props.maxButtons,
        boundaryLinks = _props.boundaryLinks,
        ellipsis = _props.ellipsis,
        first = _props.first,
        last = _props.last,
        prev = _props.prev,
        next = _props.next,
        onSelect = _props.onSelect,
        buttonComponentClass = _props.buttonComponentClass,
        className = _props.className,
        props = _objectWithoutProperties(_props, ['activePage', 'items', 'maxButtons', 'boundaryLinks', 'ellipsis', 'first', 'last', 'prev', 'next', 'onSelect', 'buttonComponentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    var buttonProps = {
      onSelect: onSelect,
      componentClass: buttonComponentClass
    };

    return React.createElement(
      'ul',
      _extends({}, elementProps, {
        className: classNames(className, classes)
      }),
      first && React.createElement(
        PaginationButton,
        _extends({}, buttonProps, {
          eventKey: 1,
          disabled: activePage === 1
        }),
        React.createElement(
          'span',
          { 'aria-label': 'First' },
          first === true ? '\xAB' : first
        )
      ),
      prev && React.createElement(
        PaginationButton,
        _extends({}, buttonProps, {
          eventKey: activePage - 1,
          disabled: activePage === 1
        }),
        React.createElement(
          'span',
          { 'aria-label': 'Previous' },
          prev === true ? '\u2039' : prev
        )
      ),
      this.renderPageButtons(activePage, items, maxButtons, boundaryLinks, ellipsis, buttonProps),
      next && React.createElement(
        PaginationButton,
        _extends({}, buttonProps, {
          eventKey: activePage + 1,
          disabled: activePage >= items
        }),
        React.createElement(
          'span',
          { 'aria-label': 'Next' },
          next === true ? '\u203A' : next
        )
      ),
      last && React.createElement(
        PaginationButton,
        _extends({}, buttonProps, {
          eventKey: items,
          disabled: activePage >= items
        }),
        React.createElement(
          'span',
          { 'aria-label': 'Last' },
          last === true ? '\xBB' : last
        )
      )
    );
  };

  return Pagination;
}(React.Component);

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default bsClass('pagination', Pagination);