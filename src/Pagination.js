import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import PaginationButton from './PaginationButton';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  activePage: PropTypes.number,
  items: PropTypes.number,
  maxButtons: PropTypes.number,

  /**
   * When `true`, will display the first and the last button page when
   * displaying ellipsis.
   */
  boundaryLinks: PropTypes.bool,

  /**
   * When `true`, will display the default node value ('&hellip;').
   * Otherwise, will display provided node (when specified).
   */
  ellipsis: PropTypes.oneOfType([
    PropTypes.bool, PropTypes.node,
  ]),

  /**
   * When `true`, will display the default node value ('&laquo;').
   * Otherwise, will display provided node (when specified).
   */
  first: PropTypes.oneOfType([
    PropTypes.bool, PropTypes.node,
  ]),

  /**
   * When `true`, will display the default node value ('&raquo;').
   * Otherwise, will display provided node (when specified).
   */
  last: PropTypes.oneOfType([
    PropTypes.bool, PropTypes.node,
  ]),

  /**
   * When `true`, will display the default node value ('&lsaquo;').
   * Otherwise, will display provided node (when specified).
   */
  prev: PropTypes.oneOfType([
    PropTypes.bool, PropTypes.node,
  ]),

  /**
   * When `true`, will display the default node value ('&rsaquo;').
   * Otherwise, will display provided node (when specified).
   */
  next: PropTypes.oneOfType([
    PropTypes.bool, PropTypes.node,
  ]),

  onSelect: PropTypes.func,

  /**
   * You can use a custom element for the buttons
   */
  buttonComponentClass: elementType,
};

const defaultProps = {
  activePage: 1,
  items: 1,
  maxButtons: 0,
  first: false,
  last: false,
  prev: false,
  next: false,
  ellipsis: true,
  boundaryLinks: false,
};

class Pagination extends React.Component {
  renderPageButtons(
    activePage, items, maxButtons, boundaryLinks, ellipsis, buttonProps
  ) {
    const pageButtons = [];

    let startPage;
    let endPage;

    if (maxButtons && maxButtons < items) {
      startPage = Math.max(
        Math.min(
          activePage - Math.floor(maxButtons / 2, 10),
          items - maxButtons + 1
        ),
        1
      );
      endPage = startPage + maxButtons - 1;
    } else {
      startPage = 1;
      endPage = items;
    }

    for (let page = startPage; page <= endPage; ++page) {
      pageButtons.push(
        <PaginationButton
          {...buttonProps}
          key={page}
          eventKey={page}
          active={page === activePage}
        >
          {page}
        </PaginationButton>
      );
    }

    if (ellipsis && boundaryLinks && startPage > 1) {
      if (startPage > 2) {
        pageButtons.unshift(
          <PaginationButton
            key="ellipsisFirst"
            disabled
            componentClass={buttonProps.componentClass}
          >
            <span aria-label="More">
              {ellipsis === true ? '\u2026' : ellipsis}
            </span>
          </PaginationButton>
        );
      }

      pageButtons.unshift(
        <PaginationButton
          {...buttonProps}
          key={1}
          eventKey={1}
          active={false}
        >
          1
        </PaginationButton>
      );
    }

    if (ellipsis && endPage < items) {
      if (!boundaryLinks || endPage < items - 1) {
        pageButtons.push(
          <PaginationButton
            key="ellipsis"
            disabled
            componentClass={buttonProps.componentClass}
          >
            <span aria-label="More">
              {ellipsis === true ? '\u2026' : ellipsis}
            </span>
          </PaginationButton>
        );
      }

      if (boundaryLinks) {
        pageButtons.push(
          <PaginationButton
            {...buttonProps}
            key={items}
            eventKey={items}
            active={false}
          >
            {items}
          </PaginationButton>
        );
      }
    }

    return pageButtons;
  }

  render() {
    const {
      activePage,
      items,
      maxButtons,
      boundaryLinks,
      ellipsis,
      first,
      last,
      prev,
      next,
      onSelect,
      buttonComponentClass,
      className,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    const buttonProps = {
      onSelect,
      componentClass: buttonComponentClass,
    };

    return (
      <ul
        {...elementProps}
        className={classNames(className, classes)}
      >
        {first && (
          <PaginationButton
            {...buttonProps}
            eventKey={1}
            disabled={activePage === 1}
          >
            <span aria-label="First">
              {first === true ? '\u00ab' : first}
            </span>
          </PaginationButton>
        )}
        {prev && (
          <PaginationButton
            {...buttonProps}
            eventKey={activePage - 1}
            disabled={activePage === 1}
          >
            <span aria-label="Previous">
              {prev === true ? '\u2039' : prev}
            </span>
          </PaginationButton>
        )}

        {this.renderPageButtons(
          activePage, items, maxButtons, boundaryLinks, ellipsis, buttonProps
        )}

        {next && (
          <PaginationButton
            {...buttonProps}
            eventKey={activePage + 1}
            disabled={activePage >= items}
          >
            <span aria-label="Next">
              {next === true ? '\u203a' : next}
            </span>
          </PaginationButton>
        )}
        {last && (
          <PaginationButton
            {...buttonProps}
            eventKey={items}
            disabled={activePage >= items}
          >
            <span aria-label="Last">
              {last === true ? '\u00bb' : last}
            </span>
          </PaginationButton>
        )}
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default bsClass('pagination', Pagination);
