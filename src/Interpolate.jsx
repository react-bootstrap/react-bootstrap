/** @jsx React.DOM */
// https://www.npmjs.org/package/react-interpolate-component
'use strict';

var React = require('react');
var merge = require('./utils/merge');
var ValidComponentChildren = require('./utils/ValidComponentChildren');

var REGEXP = /\%\((.+?)\)s/;

var Interpolate = React.createClass({
  displayName: 'Interpolate',

  propTypes: {
    format: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {componentClass: 'span'};
  },

  render: function() {
    var format = ValidComponentChildren.hasValidComponent(this.props.children) ? this.props.children : this.props.format;
    var unsafe = this.props.unsafe === true;
    var props = merge(this.props);

    delete props.children;
    delete props.format;
    delete props.unsafe;

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

      return <this.props.componentClass {...props}>{content}</this.props.componentClass>;
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

        return memo + child;
      }, "");

      return <this.props.componentClass {...props}>{args}</this.props.componentClass>;
    }
  }
});

module.exports = Interpolate;
