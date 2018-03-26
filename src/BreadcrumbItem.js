import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import SafeAnchor from './SafeAnchor';
import { createBootstrapComponent } from './ThemeProvider';

class BreadcrumbItem extends React.Component {
  static propTypes = {
    /**
     * @default 'breadcrumb-item'
     */
    bsPrefix: PropTypes.string,
    /**
     * Adds a visual "active" state to a Breadcrumb
     * Item and disables the link.
     */
    active: PropTypes.bool,
    /**
     * `href` attribute for the inner `a` element
     */
    href: PropTypes.string,
    /**
     * `title` attribute for the inner `a` element
     */
    title: PropTypes.node,
    /**
     * `target` attribute for the inner `a` element
     */
    target: PropTypes.string,

    componentClass: elementType
  };

  static defaultProps = {
    active: false,
    componentClass: 'li'
  };

  render() {
    const {
      bsPrefix,
      active,
      className,
      componentClass: Component,
      ...props
    } = this.props;

    const { href, title, target, ...elementProps } = props;
    const linkProps = { href, title, target };

    return (
      <Component
        className={classNames(bsPrefix, className, { active })}
        aria-current={active ? 'page' : undefined}
        {...elementProps}
      >
        {active ? (
          <span {...elementProps} className={classNames({ active })} />
        ) : (
          <SafeAnchor {...elementProps} {...linkProps} />
        )}
      </Component>
    );
  }
}

export default createBootstrapComponent(BreadcrumbItem, 'breadcrumb-item');
