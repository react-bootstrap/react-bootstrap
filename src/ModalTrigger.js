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
    let props = {};

    props.onClick = createChainedFunction(child.props.onClick, this.toggle);
    props.onMouseOver = createChainedFunction(child.props.onMouseOver, this.props.onMouseOver);
    props.onMouseOut = createChainedFunction(child.props.onMouseOut, this.props.onMouseOut);
    props.onFocus = createChainedFunction(child.props.onFocus, this.props.onFocus);
    props.onBlur = createChainedFunction(child.props.onBlur, this.props.onBlur);

    return cloneElement(child, props);
  }
});

export default ModalTrigger;
