import React from 'react';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

import ensureDomProps from './utils/ensureDomProps';

const Grid = React.createClass({
  propTypes: {
    /**
     * Turn any fixed-width grid layout into a full-width layout by this property.
     *
     * Adds `container-fluid` class.
     */
    fluid: React.PropTypes.bool,
    /**
     * You can use a custom element for this component
     */
    componentClass: elementType
  },

  getDefaultProps() {
    return {
      componentClass: 'div',
      fluid: false
    };
  },

  render() {
    let ComponentClass = this.props.componentClass;
    let className = this.props.fluid ? 'container-fluid' : 'container';
    const domProps = ensureDomProps(this.props, ComponentClass);
    return (
      <ComponentClass
        {...domProps}
        className={classNames(this.props.className, className)}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default Grid;
