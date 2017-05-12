import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';

import { bsClass, getClassSet, prefix, splitBsProps }
  from './utils/bootstrapUtils';

const propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ])),

  /**
   * Sets the direction the Tooltip is positioned towards.
   */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Tooltip.
   */
  positionTop: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ]),
  /**
   * The "left" position value for the Tooltip.
   */
  positionLeft: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ]),

  /**
   * The "top" position value for the Tooltip arrow.
   */
  arrowOffsetTop: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ]),
  /**
   * The "left" position value for the Tooltip arrow.
   */
  arrowOffsetLeft: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ]),
};

const defaultProps = {
  placement: 'right',
};

class Tooltip extends React.Component {
  render() {
    const {
      placement,
      positionTop,
      positionLeft,
      arrowOffsetTop,
      arrowOffsetLeft,
      className,
      style,
      children,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [placement]: true,
    };

    const outerStyle = {
      top: positionTop,
      left: positionLeft,
      ...style,
    };

    const arrowStyle = {
      top: arrowOffsetTop,
      left: arrowOffsetLeft,
    };

    return (
      <div
        {...elementProps}
        role="tooltip"
        className={classNames(className, classes)}
        style={outerStyle}
      >
        <div className={prefix(bsProps, 'arrow')} style={arrowStyle} />

        <div className={prefix(bsProps, 'inner')}>
          {children}
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default bsClass('tooltip', Tooltip);
