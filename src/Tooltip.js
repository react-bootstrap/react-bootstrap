import classNames from 'classnames';
import React from 'react';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

export default class Tooltip extends React.Component {
  render() {
    const {
      placement,
      positionLeft,
      positionTop,
      arrowOffsetLeft,
      arrowOffsetTop,
      className,
      style,
      children,
      ...props
    } = this.props;

    return (
      <div
        role="tooltip"
        {...props}
        className={classNames(className, 'tooltip', placement)}
        style={{left: positionLeft, top: positionTop, ...style}}
      >
        <div
          className="tooltip-arrow"
          style={{left: arrowOffsetLeft, top: arrowOffsetTop}}
        />

        <div className="tooltip-inner">
          {children}
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: isRequiredForA11y(
    React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  ),

  /**
   * The direction the tooltip is positioned towards
   */
  placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The `left` position value for the tooltip
   */
  positionLeft: React.PropTypes.number,
  /**
   * The `top` position value for the tooltip
   */
  positionTop: React.PropTypes.number,
  /**
   * The `left` position value for the tooltip arrow
   */
  arrowOffsetLeft: React.PropTypes.oneOfType([
    React.PropTypes.number, React.PropTypes.string
  ]),
  /**
   * The `top` position value for the tooltip arrow
   */
  arrowOffsetTop: React.PropTypes.oneOfType([
    React.PropTypes.number, React.PropTypes.string
  ])
};

Tooltip.defaultProps = {
  placement: 'right'
};
