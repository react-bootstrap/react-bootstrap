import React from 'react';
import classNames from 'classnames';
import styleMaps from './styleMaps';
import elementType from 'react-prop-types/lib/elementType';

const Clearfix = React.createClass({
  propTypes: {
    /**
     * You can use a custom element for this component
     */
    componentClass: elementType,
    /**
     * Hide column
     *
     * on Extra small devices Phones
     *
     * adds class `hidden-xs`
     */
    xsHidden: React.PropTypes.bool,
    /**
     * Hide column
     *
     * on Small devices Tablets
     *
     * adds class `hidden-sm`
     */
    smHidden: React.PropTypes.bool,
    /**
     * Hide column
     *
     * on Medium devices Desktops
     *
     * adds class `hidden-md`
     */
    mdHidden: React.PropTypes.bool,
    /**
     * Hide column
     *
     * on Large devices Desktops
     *
     * adds class `hidden-lg`
     */
    lgHidden: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render() {
    let ComponentClass = this.props.componentClass;

    let classes = {};

    Object.keys(styleMaps.SIZES).forEach( key => {
      let size = styleMaps.SIZES[key];

      classes['hidden-' + size] = this.props[size + 'Hidden'];
    }, this);

    return (
      <ComponentClass {...this.props} className={classNames(this.props.className, 'clearfix', classes)}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default Clearfix;
