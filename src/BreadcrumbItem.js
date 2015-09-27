import React from 'react';
import classNames from 'classnames';
import SafeAnchor from './SafeAnchor';
import warning from 'react/lib/warning';

const BreadcrumbItem = React.createClass({
  propTypes: {
    /**
     * If set to true, renders `span` instead of `a`
     */
    active: React.PropTypes.bool,
    /**
     * HTML id for the wrapper `li` element
     */
    id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    /**
     * HTML id for the inner `a` element
     */
    linkId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
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
    target: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      active: false,
    };
  },

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

    warning(!(href && active), '[react-bootstrap] `href` and `active` properties cannot be set at the same time');

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
});

export default BreadcrumbItem;
