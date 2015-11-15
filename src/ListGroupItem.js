import React, { cloneElement } from 'react';
import bootstrapUtils, { bsStyles, bsClass } from './utils/bootstrapUtils';
import { State } from './styleMaps';
import classNames from 'classnames';

class ListGroupItem extends React.Component {


  render() {
    let classes = bootstrapUtils.getClassSet(this.props);

    classes.active = this.props.active;
    classes.disabled = this.props.disabled;

    if (this.props.href) {
      return this.renderAnchor(classes);
    } else if (this.props.onClick) {
      return this.renderButton(classes);
    } else if (this.props.listItem) {
      return this.renderLi(classes);
    }

    return this.renderSpan(classes);
  }

  renderLi(classes) {
    return (
      <li
        {...this.props} className={classNames(this.props.className, classes)}>
        {this.props.header ? this.renderStructuredContent() : this.props.children}
      </li>
    );
  }

  renderAnchor(classes) {
    return (
      <a
        {...this.props}
        className={classNames(this.props.className, classes)}
      >
        {this.props.header ? this.renderStructuredContent() : this.props.children}
      </a>
    );
  }

  renderButton(classes) {
    return (
      <button
        type="button"
        {...this.props}
        className={classNames(this.props.className, classes)}>
        {this.props.header ? this.renderStructuredContent() : this.props.children}
      </button>
    );
  }

  renderSpan(classes) {
    return (
      <span
        {...this.props} className={classNames(this.props.className, classes)}>
        {this.props.header ? this.renderStructuredContent() : this.props.children}
      </span>
    );
  }

  renderStructuredContent() {
    let header;
    let headingClass = bootstrapUtils.prefix(this.props, 'heading');

    if (React.isValidElement(this.props.header)) {
      header = cloneElement(this.props.header, {
        key: 'header',
        className: classNames(this.props.header.props.className, headingClass)
      });
    } else {
      header = (
        <h4 key="header" className={headingClass}>
          {this.props.header}
        </h4>
      );
    }

    let content = (
      <p key="content" className={bootstrapUtils.prefix(this.props, 'text')}>
        {this.props.children}
      </p>
    );

    return [header, content];
  }
}

ListGroupItem.propTypes = {
  className: React.PropTypes.string,
  active: React.PropTypes.any,
  disabled: React.PropTypes.any,
  header: React.PropTypes.node,
  listItem: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  eventKey: React.PropTypes.any,
  href: React.PropTypes.string,
  target: React.PropTypes.string
};

ListGroupItem.defaultTypes = {
  listItem: false
};

export default bsStyles(State.values(),
  bsClass('list-group-item',
    ListGroupItem
  )
);
