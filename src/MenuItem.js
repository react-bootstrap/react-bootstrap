import classnames from 'classnames';
import React from 'react';
import all from 'react-prop-types/lib/all';

import { bsClass, prefix } from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';

import SafeAnchor from './SafeAnchor';

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
      this.props.onSelect(this.props.eventKey, event);
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
      const headerClass = prefix(this.props, 'header');

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

    delete props.onSelect;

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
  active: React.PropTypes.bool,

  /**
   * Disable the menu item, making it unselectable.
   */
  disabled: React.PropTypes.bool,

  /**
   * Styles the menu item as a horizontal rule, providing visual separation between
   * groups of menu items.
   */
  divider: all(
    React.PropTypes.bool,
    props => {
      if (props.divider && props.children) {
        return new Error('Children will not be rendered for dividers');
      }
    }
  ),

  /**
   * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
   */
  eventKey: React.PropTypes.any,

  /**
   * Styles the menu item as a header label, useful for describing a group of menu items.
   */
  header: React.PropTypes.bool,

  /**
   * HTML `href` attribute corresponding to `a.href`.
   */
  href: React.PropTypes.string,

  /**
   * HTML `target` attribute corresponding to `a.target`.
   */
  target: React.PropTypes.string,

  /**
   * HTML `title` attribute corresponding to `a.title`.
   */
  title: React.PropTypes.string,

  /**
   * Callback fired when the menu item is clicked.
   */
  onClick: React.PropTypes.func,

  onKeyDown: React.PropTypes.func,

  /**
   * Callback fired when the menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: React.PropTypes.func,

  /**
   * HTML `id` attribute.
   */
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

MenuItem.defaultProps = {
  divider: false,
  disabled: false,
  header: false
};

export default bsClass('dropdown', MenuItem);
