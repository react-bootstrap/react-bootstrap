import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styleMaps from './styleMaps';
import elementType from 'react-prop-types/lib/elementType';

class Col extends React.Component {
 static propTypes = {
   /**
    * The number of columns you wish to span
    *
    * for Extra small devices Phones (<768px)
    *
    * class-prefix `col-xs-`
    */
   xs: PropTypes.number,
   /**
    * The number of columns you wish to span
    *
    * for Small devices Tablets (≥768px)
    *
    * class-prefix `col-sm-`
    */
   sm: PropTypes.number,
   /**
    * The number of columns you wish to span
    *
    * for Medium devices Desktops (≥992px)
    *
    * class-prefix `col-md-`
    */
   md: PropTypes.number,
   /**
    * The number of columns you wish to span
    *
    * for Large devices Desktops (≥1200px)
    *
    * class-prefix `col-lg-`
    */
   lg: PropTypes.number,
   /**
    * Hide column
    *
    * on Extra small devices Phones
    *
    * adds class `hidden-xs`
    */
   xsHidden: PropTypes.bool,
   /**
    * Hide column
    *
    * on Small devices Tablets
    *
    * adds class `hidden-sm`
    */
   smHidden: PropTypes.bool,
   /**
    * Hide column
    *
    * on Medium devices Desktops
    *
    * adds class `hidden-md`
    */
   mdHidden: PropTypes.bool,
   /**
    * Hide column
    *
    * on Large devices Desktops
    *
    * adds class `hidden-lg`
    */
   lgHidden: PropTypes.bool,
   /**
    * Move columns to the right
    *
    * for Extra small devices Phones
    *
    * class-prefix `col-xs-offset-`
    */
   xsOffset: PropTypes.number,
   /**
    * Move columns to the right
    *
    * for Small devices Tablets
    *
    * class-prefix `col-sm-offset-`
    */
   smOffset: PropTypes.number,
   /**
    * Move columns to the right
    *
    * for Medium devices Desktops
    *
    * class-prefix `col-md-offset-`
    */
   mdOffset: PropTypes.number,
   /**
    * Move columns to the right
    *
    * for Large devices Desktops
    *
    * class-prefix `col-lg-offset-`
    */
   lgOffset: PropTypes.number,
   /**
    * Change the order of grid columns to the right
    *
    * for Extra small devices Phones
    *
    * class-prefix `col-xs-push-`
    */
   xsPush: PropTypes.number,
   /**
    * Change the order of grid columns to the right
    *
    * for Small devices Tablets
    *
    * class-prefix `col-sm-push-`
    */
   smPush: PropTypes.number,
   /**
    * Change the order of grid columns to the right
    *
    * for Medium devices Desktops
    *
    * class-prefix `col-md-push-`
    */
   mdPush: PropTypes.number,
   /**
    * Change the order of grid columns to the right
    *
    * for Large devices Desktops
    *
    * class-prefix `col-lg-push-`
    */
   lgPush: PropTypes.number,
   /**
    * Change the order of grid columns to the left
    *
    * for Extra small devices Phones
    *
    * class-prefix `col-xs-pull-`
    */
   xsPull: PropTypes.number,
   /**
    * Change the order of grid columns to the left
    *
    * for Small devices Tablets
    *
    * class-prefix `col-sm-pull-`
    */
   smPull: PropTypes.number,
   /**
    * Change the order of grid columns to the left
    *
    * for Medium devices Desktops
    *
    * class-prefix `col-md-pull-`
    */
   mdPull: PropTypes.number,
   /**
    * Change the order of grid columns to the left
    *
    * for Large devices Desktops
    *
    * class-prefix `col-lg-pull-`
    */
   lgPull: PropTypes.number,
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
   let classes = {};

   Object.keys(styleMaps.SIZES).forEach( key => {
     let size = styleMaps.SIZES[key];
     let prop = size;
     let classPart = size + '-';

     if (this.props[prop]) {
       classes['col-' + classPart + this.props[prop]] = true;
     }

     classes['hidden-' + size] = this.props[size + 'Hidden'];

     prop = size + 'Offset';
     classPart = size + '-offset-';
     if (this.props[prop] >= 0) {
       classes['col-' + classPart + this.props[prop]] = true;
     }

     prop = size + 'Push';
     classPart = size + '-push-';
     if (this.props[prop] >= 0) {
       classes['col-' + classPart + this.props[prop]] = true;
     }

     prop = size + 'Pull';
     classPart = size + '-pull-';
     if (this.props[prop] >= 0) {
       classes['col-' + classPart + this.props[prop]] = true;
     }
   }, this);

   return (
     <ComponentClass {...this.props} className={classNames(this.props.className, classes)}>
       {this.props.children}
     </ComponentClass>
   );
 }
}

export default Col;
