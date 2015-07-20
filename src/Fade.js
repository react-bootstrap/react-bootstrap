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
// TODO: Remove duplication once #977 is resolved.

Fade.propTypes = {
  /**
   * Whether the component is faded in
   */
  in: React.PropTypes.bool,

  /**
   * Whether the component should be unmounted (removed from DOM) when faded
   * out
   */
  unmountOnExit: React.PropTypes.bool,

  /**
   * Whether the component should fade in after mounting
   */
  transitionAppear: React.PropTypes.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  duration: React.PropTypes.number,

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
  duration: 300,
  unmountOnExit: false,
  transitionAppear: false
};

export default Fade;

