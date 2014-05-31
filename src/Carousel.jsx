/** @jsx React.DOM */

import React                  from './react-es6';
import classSet               from './react-es6/lib/cx';
import BootstrapMixin         from './BootstrapMixin';
import utils                  from './utils';
import ValidComponentChildren from './ValidComponentChildren';

var Carousel = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    slide: React.PropTypes.bool,
    indicators: React.PropTypes.bool,
    controls: React.PropTypes.bool,
    pauseOnHover: React.PropTypes.bool,
    wrap: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    activeIndex: React.PropTypes.number,
    direction: React.PropTypes.oneOf(['prev', 'next'])
  },

  getDefaultProps: function () {
    return {
      slide: true,
      interval: 5000,
      pauseOnHover: true,
      wrap: true,
      indicators: true,
      controls: true
    };
  },

  getInitialState: function () {
    var defaultActiveIndex = this.props.defaultActiveIndex;

    if (defaultActiveIndex == null) {
      defaultActiveIndex = 0;
    }

    return {
      activeIndex: defaultActiveIndex,
      previousActiveIndex: null,
      direction: null
    };
  },

  getDirection: function (prevIndex, index) {
    if (prevIndex === index) {
      return null;
    }

    return prevIndex > index ?
      'prev' : 'next';
  },

  componentWillReceiveProps: function (nextProps) {
    var activeIndex = this.getActiveIndex();

    if (nextProps.activeIndex != null && nextProps.activeIndex !== activeIndex) {
      this.setState({
        previousActiveIndex: activeIndex,
        direction: nextProps.direction != null ?
          nextProps.direction : this.getDirection(activeIndex, nextProps.activeIndex)
      });
    }
  },

  componentDidMount: function () {
    this.waitForNext();
  },

  next: function (e) {
    var index = this.getActiveIndex() + 1;
    var count = ValidComponentChildren.numberOf(this.props.children);

    if (index > count - 1) {
      if (!this.props.wrap) {
        return;
      }
      index = 0;
    }

    this.handleSelect(index, 'next');

    if (e) {
      e.preventDefault();
    }
  },

  prev: function (e) {
    var index = this.getActiveIndex() - 1;
    var count = ValidComponentChildren.numberOf(this.props.children);

    if (index < 0) {
      if (!this.props.wrap) {
        return;
      }
      index = count - 1;
    }

    this.handleSelect(index, 'prev');

    if (e) {
      e.preventDefault();
    }
  },

  pause: function () {
    this.isPaused = true;
    clearTimeout(this.timeout);
  },

  play: function () {
    this.isPaused = false;
    this.waitForNext();
  },

  waitForNext: function () {
    if (!this.isPaused && this.props.slide && this.props.interval &&
        this.props.activeIndex == null) {
      this.timeout = setTimeout(this.next, this.props.interval);
    }
  },

  handleMouseOver: function () {
    if (this.props.pauseOnHover) {
      this.pause();
    }
  },

  handleMouseOut: function () {
    if (this.isPaused) {
      this.play();
    }
  },

  render: function () {
    var classes = {
      carousel: true,
      slide: this.props.slide
    };

    return this.transferPropsTo(
      <div
        className={classSet(classes)}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        {this.props.indicators ? this.renderIndicators() : null}
        <div className="carousel-inner" ref="inner">
          {ValidComponentChildren.map(this.props.children, this.renderItem)}
        </div>
        {this.props.controls ? this.renderControls() : null}
      </div>
    );
  },

  renderPrev: function () {
    var href = '#';

    if (this.props.id) {
      href += this.props.id;
    }

    return (
      <a className="left carousel-control" href={href} key={0} onClick={this.prev}>
        <span className="glyphicon glyphicon-chevron-left"/>
      </a>
    );
  },

  renderNext: function () {
    var href = '#';

    if (this.props.id) {
      href += this.props.id;
    }

    return (
      <a className="right carousel-control" href={href} key={1} onClick={this.next}>
        <span className="glyphicon glyphicon-chevron-right"/>
      </a>
    );
  },

  renderControls: function () {
    var activeIndex = this.getActiveIndex();

    return [
      (this.props.wrap || activeIndex !== 0) ? this.renderPrev() : null,
      (this.props.wrap || activeIndex !== ValidComponentChildren.numberOf(this.props.children) - 1) ?
        this.renderNext() : null
    ];
  },

  renderIndicator: function (child, index) {
    var className = (index === this.getActiveIndex()) ?
      'active' : null;

    return [
      <li
        key={index}
        className={className}
        onClick={this.handleSelect.bind(this, index, null)} />,
      ' '
    ];
  },

  renderIndicators: function () {
    return (
      <ol className="carousel-indicators">
        {ValidComponentChildren.map(this.props.children, this.renderIndicator)}
      </ol>
    );
  },

  getActiveIndex: function () {
    return this.props.activeIndex != null ? this.props.activeIndex : this.state.activeIndex;
  },

  handleItemAnimateOutEnd: function () {
    this.sliding = false;

    this.setState({
      previousActiveIndex: null,
      direction: null
    });

    this.waitForNext();
  },

  renderItem: function (child, index) {
    var activeIndex = this.getActiveIndex();
    var isActive = (index === activeIndex);
    var isPreviousActive = this.state.previousActiveIndex != null &&
            this.state.previousActiveIndex === index && this.props.slide;

    return utils.cloneWithProps(
        child,
        {
          active: isActive,
          ref: child.props.ref,
          key: child.props.key != null ?
            child.props.key : index,
          index: index,
          animateOut: isPreviousActive,
          animateIn: isActive && this.state.previousActiveIndex != null && this.props.slide,
          direction: this.state.direction,
          onAnimateOutEnd: isPreviousActive ? this.handleItemAnimateOutEnd: null
        }
      );
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect: function (index, direction) {
    var previousActiveIndex;

    if (this.sliding) {
      return;
    }

    this.sliding = true;

    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(index, direction);
      this._isChanging = false;
    }

    if (this.props.activeIndex == null && index !== this.getActiveIndex()) {
      previousActiveIndex = this.getActiveIndex();
      this.setState({
        activeIndex: index,
        previousActiveIndex: previousActiveIndex,
        direction: direction || this.getDirection(previousActiveIndex, index)
      });

      if (!this.props.slide) {
        this.waitForNext();
      }
    }
  }
});

export default = Carousel;