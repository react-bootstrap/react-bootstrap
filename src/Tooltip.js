import classNames from 'classnames';
import React from 'react';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import { bsClass, getClassSet, omitBsProps, prefix }
  from './utils/bootstrapUtils';

const propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y(React.PropTypes.oneOfType([
    React.PropTypes.string, React.PropTypes.number,
  ])),

  /**
   * Sets the direction the Tooltip is positioned towards.
   */
  placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Tooltip.
   */
  positionTop: React.PropTypes.oneOfType([
    React.PropTypes.number, React.PropTypes.string,
  ]),
  /**
   * The "left" position value for the Tooltip.
   */
  positionLeft: React.PropTypes.oneOfType([
    React.PropTypes.number, React.PropTypes.string,
  ]),

  /**
   * The "top" position value for the Tooltip arrow.
   */
  arrowOffsetTop: React.PropTypes.oneOfType([
    React.PropTypes.number, React.PropTypes.string,
  ]),
  /**
   * The "left" position value for the Tooltip arrow.
   */
  arrowOffsetLeft: React.PropTypes.oneOfType([
    React.PropTypes.number, React.PropTypes.string,
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
      ...props,
    } = this.props;

    const classes = {
      ...getClassSet(props),
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
        {...omitBsProps(props)}
        role="tooltip"
        className={classNames(className, classes)}
        style={outerStyle}
      >
        <div className={prefix(props, 'arrow')} style={arrowStyle} />

        <div className={prefix(props, 'inner')}>
          {children}
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default bsClass('tooltip', Tooltip);
