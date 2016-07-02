import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import { bsClass, getClassSet } from './utils/bootstrapUtils';

import ensureDomProps from './utils/ensureDomProps';

const propTypes = {
  componentClass: elementType,
};

const defaultProps = {
  componentClass: 'p',
};

class FormControlStatic extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;
    delete props.bsClass;

    const classes = getClassSet(this.props);
    const domProps = ensureDomProps(props, Component);
    return (
      <Component {...domProps} className={classNames(className, classes)} />
    );
  }
}

FormControlStatic.propTypes = propTypes;
FormControlStatic.defaultProps = defaultProps;

export default bsClass('form-control-static', FormControlStatic);
