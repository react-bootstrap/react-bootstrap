import React from 'react';
import classNames from 'classnames';
import TransitionEvents from './utils/TransitionEvents';

const Tab = React.createClass({
  propTypes: {
    /**
     * @private
     */
    active: React.PropTypes.bool,
    animation: React.PropTypes.bool,
    /**
     * It is used by 'Tabs' - parent component
     * @private
     */
    onAnimateOutEnd: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    title: React.PropTypes.node,
    /**
     * tabClassName is used as className for the associated NavItem
     */
    tabClassName: React.PropTypes.string
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

      if (this.props.onAnimateOutEnd) {
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
      <div {...this.props}
        title={undefined}
        role="tabpanel"
        aria-hidden={!this.props.active}
        className={classNames(this.props.className, classes)}
      >
        {this.props.children}
      </div>
    );
  }
});

export default Tab;
