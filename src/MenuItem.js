import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import bootstrapUtils, { bsClass } from './utils/bootstrapUtils';
import all from 'react-prop-types/lib/all';

import SafeAnchor from './SafeAnchor';
import createChainedFunction from './utils/createChainedFunction';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (!this.props.href || this.props.disabled) {
      event.preventDefault();
    }

    if (this.props.disabled) {
      return;
    }

    if (this.props.onSelect) {
      this.props.onSelect(event, this.props.eventKey);
    }
  }

  render() {
    if (this.props.divider) {
      return (
        <li
          role="separator"
          className={classnames('divider', this.props.className)}
          style={this.props.style}
        />
      );
    }

    if (this.props.header) {
      const headerClass = bootstrapUtils.prefix(this.props, 'header');

      return (
        <li
          role="heading"
          className={classnames(headerClass, this.props.className)}
          style={this.props.style}
        >
          {this.props.children}
        </li>
      );
    }

    const {className, style, onClick, ...props} = this.props;

    const classes = {
      disabled: this.props.disabled,
      active: this.props.active
    };

    return (
      <li role="presentation"
        className={classnames(className, classes)}
        style={style}
      >
        <SafeAnchor
          {...props}
          role="menuitem"
          tabIndex="-1"
          onClick={createChainedFunction(onClick, this.handleClick)}
        />
      </li>
    );
  }
}

MenuItem.propTypes = {

  /**
   * Highlight the menu item as active.
   */
  active: PropTypes.bool,

  /**
   * Disable the menu item, making it unselectable.
   */
  disabled: PropTypes.bool,

  /**
   * Styles the menu item as a horizontal rule, providing visual separation between
   * groups of menu items.
   */
  divider: all(
    PropTypes.bool,
    props => {
      if (props.divider && props.children) {
        return new Error('Children will not be rendered for dividers');
      }
    }
  ),

  /**
   * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
   */
  eventKey: PropTypes.any,

  /**
   * Styles the menu item as a header label, useful for describing a group of menu items.
   */
  header: PropTypes.bool,

  /**
   * HTML `href` attribute corresponding to `a.href`.
   */
  href: PropTypes.string,

  /**
   * HTML `target` attribute corresponding to `a.target`.
   */
  target: PropTypes.string,

  /**
   * HTML `title` attribute corresponding to `a.title`.
   */
  title: PropTypes.string,

  /**
   * Callback fired when the menu item is clicked.
   */
  onClick: PropTypes.func,

  onKeyDown: PropTypes.func,

  /**
   * Callback fired when the menu item is selected.
   *
   * ```js
   * function(Object event, Any eventKey)
   * ```
   */
  onSelect: PropTypes.func,

  /**
   * HTML `id` attribute.
   */
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

MenuItem.defaultProps = {
  divider: false,
  disabled: false,
  header: false
};

export default bsClass('dropdown', MenuItem);
