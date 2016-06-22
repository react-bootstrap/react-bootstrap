import classNames from 'classnames';
import React from 'react';
import all from 'react-prop-types/lib/all';

import { bsClass, getClassSet, prefix } from './utils/bootstrapUtils';

import Button from './Button';

const ButtonGroup = React.createClass({

  propTypes: {
    vertical: React.PropTypes.bool,
    justified: React.PropTypes.bool,
    /**
     * Display block buttons, only useful when used with the "vertical" prop.
     * @type {bool}
     */
    block: all(
      React.PropTypes.bool,
      props => {
        if (props.block && !props.vertical) {
          return new Error('The block property requires the vertical property to be set to have any effect');
        }
      }
    )
  },

  getDefaultProps() {
    return {
      block: false,
      justified: false,
      vertical: false
    };
  },

  render() {
    let classes = getClassSet(this.props);

    classes[prefix(this.props)] = !this.props.vertical;
    classes[prefix(this.props, 'vertical')] = this.props.vertical;
    classes[prefix(this.props, 'justified')] = this.props.justified;

    // this is annoying, since the class is `btn-block` not `btn-group-block`
    classes[prefix(Button.defaultProps, 'block')] = this.props.block;

    return (
      <div
        {...this.props}
        className={classNames(this.props.className, classes)}
      >
        {this.props.children}
      </div>
    );
  }
});

export default bsClass('btn-group', ButtonGroup);
