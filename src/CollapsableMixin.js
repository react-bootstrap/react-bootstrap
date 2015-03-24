var React = require('react');
var TransitionEvents = require('react/lib/ReactTransitionEvents');

var CollapsableMixin = {

  propTypes: {
    defaultExpanded: React.PropTypes.bool,
    expanded: React.PropTypes.bool
  },

  getInitialState: function(){
    var defaultExpanded = this.props.defaultExpanded != null ?
      this.props.defaultExpanded :
        this.props.expanded != null ?
        this.props.expanded :
        false;

    return {
      expanded: defaultExpanded,
      collapsing: false
    };
  },

  componentWillUpdate: function(nextProps, nextState){
    var willExpanded = nextProps.expanded != null ? nextProps.expanded : nextState.expanded;
    if (willExpanded === this.isExpanded()) {
      return;
    }

    // if the expanded state is being toggled, ensure node has a dimension value
    // this is needed for the animation to work and needs to be set before
    // the collapsing class is applied (after collapsing is applied the in class
    // is removed and the node's dimension will be wrong)

    var node = this.getCollapsableDOMNode();
    var dimension = this.dimension();
    var value = '0';

    if(!willExpanded){
      value = this.getCollapsableDimensionValue();
    }

    node.style[dimension] = value + 'px';

    this._afterWillUpdate();
  },

  componentDidUpdate: function(prevProps, prevState){
    // check if expanded is being toggled; if so, set collapsing
    this._checkToggleCollapsing(prevProps, prevState);

    // check if collapsing was turned on; if so, start animation
    this._checkStartAnimation(); 
  },

  // helps enable test stubs
  _afterWillUpdate: function(){
  },

  _checkStartAnimation: function(){
    if(!this.state.collapsing) {
      return;
    }

    var node = this.getCollapsableDOMNode();
    var dimension = this.dimension();
    var value = this.getCollapsableDimensionValue();

    // setting the dimension here starts the transition animation
    var result;
    if(this.isExpanded()) {
      result = value + 'px';
    } else {
      result = '0px';
    }
    node.style[dimension] = result;
  },

  _checkToggleCollapsing: function(prevProps, prevState){
    var wasExpanded = prevProps.expanded != null ? prevProps.expanded : prevState.expanded;
    var isExpanded = this.isExpanded();
    if(wasExpanded !== isExpanded){
      if(wasExpanded) {
        this._handleCollapse();
      } else {
        this._handleExpand();
      }
    }
  },

  _handleExpand: function(){
    var node = this.getCollapsableDOMNode();
    var dimension = this.dimension();

    var complete = (function (){
      this._removeEndEventListener(node, complete);
      // remove dimension value - this ensures the collapsable item can grow
      // in dimension after initial display (such as an image loading)
      node.style[dimension] = '';
      this.setState({
        collapsing:false
      });
    }).bind(this);

    this._addEndEventListener(node, complete);

    this.setState({
      collapsing: true
    });
  },

  _handleCollapse: function(){
    var node = this.getCollapsableDOMNode();

    var complete = (function (){
      this._removeEndEventListener(node, complete);
      this.setState({
        collapsing: false
      });
    }).bind(this);

    this._addEndEventListener(node, complete);

    this.setState({
      collapsing: true
    });
  },

  // helps enable test stubs
  _addEndEventListener: function(node, complete){
    TransitionEvents.addEndEventListener(node, complete);
  },

  // helps enable test stubs
  _removeEndEventListener: function(node, complete){
    TransitionEvents.removeEndEventListener(node, complete);
  },

  dimension: function(){
    return (typeof this.getCollapsableDimension === 'function') ?
      this.getCollapsableDimension() :
      'height';
  },

  isExpanded: function(){
    return this.props.expanded != null ? this.props.expanded : this.state.expanded;
  },

  getCollapsableClassSet: function (className) {
    var classes = {};

    if (typeof className === 'string') {
      className.split(' ').forEach(function (className) {
        if (className) {
          classes[className] = true;
        }
      });
    }

    classes.collapsing = this.state.collapsing;
    classes.collapse = !this.state.collapsing;
    classes['in'] = this.isExpanded() && !this.state.collapsing;

    return classes;
  }
};

module.exports = CollapsableMixin;
