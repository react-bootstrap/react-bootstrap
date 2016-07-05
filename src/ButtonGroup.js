import classNames from 'classnames';
import React from 'react';
import all from 'react-prop-types/lib/all';

import Button from './Button';
import { bsClass, getClassSet, omitBsProps, prefix }
  from './utils/bootstrapUtils';

const propTypes = {
  vertical: React.PropTypes.bool,
  justified: React.PropTypes.bool,

  /**
   * Display block buttons; only useful when used with the "vertical" prop.
   * @type {bool}
   */
  block: all(
    React.PropTypes.bool,
    ({ block, vertical }) => (
      block && !vertical ?
        new Error('`block` requires `vertical` to be set to have any effect') :
        null
    ),
  ),
};

const defaultProps = {
  block: false,
  justified: false,
  vertical: false,
};

class ButtonGroup extends React.Component {
  render() {
    const { block, justified, vertical, className, ...props } = this.props;

    const classes = {
      ...getClassSet(props),
      [prefix(props)]: !vertical,
      [prefix(props, 'vertical')]: vertical,
      [prefix(props, 'justified')]: justified,

      // this is annoying, since the class is `btn-block` not `btn-group-block`
      [prefix(Button.defaultProps, 'block')]: block,
    };

    return (
      <div
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      />
    );
  }
}

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default bsClass('btn-group', ButtonGroup);
