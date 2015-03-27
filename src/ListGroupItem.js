import React, { cloneElement } from 'react';
import BootstrapMixin from './BootstrapMixin';
import classSet from 'classnames';


const ListGroupItem = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    bsStyle: React.PropTypes.oneOf(['danger', 'info', 'success', 'warning']),
    active: React.PropTypes.any,
    disabled: React.PropTypes.any,
    header: React.PropTypes.node,
    onClick: React.PropTypes.func,
    eventKey: React.PropTypes.any,
    href: React.PropTypes.string,
    target: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      bsClass: 'list-group-item'
    };
  },

  render() {
    let classes = this.getBsClassSet();

    classes.active = this.props.active;
    classes.disabled = this.props.disabled;

    if (this.props.href || this.props.target || this.props.onClick) {
      return this.renderAnchor(classes);
    } else {
      return this.renderSpan(classes);
    }
  },

  renderSpan(classes) {
    return (
      <span {...this.props} className={classSet(this.props.className, classes)}>
        {this.props.header ? this.renderStructuredContent() : this.props.children}
      </span>
    );
  },

  renderAnchor(classes) {
    return (
      <a
        {...this.props}
        className={classSet(this.props.className, classes)}
      >
        {this.props.header ? this.renderStructuredContent() : this.props.children}
      </a>
    );
  },

  renderStructuredContent() {
    let header;
    if (React.isValidElement(this.props.header)) {
      header = cloneElement(this.props.header, {
        key: 'header',
        className: classSet(this.props.header.props.className, 'list-group-item-heading')
      });
    } else {
      header = (
        <h4 key='header' className="list-group-item-heading">
          {this.props.header}
        </h4>
      );
    }

    let content = (
      <p key='content' className="list-group-item-text">
        {this.props.children}
      </p>
    );

    return [header, content];
  }
});

export default ListGroupItem;
