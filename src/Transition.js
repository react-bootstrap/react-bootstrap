import React from 'react';
import TransitionEvents from './utils/TransitionEvents';
import classnames from 'classnames';

function omit(obj, keys) {
  let included = Object.keys(obj).filter( k => keys.indexOf(k) === -1);
  let newObj = {};

  included.forEach( key => newObj[key] = obj[key] );
  return newObj;
}

function ensureTransitionEnd(node, handler, duration){
  let fired = false;
  let done = e => {
        if (!fired) {
          fired = true;
          handler(e);
        }
      };

  if ( node ) {
    TransitionEvents.addEndEventListener(node, done);
    setTimeout(done, duration);
  } else {
    setTimeout(done, 0);
  }
}

// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
let triggerBrowserReflow = node => node.offsetHeight; //eslint-disable-line no-unused-expressions

class Transition extends React.Component {

  constructor(props, context){
    super(props, context);

    this.state = {
      in: !props.in,
      transitioning: false
    };

    this.needsTransition = true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.in !== this.props.in) {
      this.needsTransition = true;
    }
  }

  componentDidUpdate() {
    this.processChild();
  }

  componentWillMount() {
    this._mounted = true;

    if (!this.props.transitionAppear) {
      this.needsTransition = false;
      this.setState({ in: this.props.in });
    }
  }

  componentWillUnmount(){
    this._mounted = false;
  }

  componentDidMount() {
    if (this.props.transitionAppear) {
      this.processChild();
    }
  }

  processChild(){
    let needsTransition = this.needsTransition;
    let enter = this.props.in;

    if (needsTransition) {
      this.needsTransition = false;
      this[enter ? 'performEnter' : 'performLeave']();
    }
  }

  performEnter() {
    let maybeNode = React.findDOMNode(this);

    let enter = node => {
      node = this.props.transitioningNode(node) || node;

      this.props.onEnter(node);

      this.safeSetState({ in: true, transitioning: true, needInitialRender: false }, ()=> {

        this.props.onEntering(node);

        ensureTransitionEnd(node, () => {
          if ( this.state.in ){
            this.safeSetState({
              transitioning: false
            }, () => this.props.onEntered(node));
          }

        }, this.props.duration);
      });
    };

    if (maybeNode) {
      enter(maybeNode);
    }
    else if (this.props.unmountOnExit) {
      this._ensureNode(enter);
    }
  }

  performLeave() {
    let node = React.findDOMNode(this);

    node = this.props.transitioningNode(node) || node;

    this.props.onExit(node);

    this.setState({ in: false, transitioning: true }, () => {
      this.props.onExiting(node);

      ensureTransitionEnd(node, () => {
        if ( !this.state.in ){
          this.safeSetState({ transitioning: false }, ()=> this.props.onExited(node));
        }
      }, this.props.duration);
    });
  }

  _ensureNode(callback) {

    this.setState({ needInitialRender: true }, ()=> {
      let node = React.findDOMNode(this);

      triggerBrowserReflow(node);

      callback(node);
    });
  }

  safeSetState(newState, cb){
    if (this._mounted) {
      this.setState(newState, cb);
    }
  }

  render() {
    let childProps = omit(this.props, Object.keys(Transition.propTypes).concat('children'));

    let child = this.props.children;
    let starting = this.state.needInitialRender;
    let out = !this.state.in && !this.state.transitioning;

    if ( !child || (this.props.unmountOnExit && out && !starting) ){
      return null;
    }

    let classes = '';

    // using `classnames()` here causes a subtle bug,
    // hence the verbose if/else if sequence.
    if (this.state.in && !this.state.transitioning) {
      classes = this.props.enteredClassName;
    }

    else if (this.state.in && this.state.transitioning) {
      classes = this.props.enteringClassName;
    }

    else if (!this.state.in && !this.state.transitioning) {
      classes = this.props.exitedClassName;
    }

    else if (!this.state.in && this.state.transitioning) {
      classes = this.props.exitingClassName;
    }

    return React.cloneElement(child, {
      ...childProps,
      className: classnames(
        child.props.className,
        this.props.className,
        classes)
    });
  }
}

Transition.propTypes = {
  /**
   * Triggers the Enter or Exit animation
   */
  in:                React.PropTypes.bool,

  /**
   * Specify whether the transitioning component should be unmounted (removed from the DOM) once the exit animation finishes.
   */
  unmountOnExit:     React.PropTypes.bool,

  /**
   * Specify whether transitions should run when the Transition component mounts.
   */
  transitionAppear: React.PropTypes.bool,

  /**
   * Provide the duration of the animation in milliseconds, used to ensure that finishing callbacks are fired even if the
   * original browser transition end events are canceled.
   */
  duration:          React.PropTypes.number,

  /**
   * A css class or classes applied once the Component has exited.
   */
  exitedClassName:     React.PropTypes.string,
  /**
   * A css class or classes applied while the Component is exiting.
   */
  exitingClassName:  React.PropTypes.string,
  /**
   * A css class or classes applied once the Component has entered.
   */
  enteredClassName:    React.PropTypes.string,
  /**
   * A css class or classes applied while the Component is entering.
   */
  enteringClassName: React.PropTypes.string,

  /**
   * A function that returns the DOM node to animate. This Node will have the transition classes applied to it.
   * When left out, the Component will use its immediate child.
   *
   * @private
   */
  transitioningNode: React.PropTypes.func,

  /**
   * A callback fired just before the "entering" classes are applied
   */
  onEnter:     React.PropTypes.func,
  /**
   * A callback fired just after the "entering" classes are applied
   */
  onEntering:  React.PropTypes.func,
  /**
   * A callback fired after "enter" classes are applied
   */
  onEntered:   React.PropTypes.func,
  /**
   * A callback fired after "exiting" classes are applied
   */
  onExit:      React.PropTypes.func,
  /**
   * A callback fired after "exiting" classes are applied
   */
  onExiting:   React.PropTypes.func,
  /**
   * A callback fired after "exit" classes are applied
   */
  onExited:    React.PropTypes.func
};

// name the function so it is clearer in the documentation
const noop = ()=>{};

Transition.defaultProps = {
  in:       false,
  duration: 300,
  unmountOnExit: false,
  transitionAppear: false,
  transitioningNode: noop,

  onEnter:    noop,
  onEntering: noop,
  onEntered:  noop,

  onExit:     noop,
  onExiting:  noop,
  onExited:   noop
};

export default Transition;
