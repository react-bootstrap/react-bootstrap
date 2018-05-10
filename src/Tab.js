import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import tbsUtils from './utils/bootstrapUtils';
import TransitionEvents from './utils/TransitionEvents';

const Tab = createReactClass({
  displayName: 'Tab',

  propTypes: {
    /**
     * @private
     */
    active: PropTypes.bool,
    animation: PropTypes.bool,
    /**
     * It is used by 'Tabs' - parent component
     * @private
     */
    onAnimateOutEnd: PropTypes.func,
    disabled: PropTypes.bool,
    title: PropTypes.node,
    /**
     * tabClassName is used as className for the associated NavItem
     */
    tabClassName: PropTypes.string
  },

  getDefaultProps() {
    return {
      bsClass: 'tab',
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
        ReactDOM.findDOMNode(this),
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
      [tbsUtils.prefix(this.props, 'pane')]: true,
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
  },
});

export default Tab;
