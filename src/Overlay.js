/*eslint-disable object-shorthand, react/prop-types */
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

    if (Transition) {
      // This animates the child by injecting props, so it must be inner-most.
      child = (
        <Transition
          in={props.show}
          transitionAppear
          onExited={this.onHiddenListener}
        >
          {child}
        </Transition>
      );
    } else {
      child = cloneElement(
        child,
        {className: classNames('in', child.className)}
      );
    }

    // This must wrap the transition to avoid position recalculations.
    child = (
      <Position {...{container, containerPadding, target, placement}}>
        {child}
      </Position>
    );

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

  handleHidden() {
    this.setState({exited: true});
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
  ])
};

Overlay.defaultProps = {
  animation: Fade
};

export default Overlay;
