// https://www.npmjs.org/package/react-interpolate-component
'use strict';

import React          from './react-es6';
import invariant      from './react-es6/lib/invariant';
import utils          from './utils';

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

export default = Interpolate;
