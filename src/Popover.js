import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import tbsUtils from './utils/bootstrapUtils';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

class Popover extends React.Component {
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
     * Sets the direction the Popover is positioned towards.
     */
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The "left" position value for the Popover.
     */
    positionLeft: PropTypes.number,
    /**
     * The "top" position value for the Popover.
     */
    positionTop: PropTypes.number,
    /**
     * The "left" position value for the Popover arrow.
     */
    arrowOffsetLeft: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    /**
     * The "top" position value for the Popover arrow.
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
    placement: 'right',
    bsClass: 'popover'
  };

  render() {
    const classes = {
      [tbsUtils.prefix(this.props)]: true,
      [this.props.placement]: true
    };

    const style = {
      'left': this.props.positionLeft,
      'top': this.props.positionTop,
      'display': 'block',
      // we don't want to expose the `style` property
      ...this.props.style // eslint-disable-line react/prop-types
    };

    const arrowStyle = {
      'left': this.props.arrowOffsetLeft,
      'top': this.props.arrowOffsetTop
    };

    return (
      <div role="tooltip" {...this.props} className={classNames(this.props.className, classes)} style={style} title={null}>
        <div className="arrow" style={arrowStyle} />
        {this.props.title ? this.renderTitle() : null}
        <div className={tbsUtils.prefix(this.props, 'content')}>
          {this.props.children}
        </div>
      </div>
    );
  }

  renderTitle = () => {
    return (
      <h3 className={tbsUtils.prefix(this.props, 'title')}>
        {this.props.title}
      </h3>
    );
  };
}

export default Popover;
