import React from 'react';
import classNames from 'classnames';

const Row = React.createClass({
  propTypes: {
    componentClass: React.PropTypes.node.isRequired,
    fluid: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render() {
    let ComponentClass = this.props.componentClass;
    let className = this.props.fluid ? 'row-fluid' : 'row';

    return (
      <ComponentClass
        {...this.props}
        className={classNames(this.props.className, className)}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default Row;
