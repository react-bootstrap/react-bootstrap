import React from 'react';
import classNames from 'classnames';
import bootstrapUtils, { bsClass } from './utils/bootstrapUtils';
import PaginationButton from './PaginationButton';
import elementType from 'react-prop-types/lib/elementType';
import SafeAnchor from './SafeAnchor';

const Pagination = React.createClass({

  propTypes: {
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
    ellipsis: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.node
    ]),
    /**
     * When `true`, will display the default node value ('&laquo;').
     * Otherwise, will display provided node (when specified).
     */
    first: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.node
    ]),
    /**
     * When `true`, will display the default node value ('&raquo;').
     * Otherwise, will display provided node (when specified).
     */
    last: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.node
    ]),
    /**
     * When `true`, will display the default node value ('&lsaquo;').
     * Otherwise, will display provided node (when specified).
     */
    prev: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.node
    ]),
    /**
     * When `true`, will display the default node value ('&rsaquo;').
     * Otherwise, will display provided node (when specified).
     */
    next: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.node
    ]),
    onSelect: React.PropTypes.func,
    /**
     * You can use a custom element for the buttons
     */
    buttonComponentClass: elementType
  },

  getDefaultProps() {
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
      buttonComponentClass: SafeAnchor,
      bsClass: 'pagination'
    };
  },

  renderPageButtons() {
    let pageButtons = [];
    let startPage, endPage, hasHiddenPagesAfter;
    let {
      maxButtons,
      activePage,
      items,
      onSelect,
      ellipsis,
      buttonComponentClass,
      boundaryLinks
    } = this.props;

    if (maxButtons) {
      let hiddenPagesBefore = activePage - parseInt(maxButtons / 2, 10);
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

    for (let pagenumber = startPage; pagenumber <= endPage; pagenumber++) {
      pageButtons.push(
        <PaginationButton
          key={pagenumber}
          eventKey={pagenumber}
          active={pagenumber === activePage}
          onSelect={onSelect}
          buttonComponentClass={buttonComponentClass}>
          {pagenumber}
        </PaginationButton>
      );
    }

    if (boundaryLinks && ellipsis && startPage !== 1) {
      pageButtons.unshift(
        <PaginationButton
          key="ellipsisFirst"
          disabled
          buttonComponentClass={buttonComponentClass}>
          <span aria-label="More">
            {this.props.ellipsis === true ? '\u2026' : this.props.ellipsis}
          </span>
        </PaginationButton>
      );

      pageButtons.unshift(
        <PaginationButton
          key={1}
          eventKey={1}
          active={false}
          onSelect={onSelect}
          buttonComponentClass={buttonComponentClass}>
          1
        </PaginationButton>
      );
    }

    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
      pageButtons.push(
        <PaginationButton
          key="ellipsis"
          disabled
          buttonComponentClass={buttonComponentClass}>
          <span aria-label="More">
            {this.props.ellipsis === true ? '\u2026' : this.props.ellipsis}
          </span>
        </PaginationButton>
      );

      if (boundaryLinks && endPage !== items) {
        pageButtons.push(
          <PaginationButton
              key={items}
              eventKey={items}
              active={false}
              onSelect={onSelect}
              buttonComponentClass={buttonComponentClass}>
              {items}
          </PaginationButton>
        );
      }
    }

    return pageButtons;
  },

  renderPrev() {
    if (!this.props.prev) {
      return null;
    }

    return (
      <PaginationButton
        key="prev"
        eventKey={this.props.activePage - 1}
        disabled={this.props.activePage === 1}
        onSelect={this.props.onSelect}
        buttonComponentClass={this.props.buttonComponentClass}>
        <span aria-label="Previous">
          {this.props.prev === true ? '\u2039' : this.props.prev}
        </span>
      </PaginationButton>
    );
  },

  renderNext() {
    if (!this.props.next) {
      return null;
    }

    return (
      <PaginationButton
        key="next"
        eventKey={this.props.activePage + 1}
        disabled={this.props.activePage >= this.props.items}
        onSelect={this.props.onSelect}
        buttonComponentClass={this.props.buttonComponentClass}>
        <span aria-label="Next">
          {this.props.next === true ? '\u203a' : this.props.next}
        </span>
      </PaginationButton>
    );
  },

  renderFirst() {
    if (!this.props.first) {
      return null;
    }

    return (
      <PaginationButton
        key="first"
        eventKey={1}
        disabled={this.props.activePage === 1 }
        onSelect={this.props.onSelect}
        buttonComponentClass={this.props.buttonComponentClass}>
        <span aria-label="First">
          {this.props.first === true ? '\u00ab' : this.props.first}
        </span>
      </PaginationButton>
    );
  },

  renderLast() {
    if (!this.props.last) {
      return null;
    }

    return (
      <PaginationButton
        key="last"
        eventKey={this.props.items}
        disabled={this.props.activePage >= this.props.items}
        onSelect={this.props.onSelect}
        buttonComponentClass={this.props.buttonComponentClass}>
        <span aria-label="Last">
          {this.props.last === true ? '\u00bb' : this.props.last}
        </span>
      </PaginationButton>
    );
  },

  render() {
    return (
      <ul
        {...this.props}
        className={classNames(this.props.className, bootstrapUtils.getClassSet(this.props))}>
        {this.renderFirst()}
        {this.renderPrev()}
        {this.renderPageButtons()}
        {this.renderNext()}
        {this.renderLast()}
      </ul>
    );
  }
});

export default bsClass('pagination', Pagination);
