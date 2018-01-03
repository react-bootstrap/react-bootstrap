import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import CarouselCaption from './CarouselCaption';
import CarouselItem from './CarouselItem';
import Glyphicon from './Glyphicon';
import SafeAnchor from './SafeAnchor';
import {
  bsClass,
  getClassSet,
  prefix,
  splitBsPropsAndOmit
} from './utils/bootstrapUtils';
import ValidComponentChildren from './utils/ValidComponentChildren';

// TODO: `slide` should be `animate`.

// TODO: Use uncontrollable.

const propTypes = {
  slide: PropTypes.bool,
  indicators: PropTypes.bool,
  /**
   * The amount of time to delay between automatically cycling an item.
   * If `null`, carousel will not automatically cycle.
   */
  interval: PropTypes.number,
  controls: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
  wrap: PropTypes.bool,
  /**
   * Callback fired when the active item changes.
   *
   * ```js
   * (eventKey: any, ?event: Object) => any
   * ```
   *
   * If this callback takes two or more arguments, the second argument will
   * be a persisted event object with `direction` set to the direction of the
   * transition.
   */
  onSelect: PropTypes.func,
  onSlideEnd: PropTypes.func,
  activeIndex: PropTypes.number,
  defaultActiveIndex: PropTypes.number,
  direction: PropTypes.oneOf(['prev', 'next']),
  prevIcon: PropTypes.node,
  /**
   * Label shown to screen readers only, can be used to show the previous element
   * in the carousel.
   * Set to null to deactivate.
   */
  prevLabel: PropTypes.string,
  nextIcon: PropTypes.node,
  /**
   * Label shown to screen readers only, can be used to show the next element
   * in the carousel.
   * Set to null to deactivate.
   */
  nextLabel: PropTypes.string
};

const defaultProps = {
  slide: true,
  interval: 5000,
  pauseOnHover: true,
  wrap: true,
  indicators: true,
  controls: true,
  prevIcon: <Glyphicon glyph="chevron-left" />,
  prevLabel: 'Previous',
  nextIcon: <Glyphicon glyph="chevron-right" />,
  nextLabel: 'Next'
};

