import React from 'react';
import Transition from 'react-overlays/lib/Transition';
import all from 'react-prop-types/lib/all';
import deprecationWarning from './utils/deprecationWarning';

class Fade extends React.Component {
  render() {
    let timeout = this.props.timeout || this.props.duration;

    return (
      <Transition
        {...this.props}
        timeout={timeout}
        className="fade"
        enteredClassName="in"
        enteringClassName="in"
      >
        {this.props.children}
      </Transition>
    );
  }
}

// Explicitly copied from Transition for doc generation.
// TODO: Remove duplication once #977 is resolved.
Fade.propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in: React.PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: React.PropTypes.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear: React.PropTypes.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: React.PropTypes.number,

  /**
   * duration
   * @private
   */
  duration: all(
    React.PropTypes.number,
    (props)=> {
      if (props.duration != null) {
        deprecationWarning('Fade `duration`', 'the `timeout` prop');
      }
      return null;
    }
  ),

  /**
   * Callback fired before the component fades in
   */
  onEnter: React.PropTypes.func,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: React.PropTypes.func,
  /**
   * Callback fired after the has component faded in
   */
  onEntered: React.PropTypes.func,
  /**
   * Callback fired before the component fades out
   */
  onExit: React.PropTypes.func,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: React.PropTypes.func,
  /**
   * Callback fired after the component has faded out
   */
  onExited: React.PropTypes.func
};

Fade.defaultProps = {
  in: false,
  timeout: 300,
  unmountOnExit: false,
  transitionAppear: false
};

export default Fade;
