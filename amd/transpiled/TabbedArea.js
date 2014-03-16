define(
  ["./react-es6","./BootstrapMixin","./utils","./Nav","./NavItem","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var BootstrapMixin = __dependency2__["default"];
    var utils = __dependency3__["default"];
    var Nav = __dependency4__["default"];
    var NavItem = __dependency5__["default"];

    var TabbedArea = React.createClass({displayName: 'TabbedArea',
      mixins: [BootstrapMixin],

      propTypes: {
        onSelect: React.PropTypes.func
      },

      getInitialState: function () {
        var initialActiveKey = this.props.initialActiveKey;

        if (initialActiveKey == null) {
          var children = this.props.children;
          initialActiveKey =
            Array.isArray(children) ? children[0].props.key : children.props.key;
        }

        return {
          activeKey: initialActiveKey
        };
      },

      render: function () {
        var activeKey =
          this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

        function hasTab (child) {
          return !!child.props.tab;
        }

        return this.transferPropsTo(
          React.DOM.div(null, 
            Nav( {bsStyle:"tabs", activeKey:activeKey, onSelect:this.handleSelect, ref:"tabs"}, 
              utils.modifyChildren(utils.filterChildren(this.props.children, hasTab), this.renderTab)
            ),
            React.DOM.div( {id:this.props.id, className:"tab-content", ref:"panes"}, 
              utils.modifyChildren(this.props.children, this.renderPane)
            )
          )
        );
      },

      renderPane: function (child) {
        var activeKey =
          this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;
        return utils.cloneWithProps(
            child,
            {
              active: (child.props.key === activeKey),
              ref: child.props.ref,
              key: child.props.key
            }
          );
      },

      renderTab: function (child) {
        var key = child.props.key;
        return (
          NavItem(
            {ref:'tab' + key,
            key:key}, 
            child.props.tab
          )
        );
      },

      shouldComponentUpdate: function() {
        // Defer any updates to this component during the `onSelect` handler.
        return !this._isChanging;
      },

      handleSelect: function (key) {
        if (this.props.onSelect) {
          this._isChanging = true;
          this.props.onSelect(key);
          this._isChanging = false;
        }

        this.setState({
          activeKey: key
        });
      }
    });

    __exports__["default"] = TabbedArea;
  });