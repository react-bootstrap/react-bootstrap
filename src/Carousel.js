import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import createReactClass from 'create-react-class';
import classNames from 'classnames';
import ValidComponentChildren from './utils/ValidComponentChildren';
import Glyphicon from './Glyphicon';
import tbsUtils from './utils/bootstrapUtils';

import Caption from './CarouselCaption';
import Item from './CarouselItem';

let Carousel = createReactClass({
  displayName: 'Carousel',

  propTypes: {
    slide: PropTypes.bool,
    indicators: PropTypes.bool,
    interval: PropTypes.number,
    controls: PropTypes.bool,
    pauseOnHover: PropTypes.bool,
    wrap: PropTypes.bool,
    onSelect: PropTypes.func,
    onSlideEnd: PropTypes.func,
    activeIndex: PropTypes.number,
    defaultActiveIndex: PropTypes.number,
    direction: PropTypes.oneOf(['prev', 'next']),
    prevIcon: PropTypes.node,
    nextIcon: PropTypes.node
  },

  getDefaultProps() {
    return {
      bsClass: 'carousel',
      slide: true,
      interval: 5000,
      pauseOnHover: true,
      wrap: true,
      indicators: true,
      controls: true,
      prevIcon: <Glyphicon glyph="chevron-left" />,
      nextIcon: <Glyphicon glyph="chevron-right" />
    };
  },

  getInitialState() {
    return {
      activeIndex: this.props.defaultActiveIndex == null ?
        0 : this.props.defaultActiveIndex,
      previousActiveIndex: null,
      direction: null
    };
  },

  getDirection(prevIndex, index) {
    if (prevIndex === index) {
      return null;
    }

    return prevIndex > index ?
      'prev' : 'next';
  },

  componentWillReceiveProps(nextProps) {
    let activeIndex = this.getActiveIndex();

    if (nextProps.activeIndex != null && nextProps.activeIndex !== activeIndex) {
      clearTimeout(this.timeout);
      this.setState({
        previousActiveIndex: activeIndex,
        direction: nextProps.direction != null ?
          nextProps.direction : this.getDirection(activeIndex, nextProps.activeIndex)
      });
    }
  },

  componentDidMount() {
    this.waitForNext();
  },

  componentWillUnmount() {
    clearTimeout(this.timeout);
  },

  next(e) {
    if (e) {
      e.preventDefault();
    }

    let index = this.getActiveIndex() + 1;
    let count = ValidComponentChildren.numberOf(this.props.children);

    if (index > count - 1) {
      if (!this.props.wrap) {
        return;
      }
      index = 0;
    }

    this.handleSelect(index, 'next');
  },

  prev(e) {
    if (e) {
      e.preventDefault();
    }

    let index = this.getActiveIndex() - 1;

    if (index < 0) {
      if (!this.props.wrap) {
        return;
      }
      index = ValidComponentChildren.numberOf(this.props.children) - 1;
    }

    this.handleSelect(index, 'prev');
  },

  pause() {
    this.isPaused = true;
    clearTimeout(this.timeout);
  },

  play() {
    this.isPaused = false;
    this.waitForNext();
  },

  waitForNext() {
    if (!this.isPaused && this.props.slide && this.props.interval &&
        this.props.activeIndex == null) {
      this.timeout = setTimeout(this.next, this.props.interval);
    }
  },

  handleMouseOver() {
    if (this.props.pauseOnHover) {
      this.pause();
    }
  },

  handleMouseOut() {
    if (this.isPaused) {
      this.play();
    }
  },

  render() {
    let classes = {
      [tbsUtils.prefix(this.props)]: true,
      slide: this.props.slide
    };

    return (
      <div
        {...this.props}
        className={classNames(this.props.className, classes)}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        {
          this.props.indicators ? this.renderIndicators() : null
        }
        <div
          ref="inner"
          className={tbsUtils.prefix(this.props, 'inner')}
        >
          {ValidComponentChildren.map(this.props.children, this.renderItem)}
        </div>
        {this.props.controls ? this.renderControls() : null}
      </div>
    );
  },

  renderPrev() {
    let classes = 'left ' + tbsUtils.prefix(this.props, 'control');

    return (
      <a className={classes} href="#prev" key={0} onClick={this.prev}>
        {this.props.prevIcon}
      </a>
    );
  },

  renderNext() {
    let classes = 'right ' + tbsUtils.prefix(this.props, 'control');

    return (
      <a className={classes} href="#next" key={1} onClick={this.next}>
        {this.props.nextIcon}
      </a>
    );
  },

  renderControls() {
    if (!this.props.wrap) {
      let activeIndex = this.getActiveIndex();
      let count = ValidComponentChildren.numberOf(this.props.children);

      return [
        (activeIndex !== 0) ? this.renderPrev() : null,
        (activeIndex !== count - 1) ? this.renderNext() : null
      ];
    }

    return [
      this.renderPrev(),
      this.renderNext()
    ];
  },

  renderIndicator(child, index) {
    let className = (index === this.getActiveIndex()) ?
      'active' : null;

    return (
      <li
        key={index}
        className={className}
        onClick={this.handleSelect.bind(this, index, null)} />
    );
  },

  renderIndicators() {
    let indicators = [];
    ValidComponentChildren
      .forEach(this.props.children, (child, index) => {
        indicators.push(
          this.renderIndicator(child, index),

          // Force whitespace between indicator elements, bootstrap
          // requires this for correct spacing of elements.
          ' '
        );
      }, this);

    return (
      <ol className={tbsUtils.prefix(this.props, 'indicators')}>
        {indicators}
      </ol>
    );
  },

  getActiveIndex() {
    return this.props.activeIndex != null ? this.props.activeIndex : this.state.activeIndex;
  },

  handleItemAnimateOutEnd() {
    this.setState({
      previousActiveIndex: null,
      direction: null
    }, () => {
      this.waitForNext();

      if (this.props.onSlideEnd) {
        this.props.onSlideEnd();
      }
    });
  },

  renderItem(child, index) {
    let activeIndex = this.getActiveIndex();
    let isActive = (index === activeIndex);
    let isPreviousActive = this.state.previousActiveIndex != null &&
            this.state.previousActiveIndex === index && this.props.slide;

    return cloneElement(
      child,
      {
        active: isActive,
        ref: child.ref,
        key: child.key ? child.key : index,
        index,
        animateOut: isPreviousActive,
        animateIn: isActive && this.state.previousActiveIndex != null && this.props.slide,
        direction: this.state.direction,
        onAnimateOutEnd: isPreviousActive ? this.handleItemAnimateOutEnd : null
      }
    );
  },

  handleSelect(index, direction) {
    clearTimeout(this.timeout);

    if (this.isMounted()) {
      let previousActiveIndex = this.getActiveIndex();
      direction = direction || this.getDirection(previousActiveIndex, index);

      if (this.props.onSelect) {
        this.props.onSelect(index, direction);
      }

      if (this.props.activeIndex == null && index !== previousActiveIndex) {
        if (this.state.previousActiveIndex != null) {
          // If currently animating don't activate the new index.
          // TODO: look into queuing this canceled call and
          // animating after the current animation has ended.
          return;
        }

        this.setState({
          activeIndex: index,
          previousActiveIndex,
          direction
        });
      }
    }
  },
});

Carousel = Object.assign(Carousel, { Caption, Item });

export default Carousel;
