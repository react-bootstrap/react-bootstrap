import React, { cloneElement } from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import ValidComponentChildren from './utils/ValidComponentChildren';

const Breadcrumb = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps() {
    return {
      bsClass: 'breadcrumb'
    };
  },

  render() {
    const classes = this.getBsClassSet();
    const { className, ...props } = this.props;

    return (
      <ol {...props} role="navigation" aria-label="breadcrumbs" className={classNames(className, classes)}>
        {ValidComponentChildren.map(this.props.children, this.renderBreadcrumbItem)}
      </ol>
    );
  },

  renderBreadcrumbItem(child, index) {
    return cloneElement(
      child,
      {
        key: child.key ? child.key : index,
        navItem: true
      }
    );
  }
});

export default Breadcrumb;
