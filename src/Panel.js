import React, { cloneElement } from 'react';
import classNames from 'classnames';

import BootstrapMixin from './BootstrapMixin';
import Collapse from './Collapse';

const Panel = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    collapsible: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    header: React.PropTypes.node,
    id: React.PropTypes.string,
    footer: React.PropTypes.node,
    defaultExpanded: React.PropTypes.bool,
    expanded: React.PropTypes.bool,
    eventKey: React.PropTypes.any
  },

  getDefaultProps() {
    return {
      bsClass: 'panel',
      bsStyle: 'default',
      defaultExpanded: false
    };
  },

  getInitialState(){
    return {
      expanded: this.props.defaultExpanded
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
    this.setState({ expanded: !this.state.expanded});
  },

  isExpanded(){
    return this.props.expanded != null ? this.props.expanded : this.state.expanded;
  },

  render() {
    return (
      <div {...this.props}
        className={classNames(this.props.className, this.getBsClassSet())}
        id={this.props.collapsible ? null : this.props.id} onSelect={null}>
        {this.renderHeading()}
        {this.props.collapsible ? this.renderCollapsibleBody() : this.renderBody()}
        {this.renderFooter()}
      </div>
    );
  },

  renderCollapsibleBody() {
    let collapseClass = this.prefixClass('collapse');

    return (
      <Collapse in={this.isExpanded()}>
        <div
          className={collapseClass}
          id={this.props.id}
          ref='panel'>
          {this.renderBody()}

        </div>
      </Collapse>
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

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = this.props.collapsible ?
        this.renderCollapsibleTitle(header) : header;
    } else {
      const className = classNames(
        this.prefixClass('title'), header.props.className
      );

      if (this.props.collapsible) {
        header = cloneElement(header, {
          className,
          children: this.renderAnchor(header.props.children)
        });
      } else {
        header = cloneElement(header, {className});
      }
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
        aria-controls={this.props.collapsible ? this.props.id : null}
        className={this.isExpanded() ? null : 'collapsed'}
        aria-expanded={this.isExpanded()}
        onClick={this.handleSelect}>
        {header}
      </a>
    );
  },

  renderCollapsibleTitle(header) {
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
