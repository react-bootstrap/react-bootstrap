(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['react'], factory);
    } else {
        // Browser globals
        root.ReactBootstrap = factory(root.React);
    }
}(this, function (React) {



/**
 * almond 0.1.2 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var defined = {},
        waiting = {},
        config = {},
        defining = {},
        aps = [].slice,
        main, req;

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {},
            nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part;

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; (part = name[i]); i++) {
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            return true;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (waiting.hasOwnProperty(name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!defined.hasOwnProperty(name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    function makeMap(name, relName) {
        var prefix, plugin,
            index = name.indexOf('!');

        if (index !== -1) {
            prefix = normalize(name.slice(0, index), relName);
            name = name.slice(index + 1);
            plugin = callDep(prefix);

            //Normalize according
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            p: plugin
        };
    }

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    main = function (name, deps, callback, relName) {
        var args = [],
            usingExports,
            cjsModule, depName, ret, map, i;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i++) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = makeRequire(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = defined[name] = {};
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = {
                        id: name,
                        uri: '',
                        exports: defined[name],
                        config: makeConfig(name)
                    };
                } else if (defined.hasOwnProperty(depName) || waiting.hasOwnProperty(depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else if (!defining[depName]) {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                    cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync) {
        if (typeof deps === "string") {
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 15);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        return req;
    };

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        waiting[name] = [name, deps, callback];
    };

    define.amd = {
        jQuery: true
    };
}());

define("almond", function(){});

define(
  '../amd/transpiled/react-es6',["exports", "react"],
  function(__exports__, React) {
    
    __exports__["default"] = React;
  });
define(
  '../amd/transpiled/react-es6/lib/cx',["exports"],
  function(__exports__) {
    
    /**
     * Copyright 2013 Facebook, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * @providesModule cx
     */

    /**
     * This function is used to mark string literals representing CSS class names
     * so that they can be transformed statically. This allows for modularization
     * and minification of CSS class names.
     *
     * In static_upstream, this function is actually implemented, but it should
     * eventually be replaced with something more descriptive, and the transform
     * that is used in the main stack should be ported for use elsewhere.
     *
     * @param string|object className to modularize, or an object of key/values.
     *                      In the object case, the values are conditions that
     *                      determine if the className keys should be included.
     * @param [string ...]  Variable list of classNames in the string case.
     * @return string       Renderable space-separated CSS className.
     */
    function cx (classNames) {
      if (typeof classNames == 'object') {
        return Object.keys(classNames).map(function(className) {
          return classNames[className] ? className : '';
        }).join(' ');
      } else {
        return Array.prototype.join.call(arguments, ' ');
      }
    }

    __exports__["default"] = cx;
  });
define(
  '../amd/transpiled/constants',["exports"],
  function(__exports__) {
    
    __exports__["default"] = {
        CLASSES: {
            'column': 'col',
            'button': 'btn',
            'button-group': 'btn-group',
            'button-toolbar': 'btn-toolbar',
            'label': 'label',
            'alert': 'alert',
            'input-group': 'input-group',
            'form': 'form',
            'panel': 'panel',
            'panel-group': 'panel-group',
            'progress-bar': 'progress-bar',
            'nav': 'nav',
            'modal': 'modal'
        },
        STYLES: {
            'default': 'default',
            'primary': 'primary',
            'success': 'success',
            'info': 'info',
            'warning': 'warning',
            'danger': 'danger',
            'link': 'link',
            'inline': 'inline',
            'tabs': 'tabs',
            'pills': 'pills'
        },
        SIZES: {
            'large': 'lg',
            'medium': 'md',
            'small': 'sm',
            'xsmall': 'xs'
        }
    };
  });
define(
  '../amd/transpiled/BootstrapMixin',["./react-es6","./constants","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    var React = __dependency1__["default"];
    var constants = __dependency2__["default"];

    var BootstrapMixin = {
      propTypes: {
        bsClass: React.PropTypes.oneOf(Object.keys(constants.CLASSES)),
        bsStyle: React.PropTypes.oneOf(Object.keys(constants.STYLES)),
        bsSize: React.PropTypes.oneOf(Object.keys(constants.SIZES))
      },

      getBsClassSet: function () {
        var classes = {};

        var bsClass = this.props.bsClass && constants.CLASSES[this.props.bsClass];
        if (bsClass) {
          classes[bsClass] = true;

          var prefix = bsClass + '-';

          var bsSize = this.props.bsSize && constants.SIZES[this.props.bsSize];
          if (bsSize) {
            classes[prefix + bsSize] = true;
          }

          var bsStyle = this.props.bsStyle && constants.STYLES[this.props.bsStyle];
          if (this.props.bsStyle) {
            classes[prefix + bsStyle] = true;
          }
        }

        return classes;
      }
    };

    __exports__["default"] = BootstrapMixin;
  });
