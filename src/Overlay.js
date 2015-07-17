/*eslint-disable object-shorthand, react/prop-types */
import React, { cloneElement } from 'react';
import Portal from './Portal';
import Position from './Position';
import RootCloseWrapper from './RootCloseWrapper';
import CustomPropTypes from './utils/CustomPropTypes';
import Fade from './Fade';
import classNames from 'classnames';


class Overlay extends React.Component {

  constructor(props, context){
    super(props, context);

    this.state = { exited: false };
    this.onHiddenListener = this.handleHidden.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let state = {};

    if ( !nextProps.show && this.props.show ){
      state.exiting = true;
    }

    if (nextProps.show) {
      state = { exited: false, exiting: false };
    }

    this.setState(state);
  }

  render(){
    let {
        container
      , containerPadding
      , target
      , placement
      , rootClose
      , children
      , animation: Transition
      , ...props } = this.props;

    let child = null;

    if ( Transition === true ){
      Transition = Fade;
    }

    if (props.show || (Transition && this.state.exiting && !this.state.exited)) {

      child = children;

      // Position the child before the animation to avoid `null` DOM nodes
      child = (
        <Position {...{ container, containerPadding, target, placement }}>
          { child }
        </Position>
      );

      child = Transition
          ? (
            <Transition
              unmountOnExit
              in={props.show}
              transitionAppear={props.show}
              onExited={this.onHiddenListener}
            >
              { child }
            </Transition>
          )
          : cloneElement(child, { className: classNames('in', child.className) });

      //Adds a wrapping div so it cannot be before Transition
      if (rootClose) {
        child = (
          <RootCloseWrapper onRootClose={props.onHide}>
            { child }
          </RootCloseWrapper>
        );
      }
    }


    return (
      <Portal container={container}>
        { child }
      </Portal>
    );
  }

  handleHidden(){
    this.setState({ exited: true, exiting: false });
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
