import React from 'react';
import TransitionEvents from 'react/lib/ReactTransitionEvents';

const CollapsableMixin = {

  propTypes: {
    defaultExpanded: React.PropTypes.bool,
    expanded: React.PropTypes.bool
  },

  getInitialState(){
    let defaultExpanded = this.props.defaultExpanded != null ?
      this.props.defaultExpanded :
        this.props.expanded != null ?
        this.props.expanded :
        false;

    return {
      expanded: defaultExpanded,
      collapsing: false
    };
  },

  componentWillUpdate(nextProps, nextState){
    let willExpanded = nextProps.expanded != null ? nextProps.expanded : nextState.expanded;
    if (willExpanded === this.isExpanded()) {
      return;
    }

    // if the expanded state is being toggled, ensure node has a dimension value
    // this is needed for the animation to work and needs to be set before
    // the collapsing class is applied (after collapsing is applied the in class
    // is removed and the node's dimension will be wrong)

    let node = this.getCollapsableDOMNode();
    let dimension = this.dimension();
    let value = '0';

    if(!willExpanded){
      value = this.getCollapsableDimensionValue();
    }

    node.style[dimension] = value + 'px';

    this._afterWillUpdate();
  },

  componentDidUpdate(prevProps, prevState){
    // check if expanded is being toggled; if so, set collapsing
    this._checkToggleCollapsing(prevProps, prevState);

    // check if collapsing was turned on; if so, start animation
    this._checkStartAnimation();
  },

  // helps enable test stubs
  _afterWillUpdate(){
  },

  _checkStartAnimation(){
    if(!this.state.collapsing) {
      return;
    }

    let node = this.getCollapsableDOMNode();
    let dimension = this.dimension();
    let value = this.getCollapsableDimensionValue();

    // setting the dimension here starts the transition animation
    let result;
    if(this.isExpanded()) {
      result = value + 'px';
    } else {
      result = '0px';
    }
    node.style[dimension] = result;
  },

  _checkToggleCollapsing(prevProps, prevState){
    let wasExpanded = prevProps.expanded != null ? prevProps.expanded : prevState.expanded;
    let isExpanded = this.isExpanded();
    if(wasExpanded !== isExpanded){
      if(wasExpanded) {
        this._handleCollapse();
      } else {
        this._handleExpand();
      }
    }
  },

  _handleExpand(){
    let node = this.getCollapsableDOMNode();
    let dimension = this.dimension();

    let complete = () => {
      this._removeEndEventListener(node, complete);
      // remove dimension value - this ensures the collapsable item can grow
      // in dimension after initial display (such as an image loading)
      node.style[dimension] = '';
      this.setState({
        collapsing:false
      });
    };

    this._addEndEventListener(node, complete);

    this.setState({
      collapsing: true
    });
  },

  _handleCollapse(){
    let node = this.getCollapsableDOMNode();

    let complete = () => {
      this._removeEndEventListener(node, complete);
      this.setState({
        collapsing: false
      });
    };

    this._addEndEventListener(node, complete);

    this.setState({
      collapsing: true
    });
  },

  // helps enable test stubs
  _addEndEventListener(node, complete){
    TransitionEvents.addEndEventListener(node, complete);
  },

  // helps enable test stubs
  _removeEndEventListener(node, complete){
    TransitionEvents.removeEndEventListener(node, complete);
  },

  dimension(){
    return (typeof this.getCollapsableDimension === 'function') ?
      this.getCollapsableDimension() :
      'height';
  },

  isExpanded(){
    return this.props.expanded != null ? this.props.expanded : this.state.expanded;
  },

  getCollapsableClassSet(className) {
    let classes = {};

    if (typeof className === 'string') {
      className.split(' ').forEach(subClasses => {
        if (subClasses) {
          classes[subClasses] = true;
        }
      });
    }

    classes.collapsing = this.state.collapsing;
    classes.collapse = !this.state.collapsing;
    classes.in = this.isExpanded() && !this.state.collapsing;

    return classes;
  }
};

export default CollapsableMixin;