define(
  '../amd/transpiled/react-es6/lib/copyProperties',["exports"],
  function(__exports__) {
    
    /**
     * Copyright 2013 Facebook, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * @providesModule copyProperties
     */

    /**
     * Copy properties from one or more objects (up to 5) into the first object.
     * This is a shallow copy. It mutates the first object and also returns it.
     *
     * NOTE: `arguments` has a very significant performance penalty, which is why
     * we don't support unlimited arguments.
     */
    function copyProperties(obj, a, b, c, d, e, f) {
      obj = obj || {};

      var args = [a, b, c, d, e];
      var ii = 0, v;
      while (args[ii]) {
        v = args[ii++];
        for (var k in v) {
          obj[k] = v[k];
        }

        // IE ignores toString in object iteration.. See:
        // webreflection.blogspot.com/2007/07/quick-fix-internet-explorer-and.html
        if (v.hasOwnProperty && v.hasOwnProperty('toString') &&
            (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
          obj.toString = v.toString;
        }
      }

      return obj;
    }

    __exports__["default"] = copyProperties;
  });
define(
  '../amd/transpiled/react-es6/lib/emptyFunction',["./copyProperties","exports"],
  function(__dependency1__, __exports__) {
    
    /**
     * Copyright 2013 Facebook, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * @providesModule emptyFunction
     */

    var copyProperties = __dependency1__["default"];

    function makeEmptyFunction (arg) {
      return function () {
        return arg;
      };
    }

    /**
     * This function accepts and discards inputs; it has no side effects. This is
     * primarily useful idiomatically for overridable function endpoints which
     * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
     */
    function emptyFunction () {}

    copyProperties(emptyFunction, {
      thatReturns: makeEmptyFunction,
      thatReturnsFalse: makeEmptyFunction(false),
      thatReturnsTrue: makeEmptyFunction(true),
      thatReturnsNull: makeEmptyFunction(null),
      thatReturnsThis: function() { return this; },
      thatReturnsArgument: function(arg) { return arg; }
    });

    __exports__["default"] = emptyFunction;
  });
define(
  '../amd/transpiled/react-es6/lib/invariant',["exports"],
  function(__exports__) {
    
    /**
     * Copyright 2013 Facebook, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * @providesModule invariant
     */

    /**
     * Use invariant() to assert state which your program assumes to be true.
     *
     * Provide sprintf-style format (only %s is supported) and arguments
     * to provide information about what broke and what you were
     * expecting.
     *
     * The invariant message will be stripped in production, but the invariant
     * will remain to ensure logic does not differ in production.
     */

    function invariant (condition) {
      if (!condition) {
        var error = new Error('Invariant Violation');
        error.framesToPop = 1;
        throw error;
      }
    }

    __exports__["default"] = invariant;
  });
define(
  '../amd/transpiled/react-es6/lib/joinClasses',["exports"],
  function(__exports__) {
    
    /**
     * Copyright 2013 Facebook, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * @providesModule joinClasses
     * @typechecks static-only
     */

    

    /**
     * Combines multiple className strings into one.
     * http://jsperf.com/joinclasses-args-vs-array
     *
     * @param {...?string} classes
     * @return {string}
     */
    function joinClasses (className/*, ... */) {
      if (!className) {
        className = '';
      }
      var nextClass;
      var argLength = arguments.length;
      if (argLength > 1) {
        for (var ii = 1; ii < argLength; ii++) {
          nextClass = arguments[ii];
          nextClass && (className += ' ' + nextClass);
        }
      }
      return className;
    }

    __exports__["default"] = joinClasses;
  });
define(
  '../amd/transpiled/react-es6/lib/keyMirror',["./invariant","exports"],
  function(__dependency1__, __exports__) {
    
    /**
     * Copyright 2013 Facebook, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * @providesModule keyMirror
     * @typechecks static-only
     */

    

    var invariant = __dependency1__["default"];

    /**
     * Constructs an enumeration with keys equal to their value.
     *
     * For example:
     *
     *   var COLORS = keyMirror({blue: null, red: null});
     *   var myColor = COLORS.blue;
     *   var isColorValid = !!COLORS[myColor];
     *
     * The last line could not be performed if the values of the generated enum were
     * not equal to their keys.
     *
     *   Input:  {key1: val1, key2: val2}
     *   Output: {key1: key1, key2: key2}
     *
     * @param {object} obj
     * @return {object}
     */
    var keyMirror = function(obj) {
      var ret = {};
      var key;
      (invariant(obj instanceof Object && !Array.isArray(obj)));
      for (key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        ret[key] = key;
      }
      return ret;
    };

    __exports__["default"] = keyMirror;
  });
define(
  '../amd/transpiled/react-es6/lib/mergeHelpers',["./invariant","./keyMirror","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    /**
     * Copyright 2013 Facebook, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * @providesModule mergeHelpers
     *
     * requiresPolyfills: Array.isArray
     */

    

    var invariant = __dependency1__["default"];
    var keyMirror = __dependency2__["default"];

    /**
     * Maximum number of levels to traverse. Will catch circular structures.
     * @const
     */
    var MAX_MERGE_DEPTH = 36;

    /**
     * We won't worry about edge cases like new String('x') or new Boolean(true).
     * Functions are considered terminals, and arrays are not.
     * @param {*} o The item/object/value to test.
     * @return {boolean} true iff the argument is a terminal.
     */
    var isTerminal = function (o) {
      return typeof o !== 'object' || o === null;
    };

    var mergeHelpers = {

      MAX_MERGE_DEPTH: MAX_MERGE_DEPTH,

      isTerminal: isTerminal,

      /**
       * Converts null/undefined values into empty object.
       *
       * @param {?Object=} arg Argument to be normalized (nullable optional)
       * @return {!Object}
       */
      normalizeMergeArg: function (arg) {
        return arg === undefined || arg === null ? {} : arg;
      },

      /**
       * If merging Arrays, a merge strategy *must* be supplied. If not, it is
       * likely the caller's fault. If this function is ever called with anything
       * but `one` and `two` being `Array`s, it is the fault of the merge utilities.
       *
       * @param {*} one Array to merge into.
       * @param {*} two Array to merge from.
       */
      checkMergeArrayArgs: function (one, two) {
        (invariant(Array.isArray(one) && Array.isArray(two)));
      },

      /**
       * @param {*} one Object to merge into.
       * @param {*} two Object to merge from.
       */
      checkMergeObjectArgs: function (one, two) {
        mergeHelpers.checkMergeObjectArg(one);
        mergeHelpers.checkMergeObjectArg(two);
      },

      /**
       * @param {*} arg
       */
      checkMergeObjectArg: function (arg) {
        (invariant(!isTerminal(arg) && !Array.isArray(arg)));
      },

      /**
       * Checks that a merge was not given a circular object or an object that had
       * too great of depth.
       *
       * @param {number} Level of recursion to validate against maximum.
       */
      checkMergeLevel: function (level) {
        (invariant(level < MAX_MERGE_DEPTH));
      },

      /**
       * Checks that the supplied merge strategy is valid.
       *
       * @param {string} Array merge strategy.
       */
      checkArrayStrategy: function (strategy) {
        (invariant(strategy === undefined || strategy in mergeHelpers.ArrayStrategies));
      },

      /**
       * Set of possible behaviors of merge algorithms when encountering two Arrays
       * that must be merged together.
       * - `clobber`: The left `Array` is ignored.
       * - `indexByIndex`: The result is achieved by recursively deep merging at
       *   each index. (not yet supported.)
       */
      ArrayStrategies: keyMirror({
        Clobber: true,
        IndexByIndex: true
      })

    };

    __exports__["default"] = mergeHelpers;
  });
define(
  '../amd/transpiled/react-es6/lib/mergeInto',["./mergeHelpers","exports"],
  function(__dependency1__, __exports__) {
    
    /**
     * Copyright 2013 Facebook, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * @providesModule mergeInto
     * @typechecks static-only
     */

    

    var mergeHelpers = __dependency1__["default"];

    var checkMergeObjectArg = mergeHelpers.checkMergeObjectArg;

    /**
     * Shallow merges two structures by mutating the first parameter.
     *
     * @param {object} one Object to be merged into.
     * @param {?object} two Optional object with properties to merge from.
     */
    function mergeInto (one, two) {
      checkMergeObjectArg(one);
      if (two != null) {
        checkMergeObjectArg(two);
        for (var key in two) {
          if (!two.hasOwnProperty(key)) {
            continue;
          }
          one[key] = two[key];
        }
      }
    }

    __exports__["default"] = mergeInto;
  });
define(
  '../amd/transpiled/react-es6/lib/merge',["./mergeInto","exports"],
  function(__dependency1__, __exports__) {
    
    /**
     * Copyright 2013 Facebook, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * @providesModule merge
     */

    

    var mergeInto = __dependency1__["default"];

    /**
     * Shallow merges two structures into a return value, without mutating either.
     *
     * @param {?object} one Optional object with properties to merge from.
     * @param {?object} two Optional object with properties to merge from.
     * @return {object} The shallow extension of one by two.
     */
    var merge = function (one, two) {
      var result = {};
      mergeInto(result, one);
      mergeInto(result, two);
      return result;
    };

    __exports__["default"] = merge;
  });
define(
  '../amd/transpiled/react-es6/lib/ReactPropTransferer',["./emptyFunction","./invariant","./joinClasses","./merge","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    
    /**
     * Copyright 2013 Facebook, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * @providesModule ReactPropTransferer
     */

    

    var emptyFunction = __dependency1__["default"];
    var invariant = __dependency2__["default"];
    var joinClasses = __dependency3__["default"];
    var merge = __dependency4__["default"];

    /**
     * Creates a transfer strategy that will merge prop values using the supplied
     * `mergeStrategy`. If a prop was previously unset, this just sets it.
     *
     * @param {function} mergeStrategy
     * @return {function}
     */
    function createTransferStrategy (mergeStrategy) {
      return function (props, key, value) {
        if (!props.hasOwnProperty(key)) {
          props[key] = value;
        } else {
          props[key] = mergeStrategy(props[key], value);
        }
      };
    }

    /**
     * Transfer strategies dictate how props are transferred by `transferPropsTo`.
     */
    var TransferStrategies = {
      /**
       * Never transfer `children`.
       */
      children: emptyFunction,
      /**
       * Transfer the `className` prop by merging them.
       */
      className: createTransferStrategy(joinClasses),
      /**
       * Never transfer the `key` prop.
       */
      key: emptyFunction,
      /**
       * Never transfer the `ref` prop.
       */
      ref: emptyFunction,
      /**
       * Transfer the `style` prop (which is an object) by merging them.
       */
      style: createTransferStrategy(merge)
    };

    /**
     * ReactPropTransferer are capable of transferring props to another component
     * using a `transferPropsTo` method.
     *
     * @class ReactPropTransferer
     */
    var ReactPropTransferer = {

      TransferStrategies: TransferStrategies,

      /**
       * Merge two props objects using TransferStrategies.
       *
       * @param {object} oldProps original props (they take precedence)
       * @param {object} newProps new props to merge in
       * @return {object} a new object containing both sets of props merged.
       */
      mergeProps: function (oldProps, newProps) {
        var props = merge(oldProps);

        for (var thisKey in newProps) {
          if (!newProps.hasOwnProperty(thisKey)) {
            continue;
          }

          var transferStrategy = TransferStrategies[thisKey];

          if (transferStrategy) {
            transferStrategy(props, thisKey, newProps[thisKey]);
          } else if (!props.hasOwnProperty(thisKey)) {
            props[thisKey] = newProps[thisKey];
          }
        }

        return props;
      },

      /**
       * @lends {ReactPropTransferer.prototype}
       */
      Mixin: {

        /**
         * Transfer props from this component to a target component.
         *
         * Props that do not have an explicit transfer strategy will be transferred
         * only if the target component does not already have the prop set.
         *
         * This is usually used to pass down props to a returned root component.
         *
         * @param {ReactComponent} component Component receiving the properties.
         * @return {ReactComponent} The supplied `component`.
         * @final
         * @protected
         */
        transferPropsTo: function (component) {
          (invariant(component._owner === this));

          component.props = ReactPropTransferer.mergeProps(
            component.props,
            this.props
          );

          return component;
        }

      }
    };

    __exports__["default"] = ReactPropTransferer;
  });
define(
  '../amd/transpiled/react-es6/lib/keyOf',["exports"],
  function(__exports__) {
    
    /**
     * Allows extraction of a minified key. Let's the build system minify keys
     * without loosing the ability to dynamically use key strings as values
     * themselves. Pass in an object with a single key/val pair and it will return
     * you the string key of that single record. Suppose you want to grab the
     * value for a key 'className' inside of an object. Key/val minification may
     * have aliased that key to be 'xa12'. keyOf({className: null}) will return
     * 'xa12' in that case. Resolve keys you want to use once at startup time, then
     * reuse those resolutions.
     */
    var keyOf = function(oneKeyObj) {
      var key;
      for (key in oneKeyObj) {
        if (!oneKeyObj.hasOwnProperty(key)) {
          continue;
        }
        return key;
      }
      return null;
    };


    __exports__["default"] = keyOf;
  });
define(
  '../amd/transpiled/react-es6/lib/cloneWithProps',["./ReactPropTransferer","./keyOf","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    

    var ReactPropTransferer = __dependency1__["default"];

    var keyOf = __dependency2__["default"];

    var CHILDREN_PROP = keyOf({children: null});

    /**
     * Sometimes you want to change the props of a child passed to you. Usually
     * this is to add a CSS class.
     *
     * @param {object} child child component you'd like to clone
     * @param {object} props props you'd like to modify. They will be merged
     * as if you used `transferPropsTo()`.
     * @return {object} a clone of child with props merged in.
     */
    function cloneWithProps (child, props) {
      var newProps = ReactPropTransferer.mergeProps(props, child.props);

      // Use `child.props.children` if it is provided.
      if (!newProps.hasOwnProperty(CHILDREN_PROP) &&
          child.props.hasOwnProperty(CHILDREN_PROP)) {
        newProps.children = child.props.children;
      }

      return child.constructor.ConvenienceConstructor(newProps);
    }

    __exports__["default"] = cloneWithProps;
  });
define(
  '../amd/transpiled/utils',["./react-es6/lib/cloneWithProps","exports"],
  function(__dependency1__, __exports__) {
    
    var cloneWithProps = __dependency1__["default"];

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

    __exports__["default"] = {

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
  });
define(
  '../amd/transpiled/PanelGroup',["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var utils = __dependency4__["default"];

    var PanelGroup = React.createClass({displayName: 'PanelGroup',
      mixins: [BootstrapMixin],

      propTypes: {
        onSelect: React.PropTypes.func
      },

      getDefaultProps: function () {
        return {
          bsClass: 'panel-group'
        };
      },

      getInitialState: function () {
        var defaultActiveKey = this.props.defaultActiveKey;

        return {
          activeKey: defaultActiveKey
        };
      },

      render: function () {
        return this.transferPropsTo(
          React.DOM.div( {className:classSet(this.getBsClassSet())}, 
              utils.modifyChildren(this.props.children, this.renderPanel)
          )
        );
      },

      renderPanel: function (child) {
        var activeKey =
          this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

        var props = {
          bsStyle: this.props.bsStyle,
          key: child.props.key,
          ref: child.props.ref
        };

        if (this.props.isAccordion) {
          props.isCollapsable = true;
          props.isOpen = (child.props.key === activeKey);
          props.onSelect = this.handleSelect;
        }

        return utils.cloneWithProps(
          child,
          props
        );
      },

      shouldComponentUpdate: function() {
        // Defer any updates to this component during the `onSelect` handler.
        return !this._isChanging;
      },

      handleSelect: function (key) {
        if (this.props.onSelect) {
          this._isChanging = true;
          this.props.onSelect(key);
          this._isChanging = false;
        }

        if (this.state.activeKey === key) {
          key = null;
        }

        this.setState({
          activeKey: key
        });
      }
    });

    __exports__["default"] = PanelGroup;
  });
define(
  '../amd/transpiled/Accordion',["./react-es6","./PanelGroup","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var PanelGroup = __dependency2__["default"];

    var Accordion = React.createClass({displayName: 'Accordion',

      render: function () {
        return this.transferPropsTo(
          PanelGroup( {isAccordion:true}, 
              this.props.children
          )
        );
      }

    });

    __exports__["default"] = Accordion;
  });
define('../amd/Accordion',['./transpiled/Accordion'], function (Accordion) {
  return Accordion.default;
});
define(
  '../amd/transpiled/domUtils',["exports"],
  function(__exports__) {
    
    __exports__["default"] = {
      getComputedStyles: function (elem) {
        return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
      },

      getOffset: function (DOMNode) {
        var docElem = document.documentElement;
        var box = { top: 0, left: 0 };

        // If we don't have gBCR, just use 0,0 rather than error
        // BlackBerry 5, iOS 3 (original iPhone)
        if ( typeof DOMNode.getBoundingClientRect !== 'undefined' ) {
          box = DOMNode.getBoundingClientRect();
        }

        return {
          top: box.top + window.pageYOffset - docElem.clientTop,
          left: box.left + window.pageXOffset - docElem.clientLeft
        };
      },

      getPosition: function (elem) {
        var offsetParent, offset,
            parentOffset = {top: 0, left: 0};

        // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
        if (this.getComputedStyles(elem).position === 'fixed' ) {
          // We assume that getBoundingClientRect is available when computed position is fixed
          offset = elem.getBoundingClientRect();

        } else {
          // Get *real* offsetParent
          offsetParent = this.offsetParent(elem);

          // Get correct offsets
          offset = this.getOffset(elem);
          if ( offsetParent.nodeName !== 'HTML') {
            parentOffset = this.getOffset(offsetParent);
          }

          // Add offsetParent borders
          parentOffset.top += parseInt(this.getComputedStyles(offsetParent).borderTopWidth, 10);
          parentOffset.left += parseInt(this.getComputedStyles(offsetParent).borderLeftWidth, 10);
        }

        // Subtract parent offsets and element margins
        return {
          top: offset.top - parentOffset.top - parseInt(this.getComputedStyles(elem).marginTop, 10),
          left: offset.left - parentOffset.left - parseInt(this.getComputedStyles(elem).marginLeft, 10)
        };
      },

      offsetParent: function (elem) {
        var docElem = document.documentElement;
        var offsetParent = elem.offsetParent || docElem;

        while ( offsetParent && ( offsetParent.nodeName !== 'HTML' &&
          this.getComputedStyles(offsetParent).position === 'static' ) ) {
          offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || docElem;
      }
    };
  });
define(
  '../amd/transpiled/AffixMixin',["./react-es6","./domUtils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    /* global window, document */

    var React = __dependency1__["default"];
    var domUtils = __dependency2__["default"];

    var AffixMixin = {
      propTypes: {
        offset: React.PropTypes.number,
        offsetTop: React.PropTypes.number,
        offsetBottom: React.PropTypes.number
      },

      getInitialState: function () {
        return {
          affixClass: 'affix-top'
        };
      },

      getPinnedOffset: function (DOMNode) {
        if (this.pinnedOffset) {
          return this.pinnedOffset;
        }

        DOMNode.className = DOMNode.className.replace(/affix-top|affix-bottom|affix/, '');
        DOMNode.className += DOMNode.className.length ? ' affix' : 'affix';

        this.pinnedOffset = domUtils.getOffset(DOMNode).top - window.pageYOffset;

        return this.pinnedOffset;
      },

      checkPosition: function () {
        var DOMNode, scrollHeight, scrollTop, position, offsetTop, offsetBottom,
            affix, affixType, affixPositionTop;

        // TODO: or not visible
        if (!this.isMounted()) {
          return;
        }

        DOMNode = this.getDOMNode();
        scrollHeight = document.documentElement.offsetHeight;
        scrollTop = window.pageYOffset;
        position = domUtils.getOffset(DOMNode);
        offsetTop;
        offsetBottom;

        if (this.affixed === 'top') {
          position.top += scrollTop;
        }

        offsetTop = this.props.offsetTop != null ?
          this.props.offsetTop : this.props.offset;
        offsetBottom = this.props.offsetBottom != null ?
          this.props.offsetBottom : this.props.offset;

        if (offsetTop == null && offsetBottom == null) {
          return;
        }
        if (offsetTop == null) {
          offsetTop = 0;
        }
        if (offsetBottom == null) {
          offsetBottom = 0;
        }

        if (this.unpin != null && (scrollTop + this.unpin <= position.top)) {
          affix = false;
        } else if (offsetBottom != null && (position.top + DOMNode.offsetHeight >= scrollHeight - offsetBottom)) {
          affix = 'bottom';
        } else if (offsetTop != null && (scrollTop <= offsetTop)) {
          affix = 'top';
        } else {
          affix = false;
        }

        if (this.affixed === affix) {
          return;
        }

        if (this.unpin != null) {
          DOMNode.style.top = '';
        }

        affixType = 'affix' + (affix ? '-' + affix : '');

        this.affixed = affix;
        this.unpin = affix === 'bottom' ?
          this.getPinnedOffset(DOMNode) : null;

        if (affix === 'bottom') {
          DOMNode.className = DOMNode.className.replace(/affix-top|affix-bottom|affix/, 'affix-top');
          affixPositionTop = scrollHeight - offsetBottom - DOMNode.offsetHeight - domUtils.getOffset(DOMNode).top;
        }

        this.setState({
          affixClass: affixType,
          affixPositionTop: affixPositionTop
        });
      },

      checkPositionWithEventLoop: function () {
        setTimeout(this.checkPosition, 0);
      },

      componentDidMount: function () {
        window.addEventListener('scroll', this.checkPosition);
        document.addEventListener('click', this.checkPositionWithEventLoop);
      },

      componentWillUnmount: function () {
        window.removeEventListener('scroll', this.checkPosition);
        document.addEventListener('click', this.checkPositionWithEventLoop);
      },

      componentDidUpdate: function (prevProps, prevState) {
        if (prevState.affixClass === this.state.affixClass) {
          this.checkPositionWithEventLoop();
        }
      }
    };

    __exports__["default"] = AffixMixin;
  });
define(
  '../amd/transpiled/Affix',["./react-es6","./AffixMixin","./domUtils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var AffixMixin = __dependency2__["default"];
    var domUtils = __dependency3__["default"];

    var Affix = React.createClass({displayName: 'Affix',
      statics: {
        domUtils: domUtils
      },

      mixins: [AffixMixin],

      render: function () {
        return this.transferPropsTo(
          React.DOM.div( {className:this.state.affixClass, style:{top: this.state.affixPositionTop}}, 
            this.props.children
          )
        );
      }
    });

    __exports__["default"] = Affix;
  });
define('../amd/Affix',['./transpiled/Affix'], function (Affix) {
  return Affix.default;
});
define('../amd/AffixMixin',['./transpiled/AffixMixin'], function (AffixMixin) {
  return AffixMixin.default;
});
define(
  '../amd/transpiled/Alert',["./react-es6","./react-es6/lib/cx","./BootstrapMixin","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];


    var Alert = React.createClass({displayName: 'Alert',
      mixins: [BootstrapMixin],

      propTypes: {
        onDismiss: React.PropTypes.func,
        dismissAfter: React.PropTypes.number
      },

      getDefaultProps: function () {
        return {
          bsClass: 'alert',
          bsStyle: 'info'
        };
      },

      renderDismissButton: function () {
        return (
          React.DOM.button(
            {type:"button",
            className:"close",
            onClick:this.props.onDismiss,
            'aria-hidden':"true"}, 
            " × "
          )
        );
      },

      render: function () {
        var classes = this.getBsClassSet();
        var isDismissable = !!this.props.onDismiss;

        classes['alert-dismissable'] = isDismissable;

        return this.transferPropsTo(
          React.DOM.div( {className:classSet(classes)}, 
            isDismissable ? this.renderDismissButton() : null,
            this.props.children
          )
        );
      },

      componentDidMount: function() {
        if (this.props.dismissAfter && this.props.onDismiss) {
          this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
        }
      },

      componentWillUnmount: function() {
        clearTimeout(this.dismissTimer);
      }
    });

    __exports__["default"] = Alert;
  });
define('../amd/Alert',['./transpiled/Alert'], function (Alert) {
  return Alert.default;
});
define('../amd/BootstrapMixin',['./transpiled/BootstrapMixin'], function (BootstrapMixin) {
  return BootstrapMixin.default;
});
define(
  '../amd/transpiled/Button',["./react-es6","./react-es6/lib/cx","./BootstrapMixin","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];

    var Button = React.createClass({displayName: 'Button',
      mixins: [BootstrapMixin],

      propTypes: {
        active:   React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        block:    React.PropTypes.bool
      },

      getDefaultProps: function () {
        return {
          bsClass: 'button',
          bsStyle: 'default',
          type: 'button'
        };
      },

      render: function () {
        var classes = this.getBsClassSet();
        classes['active'] = this.props.active;
        classes['btn-block'] = this.props.block;

        var renderFuncName = this.props.href ?
          'renderAnchor' : 'renderButton';

        return this[renderFuncName](classes);
      },

      renderAnchor: function (classes) {
        classes['disabled'] = this.props.disabled;

        return this.transferPropsTo(
          React.DOM.a(
            {className:classSet(classes),
            role:"button"}, 
            this.props.children
          )
        );
      },

      renderButton: function (classes) {
        return this.transferPropsTo(
          React.DOM.button(
            {className:classSet(classes)}, 
            this.props.children
          )
        );
      }
    });

    __exports__["default"] = Button;
  });
define('../amd/Button',['./transpiled/Button'], function (Button) {
  return Button.default;
});
define(
  '../amd/transpiled/ButtonGroup',["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./Button","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var Button = __dependency4__["default"];

    var ButtonGroup = React.createClass({displayName: 'ButtonGroup',
      mixins: [BootstrapMixin],

      propTypes: {
        vertical:  React.PropTypes.bool,
        justified: React.PropTypes.bool
      },

      getDefaultProps: function () {
        return {
          bsClass: 'button-group'
        };
      },

      render: function () {
        var classes = this.getBsClassSet();
        classes['btn-group-vertical'] = this.props.vertical;
        classes['btn-group-justified'] = this.props.justified;

        return this.transferPropsTo(
          React.DOM.div(
            {className:classSet(classes)}, 
            this.props.children
          )
        );
      }
    });

    __exports__["default"] = ButtonGroup;
  });
define('../amd/ButtonGroup',['./transpiled/ButtonGroup'], function (ButtonGroup) {
  return ButtonGroup.default;
});
define(
  '../amd/transpiled/ButtonToolbar',["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./Button","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var Button = __dependency4__["default"];

    var ButtonGroup = React.createClass({displayName: 'ButtonGroup',
      mixins: [BootstrapMixin],

      getDefaultProps: function () {
        return {
          bsClass: 'button-toolbar'
        };
      },

      render: function () {
        var classes = this.getBsClassSet();

        return this.transferPropsTo(
          React.DOM.div(
            {role:"toolbar",
            className:classSet(classes)}, 
            this.props.children
          )
        );
      }
    });

    __exports__["default"] = ButtonGroup;
  });
define('../amd/ButtonToolbar',['./transpiled/ButtonToolbar'], function (ButtonToolbar) {
  return ButtonToolbar.default;
});
define(
  '../amd/transpiled/DropdownStateMixin',["./react-es6","exports"],
  function(__dependency1__, __exports__) {
    
    var React = __dependency1__["default"];

    var DropdownStateMixin = {
      getInitialState: function () {
        return {
          open: false
        };
      },

      setDropdownState: function (newState, onStateChangeComplete) {
        if (newState) {
          this.bindRootCloseHandlers();
        } else {
          this.unbindRootCloseHandlers();
        }

        this.setState({
          open: newState
        }, onStateChangeComplete);
      },

      handleKeyUp: function (e) {
        if (e.keyCode === 27) {
          this.setDropdownState(false);
        }
      },

      handleClickOutside: function () {
        this.setDropdownState(false);
      },

      bindRootCloseHandlers: function () {
        document.addEventListener('click', this.handleClickOutside);
        document.addEventListener('keyup', this.handleKeyUp);
      },

      unbindRootCloseHandlers: function () {
        document.removeEventListener('click', this.handleClickOutside);
        document.removeEventListener('keyup', this.handleKeyUp);
      },

      componentWillUnmount: function () {
        this.unbindRootCloseHandlers();
      }
    };

    __exports__["default"] = DropdownStateMixin;
  });
define(
  '../amd/transpiled/DropdownMenu',["./react-es6","./react-es6/lib/cx","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var utils = __dependency3__["default"];

    var DropdownMenu = React.createClass({displayName: 'DropdownMenu',
      propTypes: {
        pullRight: React.PropTypes.bool,
        onSelect: React.PropTypes.func
      },

      render: function () {
        var classes = {
            'dropdown-menu': true,
            'dropdown-menu-right': this.props.pullRight
          };

        return this.transferPropsTo(
            React.DOM.ul(
              {className:classSet(classes),
              role:"menu"}, 
              utils.modifyChildren(this.props.children, this.renderMenuItem)
            )
          );
      },

      renderMenuItem: function (child) {
        return utils.cloneWithProps(
          child,
          {
            // Capture onSelect events
            onSelect: utils.createChainedFunction(child.props.onSelect, this.props.onSelect),

            // Force special props to be transferred
            key: child.props.key,
            ref: child.props.ref
          }
        );
      }
    });

    __exports__["default"] = DropdownMenu;
  });
define(
  '../amd/transpiled/DropdownButton',["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./DropdownStateMixin","./Button","./ButtonGroup","./DropdownMenu","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var DropdownStateMixin = __dependency4__["default"];
    var Button = __dependency5__["default"];
    var ButtonGroup = __dependency6__["default"];
    var DropdownMenu = __dependency7__["default"];


    var DropdownButton = React.createClass({displayName: 'DropdownButton',
      mixins: [BootstrapMixin, DropdownStateMixin],

      propTypes: {
        pullRight:    React.PropTypes.bool,
        title:    React.PropTypes.renderable,
        href:     React.PropTypes.string,
        onClick:  React.PropTypes.func,
        onSelect: React.PropTypes.func
      },

      render: function () {
        var groupClasses = {
            'open': this.state.open,
            'dropup': this.props.dropup
          };

        var className = this.props.className ?
          this.props.className + ' dropdown-toggle' : 'dropdown-toggle';

        return (
          ButtonGroup(
            {bsSize:this.props.bsSize,
            className:classSet(groupClasses)}, 
            Button(
              {ref:"dropdownButton",
              href:this.props.href,
              bsStyle:this.props.bsStyle,
              className:className,
              onClick:this.handleOpenClick}, 
              this.props.title,' ',
              React.DOM.span( {className:"caret"} )
            ),

            DropdownMenu(
              {ref:"menu",
              'aria-labelledby':this.props.id,
              onSelect:this.handleOptionSelect,
              pullRight:this.props.pullRight}, 
              this.props.children
            )
          )
        );
      },

      handleOpenClick: function () {
        this.setDropdownState(true);
      },

      handleOptionSelect: function (key) {
        if (this.props.onSelect) {
          this.props.onSelect(key);
        }

        this.setDropdownState(false);
      }
    });

    __exports__["default"] = DropdownButton;
  });
define('../amd/DropdownButton',['./transpiled/DropdownButton'], function (DropdownButton) {
  return DropdownButton.default;
});
define('../amd/DropdownMenu',['./transpiled/DropdownMenu'], function (DropdownMenu) {
  return DropdownMenu.default;
});
define('../amd/DropdownStateMixin',['./transpiled/DropdownStateMixin'], function (DropdownStateMixin) {
  return DropdownStateMixin.default;
});
define(
  '../amd/transpiled/FadeMixin',["./react-es6","exports"],
  function(__dependency1__, __exports__) {
    
    var React = __dependency1__["default"];

    // TODO: listen for onTransitionEnd to remove el
    __exports__["default"] = {
      _fadeIn: function () {
        var els;

        if (this.isMounted()) {
          els = this.getDOMNode().querySelectorAll('.fade');
          if (els.length) {
            Array.prototype.forEach.call(els, function (el) {
              el.className += ' in';
            });
          }
        }
      },

      _fadeOut: function () {
        var els = this._fadeOutEl.querySelectorAll('.fade.in');

        if (els.length) {
          Array.prototype.forEach.call(els, function (el) {
            el.className = el.className.replace(/\bin\b/, '');
          });
        }

        setTimeout(this._handleFadeOutEnd, 300);
      },

      _handleFadeOutEnd: function () {
        if (this._fadeOutEl && this._fadeOutEl.parentNode) {
          this._fadeOutEl.parentNode.removeChild(this._fadeOutEl);
        }
      },

      componentDidMount: function () {
        if (document.querySelectorAll) {
          // Firefox needs delay for transition to be triggered
          setTimeout(this._fadeIn, 20);
        }
      },

      componentWillUnmount: function () {
        var els = this.getDOMNode().querySelectorAll('.fade');
        if (els.length) {
          this._fadeOutEl = document.createElement('div');
          document.body.appendChild(this._fadeOutEl);
          this._fadeOutEl.innerHTML = this.getDOMNode().innerHTML;
          // Firefox needs delay for transition to be triggered
          setTimeout(this._fadeOut, 20);
        }
      }
    };
  });
define('../amd/FadeMixin',['./transpiled/FadeMixin'], function (FadeMixin) {
  return FadeMixin.default;
});
define(
  '../amd/transpiled/Input',["./react-es6","./react-es6/lib/cx","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];

    var INPUT_TYPES = [
      'text',
      'password',
      'datetime',
      'datetime-local',
      'date',
      'month',
      'time',
      'week',
      'number',
      'email',
      'url',
      'search',
      'tel',
      'color'
    ];

    var Input = React.createClass({displayName: 'Input',
      propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.oneOf(INPUT_TYPES).isRequired,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        label: React.PropTypes.string,
        required: React.PropTypes.bool,
        oneOf: React.PropTypes.array
        //minLength: React.PropTypes.int
      },

      getValue: function () {
        return this.refs.input.getDOMNode().value;
      },

      renderInput: function () {
        var classes = {
          'form-control': true,
          'input-md': true
        };

        return (
          React.DOM.input(
            {id:this.props.id,
            type:this.props.type,
            className:classSet(classes),
            placeholder:this.props.placeholder,
            ref:"input"}
          )
        );
      },

      renderLabel: function () {
        return this.props.label ? React.DOM.label( {for:this.props.id}, this.props.label) : null;
      },

      render: function () {
        var classes = {
          'form-group': true,
          'has-error': !!this.state.error
        };

        return (
          React.DOM.div( {className:classSet(classes), onBlur:this.handleBlur, onFocus:this.handleFocus}, 
            this.renderInput(),
            this.renderLabel()
          )
        );
      },

      handleBlur: function (e) {
        var value = this.getValue();
        var error;

        if (this.props.required && !value) {
          error = 'required';
        } else if (this.props.oneOf && !(value in this.props.oneOf)) {
          error = 'oneOf';
        } else if (this.props.minLength && value.length < this.props.minLength) {
          error = 'minLength';
        }

        this.setState({
          error: error
        });
      },

      handleFocus: function(e) {
        this.setState({
          error: false
        });

        e.stopPropagation();
      }
    });

    __exports__["default"] = Input;
  });
define('../amd/Input',['./transpiled/Input'], function (Input) {
  return Input.default;
});
define(
  '../amd/transpiled/Interpolate',["./react-es6","./react-es6/lib/invariant","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    
    // https://www.npmjs.org/package/react-interpolate-component
    

    var React = __dependency1__["default"];
    var invariant = __dependency2__["default"];
    var utils = __dependency3__["default"];

    function isString(object) {
      return Object.prototype.toString.call(object) === '[object String]';
    }

    var REGEXP = /\%\((.+?)\)s/;

    var Interpolate = React.createClass({
      displayName: 'Interpolate',

      getDefaultProps: function() {
        return { component: React.DOM.span };
      },

      render: function() {
        var format = this.props.children || this.props.format;
        var parent = this.props.component;
        var unsafe = this.props.unsafe === true;
        var props  = utils.extend({}, this.props);

        delete props.children;
        delete props.format;
        delete props.component;
        delete props.unsafe;

        invariant(isString(format), 'Interpolate expects either a format string as only child or a `format` prop with a string value');

        if (unsafe) {
          var content = format.split(REGEXP).reduce(function(memo, match, index) {
            var html;

            if (index % 2 === 0) {
              html = match;
            } else {
              html = props[match];
              delete props[match];
            }

            if (React.isValidComponent(html)) {
              throw new Error('cannot interpolate a React component into unsafe text');
            }

            memo += html;

            return memo;
          }, '');

          props.dangerouslySetInnerHTML = { __html: content };

          return parent(props);
        } else {
          var args = format.split(REGEXP).reduce(function(memo, match, index) {
            var child;

            if (index % 2 === 0) {
              if (match.length === 0) {
                return memo;
              }

              child = match;
            } else {
              child = props[match];
              delete props[match];
            }

            memo.push(child);

            return memo;
          }, [props]);

          return parent.apply(null, args);
        }
      }
    });

    __exports__["default"] = Interpolate;
  });
define('../amd/Interpolate',['./transpiled/Interpolate'], function (Interpolate) {
  return Interpolate.default;
});
define(
  '../amd/transpiled/MenuItem',["./react-es6","./react-es6/lib/cx","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];

    var MenuItem = React.createClass({displayName: 'MenuItem',
      propTypes: {
        header:   React.PropTypes.bool,
        divider:  React.PropTypes.bool,
        href:     React.PropTypes.string,
        title:    React.PropTypes.string,
        onSelect: React.PropTypes.func
      },

      getDefaultProps: function () {
        return {
          href: '#'
        };
      },

      handleClick: function (e) {
        if (this.props.onSelect) {
          e.preventDefault();
          this.props.onSelect(this.props.key);
        }
      },

      renderAnchor: function () {
        return (
          React.DOM.a( {onClick:this.handleClick, href:this.props.href, title:this.props.title, tabIndex:"-1"}, 
            this.props.children
          )
        );
      },

      render: function () {
        var classes = {
            'dropdown-header': this.props.header,
            'divider': this.props.divider
          };

        var children = null;
        if (this.props.header) {
          children = this.props.children;
        } else if (!this.props.divider) {
          children = this.renderAnchor();
        }

        return this.transferPropsTo(
          React.DOM.li( {role:"presentation", title:null, href:null, className:classSet(classes)}, 
            children
          )
        );
      }
    });

    __exports__["default"] = MenuItem;
  });
define('../amd/MenuItem',['./transpiled/MenuItem'], function (MenuItem) {
  return MenuItem.default;
});
define(
  '../amd/transpiled/Modal',["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./FadeMixin","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var FadeMixin = __dependency4__["default"];


    // TODO:
    // - aria-labelledby
    // - Add `modal-body` div if only one child passed in that doesn't already have it
    // - Tests

    var Modal = React.createClass({displayName: 'Modal',
      mixins: [BootstrapMixin, FadeMixin],

      getDefaultProps: function () {
        return {
          bsClass: 'modal',
          backdrop: true,
          keyboard: true,
          animation: true
        };
      },

      componentDidMount: function () {
        document.addEventListener('keyup', this.handleKeyUp);
      },

      componentWillUnmount: function () {
        document.removeEventListener('keyup', this.handleKeyUp);
      },

      killClick: function (e) {
        e.stopPropagation();
      },

      handleBackdropClick: function () {
        this.props.onRequestHide();
      },

      handleKeyUp: function (e) {
        if (this.props.keyboard && e.keyCode === 27) {
          this.props.onRequestHide();
        }
      },

      render: function () {
        var classes = this.getBsClassSet();

        classes['fade'] = this.props.animation;
        classes['in'] = !this.props.animation || !document.querySelectorAll;

        var modal = this.transferPropsTo(
          React.DOM.div(
            {bsClass:"modal",
            tabIndex:"-1",
            role:"dialog",
            style:{display: 'block'},
            className:classSet(classes),
            onClick:this.handleBackdropClick,
            ref:"modal"}
          , 
            React.DOM.div( {className:"modal-dialog"}, 
              React.DOM.div( {className:"modal-content", onClick:this.killClick}, 
                this.props.title ? this.renderHeader() : null,
                this.props.children
              )
            )
          )
        );

        return this.props.backdrop ?
          this.renderBackdrop(modal) : modal;
      },

      renderBackdrop: function (modal) {
        var classes = {
          'modal-backdrop': true,
          'fade': this.props.animation
        };

        classes['in'] = !this.props.animation || !document.querySelectorAll;

        return (
          React.DOM.div(null, 
            React.DOM.div( {className:classSet(classes), ref:"backdrop"} ),
            modal
          )
        );
      },

      renderHeader: function () {
        return (
          React.DOM.div( {className:"modal-header"}, 
            React.DOM.button( {type:"button", className:"close", 'aria-hidden':"true", onClick:this.props.onRequestHide}, "×"),
            this.renderTitle()
          )
        );
      },

      renderTitle: function () {
        return (
          React.isValidComponent(this.props.title) ?
            this.props.title : React.DOM.h4( {className:"modal-title"}, this.props.title)
        );
      }
    });

    __exports__["default"] = Modal;
  });
define('../amd/Modal',['./transpiled/Modal'], function (Modal) {
  return Modal.default;
});
define(
  '../amd/transpiled/Nav',["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var utils = __dependency4__["default"];


    var Nav = React.createClass({displayName: 'Nav',
      mixins: [BootstrapMixin],

      propTypes: {
        bsStyle: React.PropTypes.oneOf(['tabs','pills']),
        stacked: React.PropTypes.bool,
        justified: React.PropTypes.bool,
        onSelect: React.PropTypes.func
      },

      getDefaultProps: function () {
        return {
          bsClass: 'nav'
        };
      },

      render: function () {
        var classes = this.getBsClassSet();

        classes['nav-stacked'] = this.props.stacked;
        classes['nav-justified'] = this.props.justified;

        return this.transferPropsTo(
          React.DOM.nav(null, 
            React.DOM.ul( {className:classSet(classes)}, 
              utils.modifyChildren(this.props.children, this.renderNavItem)
            )
          )
        );
      },

      getChildActiveProp: function (child) {
        if (child.props.active) {
          return true;
        }
        if (this.props.activeKey != null) {
          if (child.props.key === this.props.activeKey) {
            return true;
          }
        }
        if (this.props.activeHref != null) {
          if (child.props.href === this.props.activeHref) {
            return true;
          }
        }

        return child.props.active;
      },

      renderNavItem: function (child) {
        return utils.cloneWithProps(
          child,
          {
            active: this.getChildActiveProp(child),
            activeKey: this.props.activeKey,
            activeHref: this.props.activeHref,
            onSelect: utils.createChainedFunction(child.onSelect, this.props.onSelect),
            ref: child.props.ref,
            key: child.props.key
          }
        );
      }
    });

    __exports__["default"] = Nav;
  });
define('../amd/Nav',['./transpiled/Nav'], function (Nav) {
  return Nav.default;
});
define(
  '../amd/transpiled/NavItem',["./react-es6","./react-es6/lib/cx","./BootstrapMixin","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];

    var NavItem = React.createClass({displayName: 'NavItem',
      mixins: [BootstrapMixin],

      propTypes: {
        onSelect: React.PropTypes.func,
        active: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        href: React.PropTypes.string,
        title: React.PropTypes.string
      },

      getDefaultProps: function () {
        return {
          href: '#'
        };
      },

      render: function () {
        var classes = {
          'active': this.props.active,
          'disabled': this.props.disabled
        };

        return this.transferPropsTo(
          React.DOM.li( {className:classSet(classes)}, 
            React.DOM.a(
              {href:this.props.href,
              title:this.props.title,
              onClick:this.handleClick,
              ref:"anchor"}, 
              this.props.children
            )
          )
        );
      },

      handleClick: function (e) {
        if (this.props.onSelect) {
          e.preventDefault();

          if (!this.props.disabled) {
            this.props.onSelect(this.props.key,this.props.href);
          }
        }
      }
    });

    __exports__["default"] = NavItem;
  });
define('../amd/NavItem',['./transpiled/NavItem'], function (NavItem) {
  return NavItem.default;
});
define(
  '../amd/transpiled/OverlayTriggerMixin',["./react-es6","exports"],
  function(__dependency1__, __exports__) {
    
    var React = __dependency1__["default"];

    __exports__["default"] = {
      componentWillUnmount: function () {
        this._unrenderOverlay();
        document.body.removeChild(this._overlayTarget);
        this._overlayTarget = null;
      },

      componentDidUpdate: function () {
        this._renderOverlay();
      },

      componentDidMount: function () {
        this._renderOverlay();
      },

      _mountOverlayTarget: function () {
        this._overlayTarget = document.createElement('div');
        document.body.appendChild(this._overlayTarget);
      },

      _renderOverlay: function () {
        if (!this._overlayTarget) {
          this._mountOverlayTarget();
        }

        // Save reference to help testing
        this._overlayInstance = React.renderComponent(this.renderOverlay(), this._overlayTarget);
      },

      _unrenderOverlay: function () {
        React.unmountComponentAtNode(this._overlayTarget);
        this._overlayInstance = null;
      }
    };
  });
define(
  '../amd/transpiled/OverlayTrigger',["./react-es6","./react-es6/lib/cloneWithProps","./OverlayTriggerMixin","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var cloneWithProps = __dependency2__["default"];
    var OverlayTriggerMixin = __dependency3__["default"];

    var OverlayTrigger = React.createClass({displayName: 'OverlayTrigger',
        mixins: [OverlayTriggerMixin],

        getDefaultProps: function () {
            return {
                trigger: 'click'
            };
        },

        getInitialState: function() {
            return {
                isOverlayShown: (this.props.defaultOverlayShown == null) ?
                    false : this.props.defaultOverlayShown
            };
        },

        show: function () {
            this.setState({
                isOverlayShown: true
            });
        },

        hide: function () {
            this.setState({
                isOverlayShown: false
            });
        },

        toggle: function () {
            this.setState({
                isOverlayShown: !this.state.isOverlayShown
            });
        },

        _trigger: function () {
            var propName = 'delay' + (this.state.isOverlayShown ? 'Hide' : 'Show'),
                delay = this.props[propName] || this.props.delay;

            clearTimeout(this._triggerTimeout);
            if (delay) {
                this._triggerTimeout = setTimeout(this.toggle, parseInt(delay, 10));
            } else {
                this.toggle();
            }
        },

        renderOverlay: function() {
            var props;

            if (!this.state.isOverlayShown || !this.props.overlay) {
                return React.DOM.span(null );
            }

            props = {
                onRequestHide: this._trigger
            };

            if (this.props.animation != null) {
                props.animation = this.props.animation;
            }

            return cloneWithProps(
                this.props.overlay,
                props
            );
        },

        render: function() {
            return (this.props.children) ?
                this.renderTrigger() : React.DOM.span(null );
        },

        renderTrigger: function () {
            var props = {},
                trigger = this.props.trigger,
                propName;

            if (trigger !== 'manual') {
                if (trigger === 'hover') {
                    trigger = 'mouseOver';
                }
                propName = 'on' + trigger.substr(0, 1).toUpperCase() +
                    trigger.substr(1);
                props[propName] = this._trigger;
            }

            return React.DOM.span(
                props,
                this.props.children
            );
        }
    });

    __exports__["default"] = OverlayTrigger;
  });
define('../amd/OverlayTrigger',['./transpiled/OverlayTrigger'], function (OverlayTrigger) {
  return OverlayTrigger.default;
});
define('../amd/OverlayTriggerMixin',['./transpiled/OverlayTriggerMixin'], function (OverlayTriggerMixin) {
  return OverlayTriggerMixin.default;
});
define(
  '../amd/transpiled/react-es6/lib/ExecutionEnvironment',["exports"],
  function(__exports__) {
    
    /**
     * Copyright 2013-2014 Facebook, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * @providesModule ExecutionEnvironment
     */

    /*jslint evil: true */

    

    var canUseDOM = typeof window !== 'undefined';

    /**
     * Simple, lightweight module assisting with the detection and context of
     * Worker. Helps avoid circular dependencies and allows code to reason about
     * whether or not they are in a Worker, even if they never include the main
     * `ReactWorker` dependency.
     */
    var ExecutionEnvironment = {

      canUseDOM: canUseDOM,

      canUseWorkers: typeof Worker !== 'undefined',

      canUseEventListeners:
        canUseDOM && (window.addEventListener || window.attachEvent),

      isInWorker: !canUseDOM // For now, this is true - might change in the future.

    };

    __exports__["default"] = ExecutionEnvironment;
  });
define(
  '../amd/transpiled/react-es6/lib/ReactTransitionEvents',["./ExecutionEnvironment","exports"],
  function(__dependency1__, __exports__) {
    
    /**
     * Copyright 2013-2014 Facebook, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * @providesModule ReactTransitionEvents
     */

    

    var ExecutionEnvironment = __dependency1__["default"];

    var EVENT_NAME_MAP = {
      transitionend: {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'mozTransitionEnd',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd'
      },

      animationend: {
        'animation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd',
        'MozAnimation': 'mozAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd'
      }
    };

    var endEvents = [];

    function detectEvents() {
      var testEl = document.createElement('div');
      var style = testEl.style;
      for (var baseEventName in EVENT_NAME_MAP) {
        var baseEvents = EVENT_NAME_MAP[baseEventName];
        for (var styleName in baseEvents) {
          if (styleName in style) {
            endEvents.push(baseEvents[styleName]);
            break;
          }
        }
      }
    }

    if (ExecutionEnvironment.canUseDOM) {
      detectEvents();
    }

    // We use the raw {add|remove}EventListener() call because EventListener
    // does not know how to remove event listeners and we really should
    // clean up. Also, these events are not triggered in older browsers
    // so we should be A-OK here.

    function addEventListener(node, eventName, eventListener) {
      node.addEventListener(eventName, eventListener, false);
    }

    function removeEventListener(node, eventName, eventListener) {
      node.removeEventListener(eventName, eventListener, false);
    }

    var ReactTransitionEvents = {
      addEndEventListener: function(node, eventListener) {
        if (endEvents.length === 0) {
          // If CSS transitions are not supported, trigger an "end animation"
          // event immediately.
          window.setTimeout(eventListener, 0);
          return;
        }
        endEvents.forEach(function(endEvent) {
          addEventListener(node, endEvent, eventListener);
        });
      },

      removeEndEventListener: function(node, eventListener) {
        if (endEvents.length === 0) {
          return;
        }
        endEvents.forEach(function(endEvent) {
          removeEventListener(node, endEvent, eventListener);
        });
      }
    };

    __exports__["default"] = ReactTransitionEvents;
  });
define(
  '../amd/transpiled/Panel',["./react-es6","./react-es6/lib/cx","./react-es6/lib/ReactTransitionEvents","./BootstrapMixin","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var ReactTransitionEvents = __dependency3__["default"];
    var BootstrapMixin = __dependency4__["default"];
    var utils = __dependency5__["default"];

    var Panel = React.createClass({displayName: 'Panel',
      mixins: [BootstrapMixin],

      propTypes: {
        header: React.PropTypes.renderable,
        footer: React.PropTypes.renderable,
        isCollapsable: React.PropTypes.bool,
        isOpen: React.PropTypes.bool,
        onClick: React.PropTypes.func
      },

      getDefaultProps: function () {
        return {
          bsClass: 'panel',
          bsStyle: 'default'
        };
      },

      getInitialState: function() {
        return {
          isOpen: this.props.defaultOpen != null ? this.props.defaultOpen : null,
          isCollapsing: false
        };
      },

      handleSelect: function (e) {
        if (this.props.onSelect) {
          this._isChanging = true;
          this.props.onSelect(this.props.key);
          this._isChanging = false;
        }

        e.preventDefault();

        this.setState({
          isOpen: !this.state.isOpen
        });
      },

      shouldComponentUpdate: function () {
        return !this._isChanging;
      },

      handleTransitionEnd: function () {
        this._collapseEnd = true;
        this.setState({
          collapsePhase: 'end',
          isCollapsing: false
        });
      },

      componentWillReceiveProps: function (newProps) {
        if (newProps.isOpen !== this.props.isOpen) {
          this._collapseEnd = false;
          this.setState({
            collapsePhase: 'start',
            isCollapsing: true
          });
        }
      },

      _addEndTransitionListener: function () {
        if (this.refs && this.refs.panel) {
          ReactTransitionEvents.addEndEventListener(
            this.refs.panel.getDOMNode(),
            this.handleTransitionEnd
          );
        }
      },

      _removeEndTransitionListener: function () {
        if (this.refs && this.refs.panel) {
          ReactTransitionEvents.addEndEventListener(
            this.refs.panel.getDOMNode(),
            this.handleTransitionEnd
          );
        }
      },

      componentDidMount: function () {
        this._afterRender();
      },

      componentWillUnmount: function () {
        this._removeEndTransitionListener();
      },

      componentWillUpdate: function (nextProps) {
        this._removeEndTransitionListener();
        if (nextProps.isOpen !== this.props.isOpen && this.props.isOpen) {
          this.refs.panel.getDOMNode().style.height = this._getBodyHeight() + 'px';
        }
      },

      componentDidUpdate: function () {
        this._afterRender();
      },

      _afterRender: function () {
        this._addEndTransitionListener();
        setTimeout(this._updateHeightAfterRender, 0);
      },

      _getBodyHeight: function () {
        return this.refs.body.getDOMNode().offsetHeight;
      },

      _updateHeightAfterRender: function () {
        if (this.isMounted() && this.refs && this.refs.panel) {
          this.refs.panel.getDOMNode().style.height = this.isOpen() ?
            this._getBodyHeight() + 'px' : '0px';
        }
      },

      isOpen: function () {
        return (this.props.isOpen != null) ? this.props.isOpen : this.state.isOpen;
      },

      render: function () {
        var classes = this.getBsClassSet();
        classes['panel'] = true;

        return this.transferPropsTo(
          React.DOM.div( {className:classSet(classes), id:this.props.isCollapsable ? null : this.props.id}, 
            this.renderHeading(),
            this.props.isCollapsable ? this.renderCollapsableBody() : this.renderBody(),
            this.renderFooter()
          )
        );
      },

      renderCollapsableBody: function () {
        var classes = {
              'panel-collapse': true,
              'collapsing': this.state.isCollapsing,
              'collapse': !this.state.isCollapsing,
              'in': this.isOpen() && !this.state.isCollapsing
            };


        return (
          React.DOM.div( {className:classSet(classes), id:this.props.id, ref:"panel"}, 
            this.renderBody()
          )
        );
      },

      renderBody: function () {
        return (
          React.DOM.div( {className:"panel-body", ref:"body"}, 
            this.props.children
          )
        );
      },

      renderHeading: function () {
        var header = this.props.header;

        if (!header) {
          return null;
        }

        if (!React.isValidComponent(header) || Array.isArray(header)) {
          header = this.props.isCollapsable ?
            this.renderCollapsableTitle(header) : header;
        } else if (this.props.isCollapsable) {
          header = utils.cloneWithProps(header, {
            className: 'panel-title',
            children: this.renderAnchor(header.props.children)
          });
        } else {
          header = utils.cloneWithProps(header, {
            className: 'panel-title'
          });
        }

        return (
          React.DOM.div( {className:"panel-heading"}, 
            header
          )
        );
      },

      renderAnchor: function (header) {
        return (
          React.DOM.a(
            {href:'#' + (this.props.id || ''),
            className:this.isOpen() ? null : 'collapsed',
            onClick:this.handleSelect}, 
            header
          )
        );
      },

      renderCollapsableTitle: function (header) {
        return (
          React.DOM.h4( {className:"panel-title"}, 
            this.renderAnchor(header)
          )
        );
      },

      renderFooter: function () {
        if (!this.props.footer) {
          return null;
        }

        return (
          React.DOM.div( {className:"panel-footer"}, 
            this.props.footer
          )
        );
      }
    });

    __exports__["default"] = Panel;
  });
define('../amd/Panel',['./transpiled/Panel'], function (Panel) {
  return Panel.default;
});
define('../amd/PanelGroup',['./transpiled/PanelGroup'], function (PanelGroup) {
  return PanelGroup.default;
});
define(
  '../amd/transpiled/ProgressBar',["./react-es6","./react-es6/lib/cx","./Interpolate","./BootstrapMixin","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var Interpolate = __dependency3__["default"];
    var BootstrapMixin = __dependency4__["default"];
    var utils = __dependency5__["default"];


    var ProgressBar = React.createClass({displayName: 'ProgressBar',
      propTypes: {
        min: React.PropTypes.number,
        now: React.PropTypes.number,
        max: React.PropTypes.number,
        label: React.PropTypes.string,
        srOnly: React.PropTypes.bool,
        striped: React.PropTypes.bool,
        active: React.PropTypes.bool
      },

      mixins: [BootstrapMixin],

      getDefaultProps: function () {
        return {
          bsClass: 'progress-bar',
          min: 0,
          max: 100
        };
      },

      getPercentage: function (now, min, max) {
        return Math.ceil((now - min) / (max - min) * 100);
      },

      render: function () {
        var classes = {
            progress: true
          };

        if (this.props.active) {
          classes['progress-striped'] = true;
          classes['active'] = true;
        } else if (this.props.striped) {
          classes['progress-striped'] = true;
        }

        if (!this.props.children) {
          if (!this.props.isChild) {
            return this.transferPropsTo(
              React.DOM.div( {className:classSet(classes)}, 
                this.renderProgressBar()
              )
            );
          } else {
            return this.transferPropsTo(
              this.renderProgressBar()
            );
          }
        } else {
          return this.transferPropsTo(
            React.DOM.div( {className:classSet(classes)}, 
              utils.modifyChildren(this.props.children, this.renderChildBar)
            )
          );
        }
      },

      renderChildBar: function (child) {
        return utils.cloneWithProps(child, {
          isChild: true,
          key: child.props.key,
          ref: child.props.ref
        });
      },

      renderProgressBar: function () {
        var percentage = this.getPercentage(
            this.props.now,
            this.props.min,
            this.props.max
          );

        var label;

        if (this.props.label) {
          label = this.props.srOnly ?
            this.renderScreenReaderOnlyLabel(percentage) : this.renderLabel(percentage);
        }

        return (
          React.DOM.div( {className:classSet(this.getBsClassSet()), role:"progressbar",
            style:{width: percentage + '%'},
            'aria-valuenow':this.props.now,
            'aria-valuemin':this.props.min,
            'aria-valuemax':this.props.max}, 
            label
          )
        );
      },

      renderLabel: function (percentage) {
        var InterpolateClass = this.props.interpolateClass || Interpolate;

        return (
          InterpolateClass(
            {now:this.props.now,
            min:this.props.min,
            max:this.props.max,
            percent:percentage,
            bsStyle:this.props.bsStyle}, 
            this.props.label
          )
        );
      },

      renderScreenReaderOnlyLabel: function (percentage) {
        return (
          React.DOM.span( {className:"sr-only"}, 
            this.renderLabel(percentage)
          )
        );
      }
    });

    __exports__["default"] = ProgressBar;
  });
define('../amd/ProgressBar',['./transpiled/ProgressBar'], function (ProgressBar) {
  return ProgressBar.default;
});
define(
  '../amd/transpiled/SplitButton',["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./DropdownStateMixin","./utils","./Button","./ButtonGroup","./DropdownMenu","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __exports__) {
    
    /** @jsx React.DOM */
    /* global document */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var DropdownStateMixin = __dependency4__["default"];
    var utils = __dependency5__["default"];
    var Button = __dependency6__["default"];
    var ButtonGroup = __dependency7__["default"];
    var DropdownMenu = __dependency8__["default"];

    var SplitButton = React.createClass({displayName: 'SplitButton',
      mixins: [BootstrapMixin, DropdownStateMixin],

      propTypes: {
        pullRight:         React.PropTypes.bool,
        title:         React.PropTypes.renderable,
        href:          React.PropTypes.string,
        dropdownTitle: React.PropTypes.renderable,
        onClick:       React.PropTypes.func,
        onSelect:      React.PropTypes.func
      },

      getDefaultProps: function () {
        return {
          dropdownTitle: 'Toggle dropdown'
        };
      },

      render: function () {
        var groupClasses = {
            'open': this.state.open,
            'dropup': this.props.dropup
          };

        return (
          ButtonGroup(
            {bsSize:this.props.bsSize,
            className:classSet(groupClasses)}, 
            Button(
              {ref:"button",
              href:this.props.href,
              bsStyle:this.props.bsStyle,
              onClick:this.props.onClick}, 
              this.props.title
            ),

            Button(
              {ref:"dropdownButton",
              bsStyle:this.props.bsStyle,
              className:"dropdown-toggle",
              onClick:this.handleOpenClick}, 
              React.DOM.span( {className:"sr-only"}, this.props.dropdownTitle),
              React.DOM.span( {className:"caret"} )
            ),

            DropdownMenu(
              {ref:"menu",
              onSelect:this.handleOptionSelect,
              'aria-labelledby':this.props.id,
              pullRight:this.props.pullRight}, 
              this.props.children
            )
          )
        );
      },

      handleOpenClick: function (e) {
        e.preventDefault();

        this.setDropdownState(true);
      },

      handleOptionSelect: function (key) {
        if (this.props.onSelect) {
          this.props.onSelect(key);
        }

        this.setDropdownState(false);
      }
    });

    __exports__["default"] = SplitButton;
  });
define('../amd/SplitButton',['./transpiled/SplitButton'], function (SplitButton) {
  return SplitButton.default;
});
define(
  '../amd/transpiled/SubNav',["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var utils = __dependency4__["default"];


    var SubNav = React.createClass({displayName: 'SubNav',
      mixins: [BootstrapMixin],

      propTypes: {
        onSelect: React.PropTypes.func,
        active: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        href: React.PropTypes.string,
        title: React.PropTypes.string,
        text: React.PropTypes.renderable,
      },

      getDefaultProps: function () {
        return {
          bsClass: 'nav'
        };
      },

      handleClick: function (e) {
        if (this.props.onSelect) {
          e.preventDefault();

          if (!this.props.disabled) {
            this.props.onSelect(this.props.key, this.props.href);
          }
        }
      },

      isActive: function () {
        return this.isChildActive(this);
      },

      isChildActive: function (child) {
        var isActive = false;

        if (child.props.active) {
          return true;
        }

        if (this.props.activeKey != null && this.props.activeKey === child.props.key) {
          return true;
        }

        if (this.props.activeHref != null && this.props.activeHref === child.props.href) {
          return true;
        }

        if (child.props.children) {
          React.Children.forEach(
            child.props.children,
            function (child) {
              if (this.isChildActive(child)) {
                isActive = true;
              }
            },
            this
          );

          return isActive;
        }

        return false;
      },

      getChildActiveProp: function (child) {
        if (child.props.active) {
          return true;
        }
        if (this.props.activeKey != null) {
          if (child.props.key === this.props.activeKey) {
            return true;
          }
        }
        if (this.props.activeHref != null) {
          if (child.props.href === this.props.activeHref) {
            return true;
          }
        }

        return child.props.active;
      },

      render: function () {
        var classes = {
          'active': this.isActive(),
          'disabled': this.props.disabled
        };

        return this.transferPropsTo(
          React.DOM.li( {className:classSet(classes)}, 
            React.DOM.a(
              {href:this.props.href,
              title:this.props.title,
              onClick:this.handleClick,
              ref:"anchor"}, 
              this.props.text
            ),
            React.DOM.ul( {className:"nav"}, 
              utils.modifyChildren(this.props.children, this.renderNavItem)
            )
          )
        );
      },

      renderNavItem: function (child) {
        return utils.cloneWithProps(
          child,
          {
            active: this.getChildActiveProp(child),
            onSelect: utils.createChainedFunction(child.onSelect, this.props.onSelect),
            ref: child.props.ref,
            key: child.props.key
          }
        );
      }
    });

    __exports__["default"] = SubNav;
  });
define('../amd/SubNav',['./transpiled/SubNav'], function (SubNav) {
  return SubNav.default;
});
define(
  '../amd/transpiled/TabbedArea',["./react-es6","./BootstrapMixin","./utils","./Nav","./NavItem","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var BootstrapMixin = __dependency2__["default"];
    var utils = __dependency3__["default"];
    var Nav = __dependency4__["default"];
    var NavItem = __dependency5__["default"];

    var TabbedArea = React.createClass({displayName: 'TabbedArea',
      mixins: [BootstrapMixin],

      propTypes: {
        onSelect: React.PropTypes.func
      },

      getInitialState: function () {
        var initialActiveKey = this.props.initialActiveKey;

        if (initialActiveKey == null) {
          var children = this.props.children;
          initialActiveKey =
            Array.isArray(children) ? children[0].props.key : children.props.key;
        }

        return {
          activeKey: initialActiveKey
        };
      },

      render: function () {
        var activeKey =
          this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

        function hasTab (child) {
          return !!child.props.tab;
        }

        return this.transferPropsTo(
          React.DOM.div(null, 
            Nav( {bsStyle:"tabs", activeKey:activeKey, onSelect:this.handleSelect, ref:"tabs"}, 
              utils.modifyChildren(utils.filterChildren(this.props.children, hasTab), this.renderTab)
            ),
            React.DOM.div( {id:this.props.id, className:"tab-content", ref:"panes"}, 
              utils.modifyChildren(this.props.children, this.renderPane)
            )
          )
        );
      },

      renderPane: function (child) {
        var activeKey =
          this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;
        return utils.cloneWithProps(
            child,
            {
              active: (child.props.key === activeKey),
              ref: child.props.ref,
              key: child.props.key
            }
          );
      },

      renderTab: function (child) {
        var key = child.props.key;
        return (
          NavItem(
            {ref:'tab' + key,
            key:key}, 
            child.props.tab
          )
        );
      },

      shouldComponentUpdate: function() {
        // Defer any updates to this component during the `onSelect` handler.
        return !this._isChanging;
      },

      handleSelect: function (key) {
        if (this.props.onSelect) {
          this._isChanging = true;
          this.props.onSelect(key);
          this._isChanging = false;
        }

        this.setState({
          activeKey: key
        });
      }
    });

    __exports__["default"] = TabbedArea;
  });
define('../amd/TabbedArea',['./transpiled/TabbedArea'], function (TabbedArea) {
  return TabbedArea.default;
});
define(
  '../amd/transpiled/TabPane',["./react-es6","./react-es6/lib/cx","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];

    var TabPane = React.createClass({displayName: 'TabPane',
      render: function () {
        var classes = {
          'tab-pane': true,
          'active': this.props.active
        };

        return this.transferPropsTo(
          React.DOM.div( {className:classSet(classes)}, 
            this.props.children
          )
        );
      }
    });

    __exports__["default"] = TabPane;
  });
define('../amd/TabPane',['./transpiled/TabPane'], function (TabPane) {
  return TabPane.default;
});
/*global define */

define(function (require) {
    

    return {
        Accordion: require('../amd/Accordion'),
        Affix: require('../amd/Affix'),
        Affix: require('../amd/AffixMixin'),
        Alert: require('../amd/Alert'),
        BootstrapMixin: require('../amd/BootstrapMixin'),
        Button: require('../amd/Button'),
        ButtonGroup: require('../amd/ButtonGroup'),
        ButtonToolbar: require('../amd/ButtonToolbar'),
        DropdownButton: require('../amd/DropdownButton'),
        DropdownMenu: require('../amd/DropdownMenu'),
        DropdownStateMixin: require('../amd/DropdownStateMixin'),
        FadeMixin: require('../amd/FadeMixin'),
        Input: require('../amd/Input'),
        Interpolate: require('../amd/Interpolate'),
        MenuItem: require('../amd/MenuItem'),
        Modal: require('../amd/Modal'),
        Nav: require('../amd/Nav'),
        NavItem: require('../amd/NavItem'),
        OverlayTrigger: require('../amd/OverlayTrigger'),
        OverlayTriggerMixin: require('../amd/OverlayTriggerMixin'),
        Panel: require('../amd/Panel'),
        PanelGroup: require('../amd/PanelGroup'),
        ProgressBar: require('../amd/ProgressBar'),
        SplitButton: require('../amd/SplitButton'),
        SubNav: require('../amd/SubNav'),
        TabbedArea: require('../amd/TabbedArea'),
        TabPane: require('../amd/TabPane')
    };
});    //Register in the values from the outer closure for common dependencies
    //as local almond modules
    define('react', function () {
        return React;
    });

    //Use almond's special top-level, synchronous require to trigger factory
    //functions, get the final module value, and export it as the public
    //value.
    return require('react-bootstrap');
}));

//# sourceMappingURL=react-bootstrap.js.map