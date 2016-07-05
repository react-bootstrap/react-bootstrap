import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import { bsClass, omitBsProps, prefix } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * Turn any fixed-width grid layout into a full-width layout by this property.
   *
   * Adds `container-fluid` class.
   */
  fluid: React.PropTypes.bool,
  /**
   * You can use a custom element for this component
   */
  componentClass: elementType,
};

const defaultProps = {
  componentClass: 'div',
  fluid: false,
};

class Grid extends React.Component {
  render() {
    const {
      fluid, componentClass: Component, className, ...props,
    } = this.props;

    const classes = prefix(props, fluid && 'fluid');

    return (
      <Component
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      />
    );
  }
}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default bsClass('container', Grid);
