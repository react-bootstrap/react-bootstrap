// https://www.npmjs.org/package/react-interpolate-component
// TODO: Drop this in favor of es6 string interpolation

import React from 'react';
import ValidComponentChildren from './utils/ValidComponentChildren';
import assign from './utils/Object.assign';

const REGEXP = /\%\((.+?)\)s/;

const Interpolate = React.createClass({
  displayName: 'Interpolate',

  propTypes: {
    format: React.PropTypes.string
  },

  getDefaultProps() {
    return { component: 'span' };
  },

  render() {
    let format = (ValidComponentChildren.hasValidComponent(this.props.children) ||
        (typeof this.props.children === 'string')) ?
        this.props.children : this.props.format;
    let parent = this.props.component;
    let unsafe = this.props.unsafe === true;
    let props = assign({}, this.props);

    delete props.children;
    delete props.format;
    delete props.component;
    delete props.unsafe;

    if (unsafe) {
      let content = format.split(REGEXP).reduce(function(memo, match, index) {
        let html;

        if (index % 2 === 0) {
          html = match;
        } else {
          html = props[match];
          delete props[match];
        }

        if (React.isValidElement(html)) {
          throw new Error('cannot interpolate a React component into unsafe text');
        }

        memo += html;

        return memo;
      }, '');

      props.dangerouslySetInnerHTML = { __html: content };

      return React.createElement(parent, props);
    } else {
      let kids = format.split(REGEXP).reduce(function(memo, match, index) {
        let child;

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
      }, []);

      return React.createElement(parent, props, kids);
    }
  }
});

export default Interpolate;
