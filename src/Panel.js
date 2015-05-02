import React, { cloneElement } from 'react';
import classNames from 'classnames';

import BootstrapMixin from './BootstrapMixin';
import CollapsibleMixin from './CollapsibleMixin';
import {collapsable} from './utils/deprecationWarning';

const Panel = React.createClass({
  mixins: [BootstrapMixin, CollapsibleMixin],

  propTypes: {
    collapsable,
    collapsible: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    header: React.PropTypes.node,
    id: React.PropTypes.string,
    footer: React.PropTypes.node,
    eventKey: React.PropTypes.any
  },

  getDefaultProps() {
    return {
      bsClass: 'panel',
      bsStyle: 'default'
    };
  },

  handleSelect(e){
    e.selected = true;

    if (this.props.onSelect) {
      this.props.onSelect(e, this.props.eventKey);
    } else {
      e.preventDefault();
    }

    if (e.selected) {
      this.handleToggle();
    }
  },

  handleToggle(){
    this.setState({expanded:!this.state.expanded});
  },

  getCollapsibleDimensionValue() {
    return React.findDOMNode(this.refs.panel).scrollHeight;
  },

  getCollapsibleDOMNode() {
    if (!this.isMounted() || !this.refs || !this.refs.panel) {
      return null;
    }

    return React.findDOMNode(this.refs.panel);
  },

  render() {
    let classes = this.getBsClassSet();
    let collapsible = this.props.collapsible || this.props.collapsable;

    return (
      <div {...this.props}
        className={classNames(this.props.className, classes)}
        id={collapsible ? null : this.props.id} onSelect={null}>
        {this.renderHeading()}
        {collapsible ? this.renderCollapsableBody() : this.renderBody()}
        {this.renderFooter()}
      </div>
    );
  },

  renderCollapsableBody() {
    let collapseClass = this.prefixClass('collapse');

    return (
      <div
        className={classNames(this.getCollapsibleClassSet(collapseClass))}
        id={this.props.id}
        ref='panel'
        aria-expanded={this.isExpanded() ? 'true' : 'false'}>
        {this.renderBody()}
      </div>
    );
  },

  renderBody() {
    let allChildren = this.props.children;
    let bodyElements = [];
    let panelBodyChildren = [];
    let bodyClass = this.prefixClass('body');

    function getProps() {
      return {key: bodyElements.length};
    }

    function addPanelChild (child) {
      bodyElements.push(cloneElement(child, getProps()));
    }

    function addPanelBody (children) {
      bodyElements.push(
        <div className={bodyClass} {...getProps()}>
          {children}
        </div>
      );
    }

    function maybeRenderPanelBody () {
      if (panelBodyChildren.length === 0) {
        return;
      }

      addPanelBody(panelBodyChildren);
      panelBodyChildren = [];
    }

    // Handle edge cases where we should not iterate through children.
    if (!Array.isArray(allChildren) || allChildren.length === 0) {
      if (this.shouldRenderFill(allChildren)) {
        addPanelChild(allChildren);
      } else {
        addPanelBody(allChildren);
      }
    } else {

      allChildren.forEach(function(child) {
        if (this.shouldRenderFill(child)) {
          maybeRenderPanelBody();

          // Separately add the filled element.
          addPanelChild(child);
        } else {
          panelBodyChildren.push(child);
        }
      }.bind(this));

      maybeRenderPanelBody();
    }

    return bodyElements;
  },

  shouldRenderFill(child) {
    return React.isValidElement(child) && child.props.fill != null;
  },

  renderHeading() {
    let header = this.props.header;
    let collapsible = this.props.collapsible || this.props.collapsable;

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = collapsible ?
        this.renderCollapsableTitle(header) : header;
    } else if (collapsible) {

      header = cloneElement(header, {
        className: classNames(this.prefixClass('title')),
        children: this.renderAnchor(header.props.children)
      });
    } else {

      header = cloneElement(header, {
        className: classNames(this.prefixClass('title'))
      });
    }

    return (
      <div className={this.prefixClass('heading')}>
        {header}
      </div>
    );
  },

  renderAnchor(header) {
    return (
      <a
        href={'#' + (this.props.id || '')}
        className={this.isExpanded() ? null : 'collapsed'}
        aria-expanded={this.isExpanded() ? 'true' : 'false'}
        onClick={this.handleSelect}>
        {header}
      </a>
    );
  },

  renderCollapsableTitle(header) {
    return (
      <h4 className={this.prefixClass('title')}>
        {this.renderAnchor(header)}
      </h4>
    );
  },

  renderFooter() {
    if (!this.props.footer) {
      return null;
    }

    return (
      <div className={this.prefixClass('footer')}>
        {this.props.footer}
      </div>
    );
  }
});

export default Panel;
