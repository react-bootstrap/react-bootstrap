import React from 'react';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

import { bsClass, getClassSet, omitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  componentClass: elementType,
};

const defaultProps = {
  componentClass: 'div',
};

class Jumbotron extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;

    const classes = getClassSet(props);

    return (
      <Component
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      />
    );
  }
}

Jumbotron.propTypes = propTypes;
Jumbotron.defaultProps = defaultProps;

export default bsClass('jumbotron', Jumbotron);
