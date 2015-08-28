import React from 'react';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

const Jumbotron = React.createClass({
  propTypes: {
    /**
     * You can use a custom element for this component
     */
    componentClass: elementType
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
