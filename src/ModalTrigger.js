import React, { cloneElement } from 'react';
import CustomPropTypes from './utils/CustomPropTypes';
import deprecationWarning from './utils/deprecationWarning';

import createChainedFunction from './utils/createChainedFunction';
import createContextWrapper from './utils/createContextWrapper';
import { OverlayMixin } from './OverlayMixin';

function createHideDepreciationWrapper(hide){
  return function(...args){
    deprecationWarning(
        'The Modal prop `onRequestHide`', 'the `onHide` prop');

    return hide(...args);
  };
}

const ModalTrigger = React.createClass({

  mixins: [ OverlayMixin ],

  propTypes: {
    modal: React.PropTypes.node.isRequired,
    /**
     * The DOM Node that the Component will render it's children into
     */
    container: CustomPropTypes.mountable,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func
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
    let modal = this.props.modal;

    if (!this.state.isOverlayShown) {
      return <span />;
    }

    return cloneElement(
      modal,
      {
        onHide: this.hide,
        onRequestHide: createHideDepreciationWrapper(this.hide),
        __isUsedInModalTrigger: true
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

/**
 * Creates a new ModalTrigger class that forwards the relevant context
 *
 * This static method should only be called at the module level, instead of in
 * e.g. a render() method, because it's expensive to create new classes.
 *
 * For example, you would want to have:
 *
 * > export default ModalTrigger.withContext({
 * >   myContextKey: React.PropTypes.object
 * > });
 *
 * and import this when needed.
 */
ModalTrigger.withContext = createContextWrapper(ModalTrigger, 'modal');

let DepreciatedModalTrigger = React.createClass({
  componentWillMount(){
    deprecationWarning(
        'The `ModalTrigger` component', 'the `Modal` component directly'
      , 'http://react-bootstrap.github.io/components.html#modals');
  },

  render(){
    return (<ModalTrigger {...this.props}/>);
  }
});

DepreciatedModalTrigger.withContext = ModalTrigger.withContext;
DepreciatedModalTrigger.ModalTrigger = ModalTrigger;

export default DepreciatedModalTrigger;
