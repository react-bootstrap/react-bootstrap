import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import SafeAnchor from './SafeAnchor';

class BreadcrumbItem extends React.Component {
  static propTypes = {
    /**
     * If set to true, renders `span` instead of `a`
     */
    active: PropTypes.bool,
    /**
     * HTML id for the wrapper `li` element
     */
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /**
     * HTML id for the inner `a` element
     */
    linkId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
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
    target: PropTypes.string
  };

  static defaultProps = {
    active: false,
  };

  render() {
    const {
      active,
      className,
      id,
      linkId,
      children,
      href,
      title,
      target,
      ...props } = this.props;

    const linkProps = {
      href,
      title,
      target,
      id: linkId
    };

    return (
      <li id={id} className={classNames(className, { active })}>
        {
          active ?
            <span {...props}>
              { children }
            </span> :
            <SafeAnchor {...props} {...linkProps}>
              { children }
            </SafeAnchor>
        }
      </li>
    );
  }
}

export default BreadcrumbItem;
