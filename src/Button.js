import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import elementType from 'react-prop-types/lib/elementType';
import ButtonInput from './ButtonInput';

const Button = React.createClass({
  mixins: [BootstrapMixin],

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
    type: React.PropTypes.oneOf(ButtonInput.types)
  },

  getDefaultProps() {
    return {
      active: false,
      block: false,
      bsClass: 'button',
      bsStyle: 'default',
      disabled: false,
      navItem: false,
      navDropdown: false
    };
  },

  render() {
    let classes = this.props.navDropdown ? {} : this.getBsClassSet();
    let renderFuncName;

    classes = {
      active: this.props.active,
      'btn-block': this.props.block,
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

export default Button;
