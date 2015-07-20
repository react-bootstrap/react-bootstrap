import React from 'react';
import Transition from './Transition';

class Fade extends React.Component {
  render() {
    return (
      <Transition
        {...this.props}
        className='fade'
        enteredClassName='in'
        enteringClassName='in'
      >
        {this.props.children}
      </Transition>
    );
  }
}

// Explicitly copied from Transition for doc generation.

Fade.propTypes = {
  /**
   * Whether the component is entered; triggers the enter or exit animation
   */
  in: React.PropTypes.bool,

  /**
   * Whether the component should be unmounted (removed from DOM) when exited
   */
  unmountOnExit: React.PropTypes.bool,

  /**
   * Whether transition in should run when the Transition component mounts, if
   * the component is initially entered
   */
  transitionAppear: React.PropTypes.bool,

  /**
   * Duration of the animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  duration: React.PropTypes.number,

  /**
   * Callback fired before the "entering" classes are applied
   */
  onEnter: React.PropTypes.func,
  /**
   * Callback fired after the "entering" classes are applied
   */
  onEntering: React.PropTypes.func,
  /**
   * Callback fired after the "enter" classes are applied
   */
  onEntered: React.PropTypes.func,
  /**
   * Callback fired before the "exiting" classes are applied
   */
  onExit: React.PropTypes.func,
  /**
   * Callback fired after the "exiting" classes are applied
   */
  onExiting: React.PropTypes.func,
  /**
   * Callback fired after the "exited" classes are applied
   */
  onExited: React.PropTypes.func
};

Fade.defaultProps = {
  in: false,
  duration: 300,
  unmountOnExit: false,
  transitionAppear: false
};

export default Fade;

