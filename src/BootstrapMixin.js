import styleMaps from './styleMaps';
import CustomPropTypes from './utils/CustomPropTypes';

const BootstrapMixin = {
  propTypes: {
    bsClass: CustomPropTypes.keyOf(styleMaps.CLASSES),
    bsStyle: CustomPropTypes.keyOf(styleMaps.STYLES),
    bsSize: CustomPropTypes.keyOf(styleMaps.SIZES)
  },

  getBsClassSet() {
    let classes = {};

    let bsClass = this.props.bsClass && styleMaps.CLASSES[this.props.bsClass];
    if (bsClass) {
      classes[bsClass] = true;

      let prefix = bsClass + '-';

      let bsSize = this.props.bsSize && styleMaps.SIZES[this.props.bsSize];
      if (bsSize) {
        classes[prefix + bsSize] = true;
      }

      let bsStyle = this.props.bsStyle && styleMaps.STYLES[this.props.bsStyle];
      if (this.props.bsStyle) {
        classes[prefix + bsStyle] = true;
      }
    }

    return classes;
  },

  prefixClass(subClass) {
    return styleMaps.CLASSES[this.props.bsClass] + '-' + subClass;
  }
};

export default BootstrapMixin;