class Carousel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleItemAnimateOutEnd = this.handleItemAnimateOutEnd.bind(this);

    const { defaultActiveIndex } = props;

    this.state = {
      activeIndex: defaultActiveIndex != null ? defaultActiveIndex : 0,
      previousActiveIndex: null,
      direction: null
    };

    this.isUnmounted = false;
  }

  componentDidMount() {
    this.waitForNext();
  }

  componentWillReceiveProps(nextProps) {
    const activeIndex = this.getActiveIndex();

    if (
      nextProps.activeIndex != null &&
      nextProps.activeIndex !== activeIndex
    ) {
      clearTimeout(this.timeout);

      this.setState({
        previousActiveIndex: activeIndex,
        direction:
          nextProps.direction != null
            ? nextProps.direction
            : this.getDirection(activeIndex, nextProps.activeIndex)
      });
    }

    if (
      nextProps.activeIndex == null &&
      this.state.activeIndex >= nextProps.children.length
    ) {
      this.setState({
        activeIndex: 0,
        previousActiveIndex: null,
        direction: null
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.isUnmounted = true;
  }

  getActiveIndex() {
    const activeIndexProp = this.props.activeIndex;
    return activeIndexProp != null ? activeIndexProp : this.state.activeIndex;
  }

  getDirection(prevIndex, index) {
    if (prevIndex === index) {
      return null;
    }

    return prevIndex > index ? 'prev' : 'next';
  }

  handleItemAnimateOutEnd() {
    this.setState(
      {
        previousActiveIndex: null,
        direction: null
      },
      () => {
        this.waitForNext();

        if (this.props.onSlideEnd) {
          this.props.onSlideEnd();
        }
      }
    );
  }

  handleMouseOut() {
    if (this.isPaused) {
      this.play();
    }
  }

  handleMouseOver() {
    if (this.props.pauseOnHover) {
      this.pause();
    }
  }

  handleNext(e) {
    let index = this.getActiveIndex() + 1;
    const count = ValidComponentChildren.count(this.props.children);

    if (index > count - 1) {
      if (!this.props.wrap) {
        return;
      }
      index = 0;
    }

    this.select(index, e, 'next');
  }

  handlePrev(e) {
    let index = this.getActiveIndex() - 1;

    if (index < 0) {
      if (!this.props.wrap) {
        return;
      }
      index = ValidComponentChildren.count(this.props.children) - 1;
    }

    this.select(index, e, 'prev');
  }

  // This might be a public API.
  pause() {
    this.isPaused = true;
    clearTimeout(this.timeout);
  }

  // This might be a public API.
  play() {
    this.isPaused = false;
    this.waitForNext();
  }

  select(index, e, direction) {
    clearTimeout(this.timeout);

    // TODO: Is this necessary? Seems like the only risk is if the component
    // unmounts while handleItemAnimateOutEnd fires.
    if (this.isUnmounted) {
      return;
    }

    const previousActiveIndex = this.props.slide ? this.getActiveIndex() : null;
    direction = direction || this.getDirection(previousActiveIndex, index);

    const { onSelect } = this.props;

    if (onSelect) {
      if (onSelect.length > 1) {
        // React SyntheticEvents are pooled, so we need to remove this event
        // from the pool to add a custom property. To avoid unnecessarily
        // removing objects from the pool, only do this when the listener
        // actually wants the event.
        if (e) {
          e.persist();
          e.direction = direction;
        } else {
          e = { direction };
        }

        onSelect(index, e);
      } else {
        onSelect(index);
      }
    }

    if (this.props.activeIndex == null && index !== previousActiveIndex) {
      if (this.state.previousActiveIndex != null) {
        // If currently animating don't activate the new index.
        // TODO: look into queueing this canceled call and
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

  waitForNext() {
    const { slide, interval, activeIndex: activeIndexProp } = this.props;

    if (!this.isPaused && slide && interval && activeIndexProp == null) {
      this.timeout = setTimeout(this.handleNext, interval);
    }
  }

  renderControls(properties) {
    const {
      wrap,
      children,
      activeIndex,
      prevIcon,
      nextIcon,
      bsProps,
      prevLabel,
      nextLabel
    } = properties;
    const controlClassName = prefix(bsProps, 'control');
    const count = ValidComponentChildren.count(children);

    return [
      (wrap || activeIndex !== 0) && (
        <SafeAnchor
          key="prev"
          className={classNames(controlClassName, 'left')}
          onClick={this.handlePrev}
        >
          {prevIcon}
          {prevLabel && <span className="sr-only">{prevLabel}</span>}
        </SafeAnchor>
      ),

      (wrap || activeIndex !== count - 1) && (
        <SafeAnchor
          key="next"
          className={classNames(controlClassName, 'right')}
          onClick={this.handleNext}
        >
          {nextIcon}
          {nextLabel && <span className="sr-only">{nextLabel}</span>}
        </SafeAnchor>
      )
    ];
  }

  renderIndicators(children, activeIndex, bsProps) {
    let indicators = [];

    ValidComponentChildren.forEach(children, (child, index) => {
      indicators.push(
        <li
          key={index}
          className={index === activeIndex ? 'active' : null}
          onClick={e => this.select(index, e)}
        />,

        // Force whitespace between indicator elements. Bootstrap requires
        // this for correct spacing of elements.
        ' '
      );
    });

    return <ol className={prefix(bsProps, 'indicators')}>{indicators}</ol>;
  }

  render() {
    const {
      slide,
      indicators,
      controls,
      wrap,
      prevIcon,
      prevLabel,
      nextIcon,
      nextLabel,
      className,
      children,
      ...props
    } = this.props;

    const { previousActiveIndex, direction } = this.state;

    const [bsProps, elementProps] = splitBsPropsAndOmit(props, [
      'interval',
      'pauseOnHover',
      'onSelect',
      'onSlideEnd',
      'activeIndex', // Accessed via this.getActiveIndex().
      'defaultActiveIndex',
      'direction'
    ]);

    const activeIndex = this.getActiveIndex();

    const classes = {
      ...getClassSet(bsProps),
      slide
    };

    return (
      <div
        {...elementProps}
        className={classNames(className, classes)}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {indicators && this.renderIndicators(children, activeIndex, bsProps)}

        <div className={prefix(bsProps, 'inner')}>
          {ValidComponentChildren.map(children, (child, index) => {
            const active = index === activeIndex;
            const previousActive = slide && index === previousActiveIndex;

            return cloneElement(child, {
              active,
              index,
              animateOut: previousActive,
              animateIn: active && previousActiveIndex != null && slide,
              direction,
              onAnimateOutEnd: previousActive
                ? this.handleItemAnimateOutEnd
                : null
            });
          })}
        </div>

        {controls &&
          this.renderControls({
            wrap,
            children,
            activeIndex,
            prevIcon,
            prevLabel,
            nextIcon,
            nextLabel,
            bsProps
          })}
      </div>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

Carousel.Caption = CarouselCaption;
Carousel.Item = CarouselItem;

export default bsClass('carousel', Carousel);
