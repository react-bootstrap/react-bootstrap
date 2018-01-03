import React from 'react';
import classNames from 'classnames';
import elementType from 'prop-types-extra/lib/elementType';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  componentClass: elementType
};

const defaultProps = {
  componentClass: 'div'
};

class Jumbotron extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <Component {...elementProps} className={classNames(className, classes)} />
    );
  }
}

Jumbotron.propTypes = propTypes;
Jumbotron.defaultProps = defaultProps;

export default bsClass('jumbotron', Jumbotron);
