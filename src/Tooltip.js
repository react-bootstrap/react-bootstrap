import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import tbsUtils from './utils/bootstrapUtils';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

class Tooltip extends React.Component {
  static propTypes = {
    /**
     * An html id attribute, necessary for accessibility
     * @type {string}
     * @required
     */
    id: isRequiredForA11y(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    ),

    /**
     * Sets the direction the Tooltip is positioned towards.
     */
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The "left" position value for the Tooltip.
     */
    positionLeft: PropTypes.number,
    /**
     * The "top" position value for the Tooltip.
     */
    positionTop: PropTypes.number,
    /**
     * The "left" position value for the Tooltip arrow.
     */
    arrowOffsetLeft: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    /**
     * The "top" position value for the Tooltip arrow.
     */
    arrowOffsetTop: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    /**
     * Title text
     */
    title: PropTypes.node
  };

  static defaultProps = {
    bsClass: 'tooltip',
    placement: 'right'
  };

  render() {
    const classes = {
      [tbsUtils.prefix(this.props)]: true,
      [this.props.placement]: true
    };

    const style = {
      'left': this.props.positionLeft,
      'top': this.props.positionTop,
      ...this.props.style
    };

    const arrowStyle = {
      'left': this.props.arrowOffsetLeft,
      'top': this.props.arrowOffsetTop
    };

    return (
      <div role="tooltip" {...this.props} className={classNames(this.props.className, classes)} style={style}>
        <div className={tbsUtils.prefix(this.props, 'arrow')} style={arrowStyle} />
        <div className={tbsUtils.prefix(this.props, 'inner')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Tooltip;
