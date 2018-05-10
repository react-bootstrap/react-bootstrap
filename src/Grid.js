import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

class Grid extends React.Component {
  static propTypes = {
    /**
     * Turn any fixed-width grid layout into a full-width layout by this property.
     *
     * Adds `container-fluid` class.
     */
    fluid: PropTypes.bool,
    /**
     * You can use a custom element for this component
     */
    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'div',
    fluid: false
  };

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
}

export default Grid;
