import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import all from 'prop-types-extra/lib/all';

import * as StyleContext from './StyleContext';

const propTypes = {
  vertical: PropTypes.bool,
  justified: PropTypes.bool,
  /**
   * Display as a button toggle group
   * @type {bool}
   */
  toggle: PropTypes.bool,

  /**
   * The ARIA role describing the button group. Generallu the default
   * "group" role is correct. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role: PropTypes.string,

  /**
   * Display block buttons; only useful when used with the "vertical" prop.
   * @type {bool}
   */
  block: all(
    PropTypes.bool,
    ({ block, vertical }) =>
      block && !vertical
        ? new Error('`block` requires `vertical` to be set to have any effect')
        : null
  )
};

const defaultProps = {
  block: false,
  justified: false,
  vertical: false,
  toggle: false,
  role: 'group'
};

class ButtonGroup extends React.Component {
  render() {
    return (
      <StyleContext.Consumer componentType="ButtonGroup" props={this.props}>
        {({
          bsClass,
          bsSize,
          props: { toggle, vertical, className, ...props }
        }) => (
          <div
            {...props}
            className={classNames(
              className,
              !vertical && bsClass,
              vertical && `${bsClass}-vertical`,
              bsSize && `${bsClass}-${bsSize}`
            )}
          />
        )}
      </StyleContext.Consumer>
    );
  }
}

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
