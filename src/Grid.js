import React from 'react';
import classNames from 'classnames';
import CustomPropTypes from './utils/CustomPropTypes';

const Grid = React.createClass({
  propTypes: {
    fluid: React.PropTypes.bool,
    componentClass: CustomPropTypes.elementType
  },

  getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render() {
    let ComponentClass = this.props.componentClass;
    let className = this.props.fluid ? 'container-fluid' : 'container';

    return (
      <ComponentClass
        {...this.props}
        className={classNames(this.props.className, className)}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default Grid;
