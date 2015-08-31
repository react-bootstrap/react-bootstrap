import { PropTypes } from 'react';
import styleMaps from '../styleMaps';
import invariant from 'react/lib/invariant';

function curry(fn){
  return (...args) => {
    let last = args[args.length - 1];
    if (typeof last === 'function'){
      return fn(...args);
    }
    return Component => fn(...args, Component);
  };
}

function prefix(props = {}, variant) {
  invariant((props.bsClass || '').trim(), 'Must provide a bsClass for components');
  return props.bsClass + (variant ? '-' + variant : '');
}

export default {

  propTypes: {
    bsClass: PropTypes.string,
  },

  prefix,

  getClassSet(props) {
    let classes = {};
    let bsClass = (props.bsClass || '').trim();

    if (bsClass) {
      let bsSize;

      classes[bsClass] = true;

      if (props.bsSize) {
        bsSize = styleMaps.SIZES[props.bsSize] || bsSize;
      }

      if (bsSize) {
        classes[prefix(props, bsSize)] = true;
      }

      if (props.bsStyle) {
        classes[prefix(props, props.bsStyle)] = true;
      }
    }

    return classes;
  }
};

export let bsClass = curry((defaultClass, Component) => {
  let propTypes = Component.propTypes || (Component.propTypes = {});
  let defaultProps = Component.defaultProps || (Component.defaultProps = {});

  propTypes.bsClass = PropTypes.string;
  defaultProps.bsClass = defaultClass;

  return Component;
});

export let bsStyles = curry((styles, defaultStyle, Component) => {
  if (typeof defaultStyle !== 'string') {
    Component = defaultStyle;
    defaultStyle = undefined;
  }

  let existing = Component.STYLES || [];
  let propTypes = Component.propTypes || {};

  styles.forEach(style => {
    if (existing.indexOf(style) === -1) {
      existing.push(style);
    }
  });

  let propType = PropTypes.oneOf(existing);

  // expose the values on the propType function for documentation
  Component.STYLES = propType._values = existing;

  Component.propTypes = {
    ...propTypes,
    bsStyle: propType
  };

  if (defaultStyle !== undefined) {
    let defaultProps = Component.defaultProps || (Component.defaultProps = {});
    defaultProps.bsStyle = defaultStyle;
  }

  return Component;
});


export let bsSizes = curry((sizes, defaultSize, Component) => {
  if (typeof defaultSize !== 'string') {
    Component = defaultSize;
    defaultSize = undefined;
  }

  let existing = Component.SIZES || [];
  let propTypes = Component.propTypes || {};

  sizes.forEach(size => {
    if (existing.indexOf(size) === -1) {
      existing.push(size);
    }
  });

  let values = existing.reduce((result, size) => {
    if (styleMaps.SIZES[size] && styleMaps.SIZES[size] !== size){
      result.push(styleMaps.SIZES[size]);
    }
    return result.concat(size);
  }, []);

  let propType = PropTypes.oneOf(values);

  propType._values = values;
  // expose the values on the propType function for documentation
  Component.SIZES = existing;

  Component.propTypes = {
    ...propTypes,
    bsSize: propType
  };

  if (defaultSize !== undefined) {
    let defaultProps = Component.defaultProps || (Component.defaultProps = {});
    defaultProps.bsSize = defaultSize;
  }

  return Component;
});

export let _curry = curry;
