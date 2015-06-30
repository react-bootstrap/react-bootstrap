/* eslint-disable react/no-multi-comp */
import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import FadeMixin from './FadeMixin';
import CustomPropTypes from './utils/CustomPropTypes';

const Tooltip = React.createClass({
  mixins: [BootstrapMixin, FadeMixin],

  propTypes: {
    /**
     * An html id attribute, necessary for accessibility
     * @type {string}
     * @required
     */
    id: CustomPropTypes.isRequiredForA11y(React.PropTypes.string),

    /**
     * Sets the direction the Tooltip is positioned towards.
     */
    placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The "left" position value for the Tooltip.
     */
    positionLeft: React.PropTypes.number,
    /**
     * The "top" position value for the Tooltip.
     */
    positionTop: React.PropTypes.number,
    /**
     * The "left" position value for the Tooltip arrow.
     */
    arrowOffsetLeft: React.PropTypes.oneOfType([
      React.PropTypes.number, React.PropTypes.string
    ]),
    /**
     * The "top" position value for the Tooltip arrow.
     */
    arrowOffsetTop: React.PropTypes.oneOfType([
      React.PropTypes.number, React.PropTypes.string
    ]),
    /**
     * Title text
     */
    title: React.PropTypes.node,
    /**
     * Specify whether the Tooltip should be use show and hide animations.
     */
    animation: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      placement: 'right',
      animation: true
    };
  },

  render() {
    const classes = {
      'tooltip': true,
      [this.props.placement]: true,
      // in class will be added by the FadeMixin when the animation property is true
      'in': !this.props.animation && (this.props.positionLeft != null || this.props.positionTop != null),
      'fade': this.props.animation
    };

    const style = {
      'left': this.props.positionLeft,
      'top': this.props.positionTop
    };

    const arrowStyle = {
      'left': this.props.arrowOffsetLeft,
      'top': this.props.arrowOffsetTop
    };

    return (
        <div role='tooltip' {...this.props} className={classNames(this.props.className, classes)} style={style}>
          <div className="tooltip-arrow" style={arrowStyle} />
          <div className="tooltip-inner">
            {this.props.children}
          </div>
        </div>
      );
  }
});

export default Tooltip;
