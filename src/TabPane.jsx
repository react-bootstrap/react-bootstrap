/** @jsx React.DOM */

var React = require('react/addons');
var TransitionEvents = require('./utils/TransitionEvents');

var TabPane = React.createClass({
  getDefaultProps: function () {
    return {
      animation: true
    };
  },

  getInitialState: function () {
    return {
      animateIn: false,
      animateOut: false
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.animation) {
      if (!this.state.animateIn && nextProps.active && !this.props.active) {
        this.setState({
          animateIn: true
        });
      } else if (!this.state.animateOut && !nextProps.active && this.props.active) {
        this.setState({
          animateOut: true
        });
      }
    }
  },

  componentDidUpdate: function () {
    if (this.state.animateIn) {
      setTimeout(this.startAnimateIn, 0);
    }
    if (this.state.animateOut) {
      TransitionEvents.addEndEventListener(
        this.getDOMNode(),
        this.stopAnimateOut
      );
    }
  },

  startAnimateIn: function () {
    if (this.isMounted()) {
      this.setState({
        animateIn: false
      });
    }
  },

  stopAnimateOut: function () {
    if (this.isMounted()) {
      this.setState({
        animateOut: false
      });

      if (typeof this.props.onAnimateOutEnd === 'function') {
        this.props.onAnimateOutEnd();
      }
    }
  },

  render: function () {
    var classes = {
      'tab-pane': true,
      'fade': true,
      'active': this.props.active || this.state.animateOut,
      'in': this.props.active && !this.state.animateIn
    };

    return this.transferPropsTo(
      <div className={React.addons.classSet(classes)}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = TabPane;
