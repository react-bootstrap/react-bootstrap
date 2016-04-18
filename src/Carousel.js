import classNames from 'classnames';
import React, { cloneElement } from 'react';

import { prefix } from './utils/bootstrapUtils';
import ValidComponentChildren from './utils/ValidComponentChildren';

import Caption from './CarouselCaption';
import Item from './CarouselItem';
import Glyphicon from './Glyphicon';

let Carousel = React.createClass({

  propTypes: {
    slide: React.PropTypes.bool,
    indicators: React.PropTypes.bool,
    interval: React.PropTypes.number,
    controls: React.PropTypes.bool,
    pauseOnHover: React.PropTypes.bool,
    wrap: React.PropTypes.bool,
    /**
     * Callback fired when the active item changes.
     *
     * ```js
     * (eventKey: any) => any | (eventKey: any, event: Object) => any
     * ```
     *
     * If this callback takes two or more arguments, the second argument will
     * be a persisted event object with `direction` set to the direction of the
     * transition.
     */
    onSelect: React.PropTypes.func,
    onSlideEnd: React.PropTypes.func,
    activeIndex: React.PropTypes.number,
    defaultActiveIndex: React.PropTypes.number,
    direction: React.PropTypes.oneOf(['prev', 'next']),
    prevIcon: React.PropTypes.node,
    nextIcon: React.PropTypes.node
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
    let count = ValidComponentChildren.count(this.props.children);

    if (index > count - 1) {
      if (!this.props.wrap) {
        return;
      }
      index = 0;
    }

    this.handleSelect(index, e, 'next');
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
      index = ValidComponentChildren.count(this.props.children) - 1;
    }

    this.handleSelect(index, e, 'prev');
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
      [prefix(this.props)]: true,
      slide: this.props.slide
    };

    return (
      <div
        {...this.props}
        className={classNames(this.props.className, classes)}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {this.props.indicators ? this.renderIndicators() : null}

        <div
          ref="inner"
          className={prefix(this.props, 'inner')}
        >
          {ValidComponentChildren.map(this.props.children, this.renderItem)}
        </div>

        {this.props.controls ? this.renderControls() : null}
      </div>
    );
  },

  renderPrev() {
    let classes = `left ${prefix(this.props, 'control')}`;

    return (
      <a className={classes} href="#prev" key={0} onClick={this.prev}>
        {this.props.prevIcon}
      </a>
    );
  },

  renderNext() {
    let classes = `right ${prefix(this.props, 'control')}`;

    return (
      <a className={classes} href="#next" key={1} onClick={this.next}>
        {this.props.nextIcon}
      </a>
    );
  },

  renderControls() {
    if (!this.props.wrap) {
      let activeIndex = this.getActiveIndex();
      let count = ValidComponentChildren.count(this.props.children);

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
        onClick={e => this.handleSelect(index, e, null)} />
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
      <ol className={prefix(this.props, 'indicators')}>
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

  handleSelect(index, e, direction) {
    clearTimeout(this.timeout);

    if (this.isMounted()) {
      let previousActiveIndex = this.getActiveIndex();
      direction = direction || this.getDirection(previousActiveIndex, index);

      const { onSelect } = this.props;

      if (onSelect) {
        if (onSelect.length > 1) {
          // React SyntheticEvents are pooled, so we need to remove this event
          // from the pool to add a custom property. To avoid unnecessarily
          // removing objects from the pool, only do this when the listener
          // actually wants the event.
          e.persist();
          e.direction = direction;

          onSelect(index, e);
        } else {
          onSelect(index);
        }
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
  }
});

Carousel = Object.assign(Carousel, { Caption, Item });

export default Carousel;
