import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Transition from 'react-overlays/lib/Transition';
import deprecated from 'react-prop-types/lib/deprecated';

class Fade extends React.Component {
  render() {
    let timeout = this.props.timeout || this.props.duration;

    return (
      <Transition
        {...this.props}
        timeout={timeout}
        className={classNames(this.props.className, 'fade')}
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
  in: PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear: PropTypes.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: PropTypes.number,

  /**
   * duration
   * @private
   */
  duration: deprecated(PropTypes.number, 'Use `timeout`.'),

  /**
   * Callback fired before the component fades in
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the has component faded in
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired before the component fades out
   */
  onExit: PropTypes.func,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the component has faded out
   */
  onExited: PropTypes.func
};

Fade.defaultProps = {
  in: false,
  timeout: 300,
  unmountOnExit: false,
  transitionAppear: false
};

export default Fade;
