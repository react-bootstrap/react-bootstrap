define(
  ["./react-es6","./react-es6/lib/cx","./react-es6/lib/ReactTransitionEvents","./BootstrapMixin","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var ReactTransitionEvents = __dependency3__["default"];
    var BootstrapMixin = __dependency4__["default"];
    var utils = __dependency5__["default"];

    var Panel = React.createClass({displayName: 'Panel',
      mixins: [BootstrapMixin],

      propTypes: {
        header: React.PropTypes.renderable,
        footer: React.PropTypes.renderable,
        isCollapsable: React.PropTypes.bool,
        isOpen: React.PropTypes.bool,
        onClick: React.PropTypes.func
      },

      getDefaultProps: function () {
        return {
          bsClass: 'panel',
          bsStyle: 'default'
        };
      },

      getInitialState: function() {
        return {
          isOpen: this.props.defaultOpen != null ? this.props.defaultOpen : null,
          isCollapsing: false
        };
      },

      handleSelect: function (e) {
        if (this.props.onSelect) {
          this._isChanging = true;
          this.props.onSelect(this.props.key);
          this._isChanging = false;
        }

        e.preventDefault();

        this.setState({
          isOpen: !this.state.isOpen
        });
      },

      shouldComponentUpdate: function () {
        return !this._isChanging;
      },

      handleTransitionEnd: function () {
        this._collapseEnd = true;
        this.setState({
          collapsePhase: 'end',
          isCollapsing: false
        });
      },

      componentWillReceiveProps: function (newProps) {
        if (newProps.isOpen !== this.props.isOpen) {
          this._collapseEnd = false;
          this.setState({
            collapsePhase: 'start',
            isCollapsing: true
          });
        }
      },

      _addEndTransitionListener: function () {
        if (this.refs && this.refs.panel) {
          ReactTransitionEvents.addEndEventListener(
            this.refs.panel.getDOMNode(),
            this.handleTransitionEnd
          );
        }
      },

      _removeEndTransitionListener: function () {
        if (this.refs && this.refs.panel) {
          ReactTransitionEvents.addEndEventListener(
            this.refs.panel.getDOMNode(),
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
        this._removeEndTransitionListener();
        if (nextProps.isOpen !== this.props.isOpen && this.props.isOpen) {
          this.refs.panel.getDOMNode().style.height = this._getBodyHeight() + 'px';
        }
      },

      componentDidUpdate: function () {
        this._afterRender();
      },

      _afterRender: function () {
        this._addEndTransitionListener();
        setTimeout(this._updateHeightAfterRender, 0);
      },

      _getBodyHeight: function () {
        return this.refs.body.getDOMNode().offsetHeight;
      },

      _updateHeightAfterRender: function () {
        if (this.isMounted() && this.refs && this.refs.panel) {
          this.refs.panel.getDOMNode().style.height = this.isOpen() ?
            this._getBodyHeight() + 'px' : '0px';
        }
      },

      isOpen: function () {
        return (this.props.isOpen != null) ? this.props.isOpen : this.state.isOpen;
      },

      render: function () {
        var classes = this.getBsClassSet();
        classes['panel'] = true;

        return this.transferPropsTo(
          React.DOM.div( {className:classSet(classes), id:this.props.isCollapsable ? null : this.props.id}, 
            this.renderHeading(),
            this.props.isCollapsable ? this.renderCollapsableBody() : this.renderBody(),
            this.renderFooter()
          )
        );
      },

      renderCollapsableBody: function () {
        var classes = {
              'panel-collapse': true,
              'collapsing': this.state.isCollapsing,
              'collapse': !this.state.isCollapsing,
              'in': this.isOpen() && !this.state.isCollapsing
            };


        return (
          React.DOM.div( {className:classSet(classes), id:this.props.id, ref:"panel"}, 
            this.renderBody()
          )
        );
      },

      renderBody: function () {
        return (
          React.DOM.div( {className:"panel-body", ref:"body"}, 
            this.props.children
          )
        );
      },

      renderHeading: function () {
        var header = this.props.header;

        if (!header) {
          return null;
        }

        if (!React.isValidComponent(header) || Array.isArray(header)) {
          header = this.props.isCollapsable ?
            this.renderCollapsableTitle(header) : header;
        } else if (this.props.isCollapsable) {
          header = utils.cloneWithProps(header, {
            className: 'panel-title',
            children: this.renderAnchor(header.props.children)
          });
        } else {
          header = utils.cloneWithProps(header, {
            className: 'panel-title'
          });
        }

        return (
          React.DOM.div( {className:"panel-heading"}, 
            header
          )
        );
      },

      renderAnchor: function (header) {
        return (
          React.DOM.a(
            {href:'#' + (this.props.id || ''),
            className:this.isOpen() ? null : 'collapsed',
            onClick:this.handleSelect}, 
            header
          )
        );
      },

      renderCollapsableTitle: function (header) {
        return (
          React.DOM.h4( {className:"panel-title"}, 
            this.renderAnchor(header)
          )
        );
      },

      renderFooter: function () {
        if (!this.props.footer) {
          return null;
        }

        return (
          React.DOM.div( {className:"panel-footer"}, 
            this.props.footer
          )
        );
      }
    });

    __exports__["default"] = Panel;
  });