import React, { cloneElement } from 'react';
import OverlayMixin from './OverlayMixin';

import createChainedFunction from './utils/createChainedFunction';

const ModalTrigger = React.createClass({
  mixins: [OverlayMixin],

  propTypes: {
    modal: React.PropTypes.node.isRequired
  },

  getInitialState() {
    return {
      isOverlayShown: false
    };
  },

  show() {
    this.setState({
      isOverlayShown: true
    });
  },

  hide() {
    this.setState({
      isOverlayShown: false
    });
  },

  toggle() {
    this.setState({
      isOverlayShown: !this.state.isOverlayShown
    });
  },

  renderOverlay() {
    if (!this.state.isOverlayShown) {
      return <span />;
    }

    return cloneElement(
      this.props.modal,
      {
        onRequestHide: this.hide
      }
    );
  },

  render() {
    let child = React.Children.only(this.props.children);
    return cloneElement(
      child,
      {
        onClick: createChainedFunction(child.props.onClick, this.toggle)
      }
    );
  }
});

export default ModalTrigger;
