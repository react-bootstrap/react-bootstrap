import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import { bsClass, prefix } from './utils/bootstrapUtils';

const propTypes = {
  horizontal: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  componentClass: elementType,
};

const defaultProps = {
  horizontal: false,
  inline: false,
  componentClass: 'form',
};

class Form extends React.Component {
  render() {
    const {
      horizontal, inline, componentClass: Component, className, ...props,
    } = this.props;

    delete props.bsClass;

    const classes = [];
    if (horizontal) {
      classes.push(prefix(this.props, 'horizontal'));
    }
    if (inline) {
      classes.push(prefix(this.props, 'inline'));
    }

    return (
      <Component {...props} className={classNames(className, classes)} />
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default bsClass('form', Form);
