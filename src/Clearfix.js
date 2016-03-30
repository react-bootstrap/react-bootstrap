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
     * Do not apply clearfix
     *
     * on Extra small devices Phones
     *
     * adds class `visible-xs-block`
     */
    visibleXsBlock: React.PropTypes.bool,
    /**
     * Do not apply clearfix
     *
     * on Small devices Tablets
     *
     * adds class `visible-sm-block`
     */
    visibleSmBlock: React.PropTypes.bool,
    /**
     * Do not apply clearfix
     *
     * on Medium devices Desktops
     *
     * adds class `visible-md-block`
     */
    visibleMdBlock: React.PropTypes.bool,
    /**
     * Do not apply clearfix
     *
     * on Large devices Desktops
     *
     * adds class `visible-lg-block`
     */
    visibleLgBlock: React.PropTypes.bool
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

      classes['visible-' + size + '-block'] = this.props['visible' + size.charAt(0).toUpperCase() + size.slice(1) + 'Block'];
    }, this);

    return (
      <ComponentClass {...this.props} className={classNames(this.props.className, 'clearfix', classes)}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default Clearfix;
