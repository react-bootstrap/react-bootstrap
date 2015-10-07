import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import PaginationButton from './PaginationButton';
import elementType from 'react-prop-types/lib/elementType';
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
          <span aria-label="More">...</span>
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
        <span aria-label="Previous">&lsaquo;</span>
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
        <span aria-label="Next">&rsaquo;</span>
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
        <span aria-label="First">&laquo;</span>
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
        <span aria-label="Last">&raquo;</span>
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
