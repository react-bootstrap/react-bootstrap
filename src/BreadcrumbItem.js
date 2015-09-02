import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import SafeAnchor from './SafeAnchor';
import warning from 'react/lib/warning';

const BreadcrumbItem = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    id: React.PropTypes.string,
    active: React.PropTypes.bool,
    linkId: React.PropTypes.string,
    href: React.PropTypes.string,
    title: React.PropTypes.node,
    target: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      active: false,
    };
  },

  render() {
    warning(!(this.props.href && this.props.active), '[react-bootstrap] href and active properties cannot be set at the same time');

    const {
      id,
      active,
      linkId,
      children,
      href,
      title,
      target,
      ...props } = this.props;
    const classes = { active };
    const linkProps = {
      href,
      title,
      target,
      id: linkId
    };

    return (
      <li id={id} className={classNames(props.className, classes)}>
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
