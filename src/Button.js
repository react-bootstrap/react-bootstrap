import React from 'react';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

const types = ['button', 'reset', 'submit'];

import bootstrapUtils, { bsStyles, bsSizes, bsClass } from './utils/bootstrapUtils';
import { Sizes, State, DEFAULT, PRIMARY, LINK } from './styleMaps';

const ButtonStyles = State.values().concat(DEFAULT, PRIMARY, LINK);

let Button = React.createClass({

  propTypes: {
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    block: React.PropTypes.bool,
    navItem: React.PropTypes.bool,
    navDropdown: React.PropTypes.bool,
    /**
     * You can use a custom element for this component
     */
    componentClass: elementType,
    href: React.PropTypes.string,
    target: React.PropTypes.string,
    /**
     * Defines HTML button type Attribute
     * @type {("button"|"reset"|"submit")}
     * @defaultValue 'button'
     */
    type: React.PropTypes.oneOf(types)
  },

  getDefaultProps() {
    return {
      active: false,
      block: false,
      disabled: false,
      navItem: false,
      navDropdown: false
    };
  },

  render() {
    let classes = this.props.navDropdown ? {} : bootstrapUtils.getClassSet(this.props);
    let renderFuncName;

    let blockClass = bootstrapUtils.prefix(this.props, 'block');

    classes = {
      active: this.props.active,
      [blockClass]: this.props.block,
      ...classes
    };

    if (this.props.navItem) {
      return this.renderNavItem(classes);
    }

    renderFuncName = this.props.href || this.props.target || this.props.navDropdown ?
      'renderAnchor' : 'renderButton';

    return this[renderFuncName](classes);
  },

  renderAnchor(classes) {
    let Component = this.props.componentClass || 'a';
    let href = this.props.href || '#';
    classes.disabled = this.props.disabled;

    return (
      <Component
        {...this.props}
        href={href}
        className={classNames(this.props.className, classes)}
        role="button">
        {this.props.children}
      </Component>
    );
  },

  renderButton(classes) {
    let Component = this.props.componentClass || 'button';

    return (
      <Component
        {...this.props}
        type={this.props.type || 'button'}
        className={classNames(this.props.className, classes)}>
        {this.props.children}
      </Component>
    );
  },

  renderNavItem(classes) {
    let liClasses = {
      active: this.props.active
    };

    return (
      <li className={classNames(liClasses)}>
        {this.renderAnchor(classes)}
      </li>
    );
  }
});

Button.types = types;

export default bsStyles(ButtonStyles, DEFAULT,
  bsSizes([Sizes.LARGE, Sizes.SMALL, Sizes.XSMALL],
    bsClass('btn', Button)
  )
);
