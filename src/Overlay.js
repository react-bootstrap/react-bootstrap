/* eslint react/prop-types: [2, {ignore: ["container", "containerPadding", "target", "placement", "children"] }] */
/* These properties are validated in 'Portal' and 'Position' components */

import React, { cloneElement } from 'react';
import Portal from './Portal';
import Position from './Position';
import RootCloseWrapper from './RootCloseWrapper';
import CustomPropTypes from './utils/CustomPropTypes';
import Fade from './Fade';
import classNames from 'classnames';

class Overlay extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {exited: !props.show};
    this.onHiddenListener = this.handleHidden.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.setState({exited: false});
    } else if (!nextProps.animation) {
      // Otherwise let handleHidden take care of marking exited.
      this.setState({exited: true});
    }
  }

  render() {
    let {
        container
      , containerPadding
      , target
      , placement
      , rootClose
      , children
      , animation: Transition
      , ...props } = this.props;

    if (Transition === true) {
      Transition = Fade;
    }

    // Don't un-render the overlay while it's transitioning out.
    const mountOverlay = props.show || (Transition && !this.state.exited);
    if (!mountOverlay) {
      // Don't bother showing anything if we don't have to.
      return null;
    }

    let child = children;

    // Position is be inner-most because it adds inline styles into the child,
    // which the other wrappers don't forward correctly.
    child = (
      <Position {...{container, containerPadding, target, placement}}>
        {child}
      </Position>
    );

    if (Transition) {
      let { onExit, onExiting, onEnter, onEntering, onEntered } = props;

      // This animates the child node by injecting props, so it must precede
      // anything that adds a wrapping div.
      child = (
        <Transition
          in={props.show}
          transitionAppear
          onExit={onExit}
          onExiting={onExiting}
          onExited={this.onHiddenListener}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
        >
          {child}
        </Transition>
      );
    } else {
      child = cloneElement(child, {
        className: classNames('in', child.props.className)
      });
    }

    // This goes after everything else because it adds a wrapping div.
    if (rootClose) {
      child = (
        <RootCloseWrapper onRootClose={props.onHide}>
          {child}
        </RootCloseWrapper>
      );
    }

    return (
      <Portal container={container}>
        {child}
      </Portal>
    );
  }

  handleHidden(...args) {
    this.setState({exited: true});

    if (this.props.onExited) {
      this.props.onExited(...args);
    }
  }
}

Overlay.propTypes = {
  ...Portal.propTypes,
  ...Position.propTypes,
  /**
   * Set the visibility of the Overlay
   */
  show: React.PropTypes.bool,
  /**
   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
   */
  rootClose: React.PropTypes.bool,
  /**
   * A Callback fired by the Overlay when it wishes to be hidden.
   */
  onHide: React.PropTypes.func,

  /**
   * Use animation
   */
  animation: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      CustomPropTypes.elementType
  ]),

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: React.PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: React.PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: React.PropTypes.func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: React.PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: React.PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: React.PropTypes.func
};

Overlay.defaultProps = {
  animation: Fade
};

export default Overlay;
