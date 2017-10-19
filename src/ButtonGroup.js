import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import all from 'prop-types-extra/lib/all';
import deprecated from 'prop-types-extra/lib/deprecated';

import Button from './Button';
import { bsClass, getClassSet, prefix, splitBsProps }
  from './utils/bootstrapUtils';

const propTypes = {
  vertical: PropTypes.bool,
  justified: PropTypes.bool,

  /**
   * Display block buttons; only useful when used with the "vertical" prop.
   * @type {bool}
   * @private
   */
  block: all(
    PropTypes.bool,
    ({ block, vertical }) => (
      block && !vertical ?
        new Error('`block` requires `vertical` to be set to have any effect') :
        null
    ),
    deprecated(() => null, 'The `block` prop has been deprecated on ButtonGroup. See https://react-bootstrap.github.io/components.html#btn-groups for more information.'),
  ),
};

const defaultProps = {
  block: null,
  justified: false,
  vertical: false,
};

class ButtonGroup extends React.Component {
  render() {
    const { block, justified, vertical, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps)]: !vertical,
      [prefix(bsProps, 'vertical')]: vertical,
      [prefix(bsProps, 'justified')]: justified,

      // this is annoying, since the class is `btn-block` not `btn-group-block`
      [prefix(Button.defaultProps, 'block')]: block,
    };

    return (
      <div
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default bsClass('btn-group', ButtonGroup);
