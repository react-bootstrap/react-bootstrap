import React from 'react';
import classNames from 'classnames';
import CustomPropTypes from './utils/CustomPropTypes';

const Row = React.createClass({
  propTypes: {
    componentClass: CustomPropTypes.elementType
  },

  getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render() {
    let ComponentClass = this.props.componentClass;

    return (
      <ComponentClass {...this.props} className={classNames(this.props.className, 'row')}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default Row;
