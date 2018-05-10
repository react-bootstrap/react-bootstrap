import React from 'react';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

class Row extends React.Component {
  static propTypes = {
    /**
     * You can use a custom element for this component
     */
    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    let ComponentClass = this.props.componentClass;

    return (
      <ComponentClass {...this.props} className={classNames(this.props.className, 'row')}>
        {this.props.children}
      </ComponentClass>
    );
  }
}

export default Row;
