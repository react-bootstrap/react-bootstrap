import React from 'react';
import classNames from 'classnames';

const Row = React.createClass({
  propTypes: {
    componentClass: React.PropTypes.node.isRequired
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
