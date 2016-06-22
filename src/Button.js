import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import { Sizes, State, DEFAULT, PRIMARY, LINK } from './styleMaps';
import {
  bsStyles, bsSizes, bsClass, getClassSet, prefix,
} from './utils/bootstrapUtils';

import SafeAnchor from './SafeAnchor';

const ButtonStyles = State.values().concat(DEFAULT, PRIMARY, LINK);

const types = ['button', 'reset', 'submit'];

class Button extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let classes = this.props.navDropdown ? {} : getClassSet(this.props);
    let renderFuncName;

    let blockClass = prefix(this.props, 'block');

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
  }

  renderAnchor(classes) {
    let { disabled, href } = this.props;

    classes.disabled = disabled;

    return (
      <SafeAnchor
        {...this.props}
        href={href || '#'}
        className={classNames(this.props.className, classes)}
      >
        {this.props.children}
      </SafeAnchor>
    );
  }

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
  }

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
}

Button.propTypes = {
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  block: React.PropTypes.bool,
  navItem: React.PropTypes.bool,
  navDropdown: React.PropTypes.bool,
  onClick: React.PropTypes.func,
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
};

Button.defaultProps = {
  active: false,
  block: false,
  disabled: false,
  navItem: false,
  navDropdown: false
};

Button.types = types;

export default bsStyles(ButtonStyles, DEFAULT,
  bsSizes([Sizes.LARGE, Sizes.SMALL, Sizes.XSMALL],
    bsClass('btn', Button)
  )
);
