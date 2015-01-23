var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

var BootstrapMixin = require('./BootstrapMixin');
var CollapsableMixin = require('./CollapsableMixin');

var Panel = React.createClass({
  mixins: [BootstrapMixin, CollapsableMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    header: React.PropTypes.node,
    footer: React.PropTypes.node,
    eventKey: React.PropTypes.any
  },

  getDefaultProps: function () {
    return {
      bsClass: 'panel',
      bsStyle: 'default'
    };
  },

  handleSelect: function (e) {
    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(this.props.eventKey);
      this._isChanging = false;
    }

    e.preventDefault();

    this.setState({
      expanded: !this.state.expanded
    });
  },

  shouldComponentUpdate: function () {
    return !this._isChanging;
  },

  getCollapsableDimensionValue: function () {
    return this.refs.body.getDOMNode().offsetHeight;
  },

  getCollapsableDOMNode: function () {
    if (!this.isMounted() || !this.refs || !this.refs.panel) {
      return null;
    }

    return this.refs.panel.getDOMNode();
  },

  render: function () {
    var classes = this.getBsClassSet();
    classes['panel'] = true;

    return (
      <div {...this.props} className={joinClasses(this.props.className, classSet(classes))}
        id={this.props.collapsable ? null : this.props.id} onSelect={null}>
        {this.renderHeading()}
        {this.props.collapsable ? this.renderCollapsableBody() : this.renderBody()}
        {this.renderFooter()}
      </div>
    );
  },

  renderCollapsableBody: function () {
    return (
      <div className={classSet(this.getCollapsableClassSet('panel-collapse'))} id={this.props.id} ref="panel">
        {this.renderBody()}
      </div>
    );
  },

  renderBody: function () {
    var allChildren = this.props.children;
    var bodyElements = [];

    function getProps() {
      var index = bodyElements.length;
      var props = {key: index};

      // Arbitrarily assign the body ref to the first element. We can't wrap
      // all body elements in a single DOM node, because the selector for the
      // panel-filling behavior in Bootstrap looks like ".panel>.list-group",
      // which will not work if there are any DOM nodes between the ".panel"
      // element and the ".list-group" element.
      if (index == 0) {
        props.ref = 'body';
      }

      return props;
    }

    function addPanelBody (children) {
      bodyElements.push(
        <div className="panel-body" {...getProps()}>
          {children}
        </div>
      );
    }

    // Handle edge cases where we should not iterate through children.
    if (!Array.isArray(allChildren) || allChildren.length == 0) {
      addPanelBody(allChildren);
    } else {
      var panelBodyChildren = [];

      function maybeRenderPanelBody () {
        if (panelBodyChildren.length == 0) {
          return;
        }

        addPanelBody(panelBodyChildren);
        panelBodyChildren = [];
      }

      allChildren.forEach(function(child) {
        if (React.isValidElement(child) && child.props.fill != null) {
          maybeRenderPanelBody();

          // Separately add the filled element.
          bodyElements.push(cloneWithProps(child, getProps()));
        } else {
          panelBodyChildren.push(child);
        }
      });

      maybeRenderPanelBody();
    }

    return bodyElements;
  },

  renderHeading: function () {
    var header = this.props.header;

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = this.props.collapsable ?
        this.renderCollapsableTitle(header) : header;
    } else if (this.props.collapsable) {
      header = cloneWithProps(header, {
        className: 'panel-title',
        children: this.renderAnchor(header.props.children)
      });
    } else {
      header = cloneWithProps(header, {
        className: 'panel-title'
      });
    }

    return (
      <div className="panel-heading">
        {header}
      </div>
    );
  },

  renderAnchor: function (header) {
    return (
      <a
        href={'#' + (this.props.id || '')}
        className={this.isExpanded() ? null : 'collapsed'}
        onClick={this.handleSelect}>
        {header}
      </a>
    );
  },

  renderCollapsableTitle: function (header) {
    return (
      <h4 className="panel-title">
        {this.renderAnchor(header)}
      </h4>
    );
  },

  renderFooter: function () {
    if (!this.props.footer) {
      return null;
    }

    return (
      <div className="panel-footer">
        {this.props.footer}
      </div>
    );
  }
});

module.exports = Panel;
