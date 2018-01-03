import classNames from 'classnames';
import React from 'react';
import elementType from 'prop-types-extra/lib/elementType';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  componentClass: elementType
};

const defaultProps = {
  componentClass: 'div'
};

class ModalFooter extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <Component {...elementProps} className={classNames(className, classes)} />
    );
  }
}

ModalFooter.propTypes = propTypes;
ModalFooter.defaultProps = defaultProps;

export default bsClass('modal-footer', ModalFooter);
