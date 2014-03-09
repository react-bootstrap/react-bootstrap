import cloneWithProps from './react-es6/lib/cloneWithProps';

// From https://www.npmjs.org/package/extend
var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

function isPlainObject(obj) {
  if (!obj || toString.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval)
    return false;

  var has_own_constructor = hasOwn.call(obj, 'constructor');
  var has_is_property_of_method = hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
  // Not own constructor property must be Object
  if (obj.constructor && !has_own_constructor && !has_is_property_of_method)
    return false;

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  var key;
  for ( key in obj ) {}

  return key === undefined || hasOwn.call( obj, key );
};

export default = {

  /**
   * Modify each item in a React children array without
   * unnecessarily allocating a new array.
   *
   * @param {array|object} children
   * @param {function} modifier
   * @returns {*}
   */
  modifyChildren: function (children, modifier) {
    if (children == null) {
      return children;
    }

    return Array.isArray(children) ? children.map(modifier) : modifier(children, 0);
  },

  /**
   * Filter each item in a React children array without
   * unnecessarily allocating a new array.
   *
   * @param {array|object} children
   * @param {function} filter
   * @returns {*}
   */
  filterChildren: function (children, filter) {
    if (children == null) {
      return children;
    }

    if (Array.isArray(children)) {
      return children.filter(filter);
    } else {
      return filter(children, 0) ? children : null;
    }
  },


  /**
   * Safe chained function
   *
   * Will only create a new function if needed,
   * otherwise will pass back existing functions or null.
   *
   * @param {function} one
   * @param {function} two
   * @returns {function|null}
   */
  createChainedFunction: function (one, two) {
    var hasOne = typeof one === 'function';
    var hasTwo = typeof two === 'function';

    if (!hasOne && !hasTwo) { return null; }
    if (!hasOne) { return two; }
    if (!hasTwo) { return one; }

    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  },

  /**
   * Sometimes you want to change the props of a child passed to you. Usually
   * this is to add a CSS class.
   *
   * @param {object} child child component you'd like to clone
   * @param {object} props props you'd like to modify. They will be merged
   * as if you used `transferPropsTo()`.
   * @return {object} a clone of child with props merged in.
   */
  cloneWithProps: function (child, props) {
    return cloneWithProps(child, props);
  },

  /**
   * From https://www.npmjs.org/package/extend
   * node-extend is a port of the classic extend() method from jQuery.
   * It behaves as you expect. It is simple, tried and true.
   *
   * Extend one object with one or more others, returning the modified object.
   * Keep in mind that the target object will be modified, and will be returned from extend().
   *
   * If a boolean true is specified as the first argument, extend performs a deep copy,
   * recursively copying any objects it finds. Otherwise, the copy will share structure
   * with the original object(s). Undefined properties are not copied. However, properties
   * inherited from the object's prototype will be copied over.
   *
   * @example
   * extend([deep], target, object1, [objectN])
   *
   * @return {object}
   */
  extend: function () {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
      deep = target;
      target = arguments[1] || {};
      // skip the boolean and the target
      i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && typeof target !== "function") {
      target = {};
    }

    for ( ; i < length; i++ ) {
      // Only deal with non-null/undefined values
      if ( (options = arguments[ i ]) != null ) {
        // Extend the base object
        for ( name in options ) {
          src = target[ name ];
          copy = options[ name ];

          // Prevent never-ending loop
          if ( target === copy ) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) ) ) {
            if ( copyIsArray ) {
              copyIsArray = false;
              clone = src && Array.isArray(src) ? src : [];

            } else {
              clone = src && isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[ name ] = extend( deep, clone, copy );

          // Don't bring in undefined values
          } else if ( copy !== undefined ) {
            target[ name ] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  }
};