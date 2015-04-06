import React from 'react';
import classSet from 'classnames';
import TransitionEvents from './utils/TransitionEvents';

const TabPane = React.createClass({
  propTypes: {
    active: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      animation: true
    };
  },

  getInitialState() {
    return {
      animateIn: false,
      animateOut: false
    };
  },

  componentWillReceiveProps(nextProps) {
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

  componentDidUpdate() {
    if (this.state.animateIn) {
      setTimeout(this.startAnimateIn, 0);
    }
    if (this.state.animateOut) {
      TransitionEvents.addEndEventListener(
        React.findDOMNode(this),
        this.stopAnimateOut
      );
    }
  },

  startAnimateIn() {
    if (this.isMounted()) {
      this.setState({
        animateIn: false
      });
    }
  },

  stopAnimateOut() {
    if (this.isMounted()) {
      this.setState({
        animateOut: false
      });

      if (typeof this.props.onAnimateOutEnd === 'function') {
        this.props.onAnimateOutEnd();
      }
    }
  },

  render() {
    let classes = {
      'tab-pane': true,
      'fade': true,
      'active': this.props.active || this.state.animateOut,
      'in': this.props.active && !this.state.animateIn
    };

    return (
      <div {...this.props} className={classSet(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }
});

export default TabPane;
