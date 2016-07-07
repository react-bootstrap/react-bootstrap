import React from 'react';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

import ensureDomProps from './utils/ensureDomProps';

const Row = React.createClass({
  propTypes: {
    /**
     * You can use a custom element for this component
     */
    componentClass: elementType
  },

  getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render() {
    let ComponentClass = this.props.componentClass;
    const domProps = ensureDomProps(this.props, ComponentClass);
    return (
      <ComponentClass {...domProps} className={classNames(this.props.className, 'row')}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default Row;
