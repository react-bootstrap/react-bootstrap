import React from 'react';
import classSet from 'classnames';
import TransitionEvents from './utils/TransitionEvents';

const CarouselItem = React.createClass({
  propTypes: {
    direction: React.PropTypes.oneOf(['prev', 'next']),
    onAnimateOutEnd: React.PropTypes.func,
    active: React.PropTypes.bool,
    caption: React.PropTypes.node
  },

  getInitialState() {
    return {
      direction: null
    };
  },

  getDefaultProps() {
    return {
      animation: true
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
        React.findDOMNode(this),
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
      <div {...this.props} className={classSet(this.props.className, classes)}>
        {this.props.children}
        {this.props.caption ? this.renderCaption() : null}
      </div>
    );
  },

  renderCaption() {
    return (
      <div className="carousel-caption">
        {this.props.caption}
      </div>
    );
  }
});

export default CarouselItem;
