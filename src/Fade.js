'use strict';
import React from 'react';
import Transition from './Transition';

class Fade extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    return (
      <Transition
        {...this.props}
        in={this.props.in}
        className='fade'
        enteredClassName='in'
        enteringClassName='in'
      >
        { this.props.children }
      </Transition>
    );
  }
}

Fade.propTypes = {
  /**
   * Fade the Component in or out.
   */
  in:       React.PropTypes.bool,

  /**
   * Provide the durration of the animation in milliseconds, used to ensure that finishing callbacks are fired even if the
   * original browser transition end events are canceled.
   */
  duration:          React.PropTypes.number,

  /**
   * A Callback fired before the component starts to fade in.
   */
  onEnter: React.PropTypes.func,

  /**
   * A Callback fired immediately after the component has started to faded in.
   */
  onEntering: React.PropTypes.func,

  /**
   * A Callback fired after the component has faded in.
   */
  onEntered: React.PropTypes.func,

  /**
   * A Callback fired before the component starts to fade out.
   */
  onExit: React.PropTypes.func,

  /**
   * A Callback fired immediately after the component has started to faded out.
   */
  onExiting: React.PropTypes.func,

  /**
   * A Callback fired after the component has faded out.
   */
  onExited: React.PropTypes.func,


  /**
   * Specify whether the transitioning component should be unmounted (removed from the DOM) once the exit animation finishes.
   */
  unmountOnExit:     React.PropTypes.bool,

  /**
   * Specify whether the component should fade in or out when it mounts.
   */
  transitionAppear: React.PropTypes.bool

};

Fade.defaultProps = {
  in:       false,
  duration: 300,
  dimension: 'height',
  transitionAppear: false,
  unmountOnExit: false
};

export default Fade;

