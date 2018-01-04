import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import {
  bsClass,
  bsStyles,
  getClassSet,
  prefix,
  splitBsProps
} from './utils/bootstrapUtils';
import { State } from './utils/StyleConfig';

const propTypes = {
  active: PropTypes.any,
  disabled: PropTypes.any,
  header: PropTypes.node,
  listItem: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
  type: PropTypes.string
};

const defaultProps = {
  listItem: false
};

class ListGroupItem extends React.Component {
  renderHeader(header, headingClassName) {
    if (React.isValidElement(header)) {
      return cloneElement(header, {
        className: classNames(header.props.className, headingClassName)
      });
    }

    return <h4 className={headingClassName}>{header}</h4>;
  }

  render() {
    const {
      active,
      disabled,
      className,
      header,
      listItem,
      children,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      active,
      disabled
    };

    let Component;

    if (elementProps.href) {
      Component = 'a';
    } else if (elementProps.onClick) {
      Component = 'button';
      elementProps.type = elementProps.type || 'button';
    } else if (listItem) {
      Component = 'li';
    } else {
      Component = 'span';
    }

    elementProps.className = classNames(className, classes);

    // TODO: Deprecate `header` prop.
    if (header) {
      return (
        <Component {...elementProps}>
          {this.renderHeader(header, prefix(bsProps, 'heading'))}

          <p className={prefix(bsProps, 'text')}>{children}</p>
        </Component>
      );
    }

    return <Component {...elementProps}>{children}</Component>;
  }
}

ListGroupItem.propTypes = propTypes;
ListGroupItem.defaultProps = defaultProps;

export default bsClass(
  'list-group-item',
  bsStyles(Object.values(State), ListGroupItem)
);
