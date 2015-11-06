import { PropTypes } from 'react';
import styleMaps from '../styleMaps';
import invariant from 'invariant';
import warning from 'warning';

function curry(fn) {
  return (...args) => {
    let last = args[args.length - 1];
    if (typeof last === 'function') {
      return fn(...args);
    }
    return Component => fn(...args, Component);
  };
}

function prefix(props = {}, variant) {
  invariant((props.bsClass || '').trim(), 'A `bsClass` prop is required for this component');
  return props.bsClass + (variant ? '-' + variant : '');
}

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
    if (styleMaps.SIZES[size] && styleMaps.SIZES[size] !== size) {
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

export default {

  prefix,

  getClassSet(props) {
    let classes = {};
    let bsClassName = prefix(props);

    if (bsClassName) {
      let bsSize;

      classes[bsClassName] = true;

      if (props.bsSize) {
        bsSize = styleMaps.SIZES[props.bsSize] || bsSize;
      }

      if (bsSize) {
        classes[prefix(props, bsSize)] = true;
      }

      if (props.bsStyle) {
        if (props.bsStyle.indexOf(prefix(props)) === 0) {
          warning(false, // small migration convenience, since the old method required manual prefixing
            'bsStyle will automatically prefix custom values with the bsClass, so there is no ' +
            'need to append it manually. (bsStyle: ' + props.bsStyle + ', bsClass: ' + prefix(props) + ')'
          );
          classes[props.bsStyle] = true;
        } else {
          classes[prefix(props, props.bsStyle)] = true;
        }
      }
    }

    return classes;
  },

  /**
   * Add a style variant to a Component. Mutates the propTypes of the component
   * in order to validate the new variant.
   */
  addStyle(Component, styleVariant) {
    bsStyles(styleVariant, Component);
  }
};

export let _curry = curry;
