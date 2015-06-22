import React from 'react';
import classNames from 'classnames';

const Jumbotron = React.createClass({
  propTypes: {
    componentClass: React.PropTypes.any.isRequired
  },

  getDefaultProps() {
    return { componentClass: 'div' };
  },

  render() {
    const ComponentClass = this.props.componentClass;

    return (
      <ComponentClass {...this.props} className={classNames(this.props.className, 'jumbotron')}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default Jumbotron;
