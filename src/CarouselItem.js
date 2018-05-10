import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import ReactDOM from 'react-dom';

import TransitionEvents from './utils/TransitionEvents';
import tbsUtils from './utils/bootstrapUtils';

const CarouselItem = createReactClass({
  displayName: 'CarouselItem',

  propTypes: {
    direction: PropTypes.oneOf(['prev', 'next']),
    onAnimateOutEnd: PropTypes.func,
    active: PropTypes.bool,
    animateIn: PropTypes.bool,
    animateOut: PropTypes.bool,
    caption: PropTypes.node,
    index: PropTypes.number
  },

  getInitialState() {
    return {
      direction: null
    };
  },

  getDefaultProps() {
    return {
      bsStyle: 'carousel',
      active: false,
      animateIn: false,
      animateOut: false
    };
  },

  handleAnimateOutEnd() {
    if (this.props.onAnimateOutEnd && this.isMounted()) {
      this.props.onAnimateOutEnd(this.props.index);
    }
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({
        direction: null
      });
    }
  },

  componentDidUpdate(prevProps) {
    if (!this.props.active && prevProps.active) {
      TransitionEvents.addEndEventListener(
        ReactDOM.findDOMNode(this),
        this.handleAnimateOutEnd
      );
    }

    if (this.props.active !== prevProps.active) {
      setTimeout(this.startAnimation, 20);
    }
  },

  startAnimation() {
    if (!this.isMounted()) {
      return;
    }

    this.setState({
      direction: this.props.direction === 'prev' ?
        'right' : 'left'
    });
  },

  render() {
    let classes = {
      item: true,
      active: (this.props.active && !this.props.animateIn) || this.props.animateOut,
      next: this.props.active && this.props.animateIn && this.props.direction === 'next',
      prev: this.props.active && this.props.animateIn && this.props.direction === 'prev'
    };

    if (this.state.direction && (this.props.animateIn || this.props.animateOut)) {
      classes[this.state.direction] = true;
    }

    return (
      <div {...this.props} className={classNames(this.props.className, classes)}>
        {this.props.children}
        {this.props.caption ? this.renderCaption() : null}
      </div>
    );
  },

  renderCaption() {
    let classes = tbsUtils.prefix(this.props, 'caption');

    return (
      <div className={classes}>
        {this.props.caption}
      </div>
    );
  },
});

export default CarouselItem;
