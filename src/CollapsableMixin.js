import ReactTransitionEvents  from './react-es6/lib/ReactTransitionEvents';

var CollapsableMixin = {

  getInitialState: function() {
    return {
      isOpen: this.props.defaultOpen != null ? this.props.defaultOpen : null,
      isCollapsing: false
    };
  },

  handleTransitionEnd: function () {
    this._collapseEnd = true;
    this.setState({
      isCollapsing: false
    });
  },

  componentWillReceiveProps: function (newProps) {
    if (this.props.isCollapsable && newProps.isOpen !== this.props.isOpen) {
      this._collapseEnd = false;
      this.setState({
        isCollapsing: true
      });
    }
  },

  _addEndTransitionListener: function () {
    var node = this.getCollapsableDOMNode();

    if (node) {
      ReactTransitionEvents.addEndEventListener(
        node,
        this.handleTransitionEnd
      );
    }
  },

  _removeEndTransitionListener: function () {
    var node = this.getCollapsableDOMNode();

    if (node) {
      ReactTransitionEvents.addEndEventListener(
        node,
        this.handleTransitionEnd
      );
    }
  },

  componentDidMount: function () {
    this._afterRender();
  },

  componentWillUnmount: function () {
    this._removeEndTransitionListener();
  },

  componentWillUpdate: function (nextProps) {
    var dimension = (typeof this.getCollapsableDimension === 'function') ?
      this.getCollapsableDimension() : 'height';
    var node = this.getCollapsableDOMNode();

    this._removeEndTransitionListener();
    if (node && nextProps.isOpen !== this.props.isOpen && this.props.isOpen) {
      node.style[dimension] = this.getCollapsableDimensionValue() + 'px';
    }
  },

  componentDidUpdate: function () {
    this._afterRender();
  },

  _afterRender: function () {
    if (!this.props.isCollapsable) {
      return;
    }

    this._addEndTransitionListener();
    setTimeout(this._updateDimensionAfterRender, 0);
  },

  _updateDimensionAfterRender: function () {
    var dimension = (typeof this.getCollapsableDimension === 'function') ?
      this.getCollapsableDimension() : 'height';
    var node = this.getCollapsableDOMNode();

    if (node) {
      node.style[dimension] = this.isOpen() ?
        this.getCollapsableDimensionValue() + 'px' : '0px';
    }
  },

  isOpen: function () {
    return (this.props.isOpen != null) ? this.props.isOpen : this.state.isOpen;
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

    classes.collapsing = this.state.isCollapsing;
    classes.collapse = !this.state.isCollapsing;
    classes['in'] = this.isOpen() && !this.state.isCollapsing;

    return classes;
  }
};

export default = CollapsableMixin;