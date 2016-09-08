import classNames from 'classnames';
import React from 'react';

import SafeAnchor from './SafeAnchor';

const propTypes = {
  /**
   * If set to true, renders `span` instead of `a`
   */
  active: React.PropTypes.bool,
  /**
   * `href` attribute for the inner `a` element
   */
  href: React.PropTypes.string,
  /**
   * `title` attribute for the inner `a` element
   */
  title: React.PropTypes.node,
  /**
   * `target` attribute for the inner `a` element
   */
  target: React.PropTypes.string,
};

const defaultProps = {
  active: false,
};

class BreadcrumbItem extends React.Component {
  render() {
    const { active, href, title, target, className, ...props } = this.props;

    // Don't try to render these props on non-active <span>.
    const linkProps = { href, title, target };

    return (
      <li className={classNames(className, { active })}>
        {active ?
          <span {...props} /> :
          <SafeAnchor {...props} {...linkProps} />
        }
      </li>
    );
  }
}

BreadcrumbItem.propTypes = propTypes;
BreadcrumbItem.defaultProps = defaultProps;

export default BreadcrumbItem;
