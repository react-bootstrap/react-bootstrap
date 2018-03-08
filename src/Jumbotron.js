import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import elementType from 'prop-types-extra/lib/elementType';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  componentClass: elementType,
  fluid: PropTypes.bool
};

const defaultProps = {
  componentClass: 'div',
  fluid: false
};

class Jumbotron extends React.Component {
  render() {
    const {
      componentClass: Component,
      className,
      fluid,
      ...props
    } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      'jumbotron-fluid': fluid
    };
    return (
      <Component {...elementProps} className={classNames(className, classes)} />
    );
  }
}

Jumbotron.propTypes = propTypes;
Jumbotron.defaultProps = defaultProps;

export default bsClass('jumbotron', Jumbotron);
