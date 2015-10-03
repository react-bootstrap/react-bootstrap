import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import PaginationButton from './PaginationButton';
import CustomPropTypes from './utils/CustomPropTypes';
import SafeAnchor from './SafeAnchor';

const Pagination = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    activePage: React.PropTypes.number,
    items: React.PropTypes.number,
    maxButtons: React.PropTypes.number,
    ellipsis: React.PropTypes.bool,
    first: React.PropTypes.bool,
    last: React.PropTypes.bool,
    prev: React.PropTypes.bool,
    next: React.PropTypes.bool,
    firstLabel: React.PropTypes.node,
    lastLabel: React.PropTypes.node,
    prevLabel: React.PropTypes.node,
    nextLabel: React.PropTypes.node,
    ellipsisLabel: React.PropTypes.node,
    onSelect: React.PropTypes.func,
    /**
     * You can use a custom element for the buttons
     */
    buttonComponentClass: CustomPropTypes.elementType
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
      firstLabel: '\u00ab',
      lastLabel: '\u00bb',
      prevLabel: '\u2039',
      nextLabel: '\u203a',
      ellipsisLabel: '...',
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
      buttonComponentClass
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

    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
      pageButtons.push(
        <PaginationButton
          key="ellipsis"
          disabled
          buttonComponentClass={buttonComponentClass}>
          <span aria-label="More">{this.props.ellipsisLabel}</span>
        </PaginationButton>
      );
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
        <span aria-label="Previous">{this.props.prevLabel}</span>
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
        <span aria-label="Next">{this.props.nextLabel}</span>
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
        <span aria-label="First">{this.props.firstLabel}</span>
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
        <span aria-label="Last">{this.props.lastLabel}</span>
      </PaginationButton>
    );
  },

  render() {
    return (
      <ul
        {...this.props}
        className={classNames(this.props.className, this.getBsClassSet())}>
        {this.renderFirst()}
        {this.renderPrev()}
        {this.renderPageButtons()}
        {this.renderNext()}
        {this.renderLast()}
      </ul>
    );
  }
});

export default Pagination;
