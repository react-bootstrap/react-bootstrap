import classNames from 'classnames';
import React from 'react';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import { prefix } from './utils/bootstrapUtils';

const Popover = React.createClass({

  propTypes: {

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
     * Sets the direction the Popover is positioned towards.
     */
    placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The "left" position value for the Popover.
     */
    positionLeft: React.PropTypes.number,
    /**
     * The "top" position value for the Popover.
     */
    positionTop: React.PropTypes.number,
    /**
     * The "left" position value for the Popover arrow.
     */
    arrowOffsetLeft: React.PropTypes.oneOfType([
      React.PropTypes.number, React.PropTypes.string
    ]),
    /**
     * The "top" position value for the Popover arrow.
     */
    arrowOffsetTop: React.PropTypes.oneOfType([
      React.PropTypes.number, React.PropTypes.string
    ]),
    /**
     * Title text
     */
    title: React.PropTypes.node
  },

  getDefaultProps() {
    return {
      placement: 'right',
      bsClass: 'popover'
    };
  },

  render() {
    const classes = {
      [prefix(this.props)]: true,
      [this.props.placement]: true
    };

    const style = {
      left: this.props.positionLeft,
      top: this.props.positionTop,
      display: 'block',
      // we don't want to expose the `style` property
      ...this.props.style // eslint-disable-line react/prop-types
    };

    const arrowStyle = {
      left: this.props.arrowOffsetLeft,
      top: this.props.arrowOffsetTop
    };

    return (
      <div
        role="tooltip"
        {...this.props}
        className={classNames(this.props.className, classes)}
        style={style}
        title={null}
      >
        <div className="arrow" style={arrowStyle} />

        {this.props.title ? this.renderTitle() : null}

        <div className={prefix(this.props, 'content')}>
          {this.props.children}
        </div>
      </div>
    );
  },

  renderTitle() {
    return (
      <h3 className={prefix(this.props, 'title')}>
        {this.props.title}
      </h3>
    );
  }
});

export default Popover;
