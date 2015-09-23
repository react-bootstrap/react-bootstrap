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
    id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    footer: React.PropTypes.node,
    defaultExpanded: React.PropTypes.bool,
    expanded: React.PropTypes.bool,
    eventKey: React.PropTypes.any,
    headerRole: React.PropTypes.string,
    panelRole: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      bsClass: 'panel',
      bsStyle: 'default',
      defaultExpanded: false
    };
  },

  getInitialState() {
    return {
      expanded: this.props.defaultExpanded
    };
  },

  handleSelect(e) {
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

  handleToggle() {
    this.setState({ expanded: !this.state.expanded});
  },

  isExpanded() {
    return this.props.expanded != null ? this.props.expanded : this.state.expanded;
  },

  render() {
    let {headerRole, panelRole, ...props} = this.props;
    return (
      <div {...props}
        className={classNames(this.props.className, this.getBsClassSet())}
        id={this.props.collapsible ? null : this.props.id} onSelect={null}>
        {this.renderHeading(headerRole)}
        {this.props.collapsible ? this.renderCollapsibleBody(panelRole) : this.renderBody()}
        {this.renderFooter()}
      </div>
    );
  },

  renderCollapsibleBody(panelRole) {
    let props = {
      className: this.prefixClass('collapse'),
      id: this.props.id,
      ref: 'panel',
      'aria-hidden': !this.isExpanded()
    };
    if (panelRole) {
      props.role = panelRole;
    }

    return (
      <Collapse in={this.isExpanded()}>
        <div {...props}>
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

    function addPanelChild(child) {
      bodyElements.push(cloneElement(child, getProps()));
    }

    function addPanelBody(children) {
      bodyElements.push(
        <div className={bodyClass} {...getProps()}>
          {children}
        </div>
      );
    }

    function maybeRenderPanelBody() {
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
      allChildren.forEach( child => {
        if (this.shouldRenderFill(child)) {
          maybeRenderPanelBody();

          // Separately add the filled element.
          addPanelChild(child);
        } else {
          panelBodyChildren.push(child);
        }
      });

      maybeRenderPanelBody();
    }

    return bodyElements;
  },

  shouldRenderFill(child) {
    return React.isValidElement(child) && child.props.fill != null;
  },

  renderHeading(headerRole) {
    let header = this.props.header;

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = this.props.collapsible ?
        this.renderCollapsibleTitle(header, headerRole) : header;
    } else {
      const className = classNames(
        this.prefixClass('title'), header.props.className
      );

      if (this.props.collapsible) {
        header = cloneElement(header, {
          className,
          children: this.renderAnchor(header.props.children, headerRole)
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

  renderAnchor(header, headerRole) {
    return (
      <a
        href={'#' + (this.props.id || '')}
        aria-controls={this.props.collapsible ? this.props.id : null}
        className={this.isExpanded() ? null : 'collapsed'}
        aria-expanded={this.isExpanded()}
        aria-selected={this.isExpanded()}
        onClick={this.handleSelect}
        role={headerRole}>
        {header}
      </a>
    );
  },

  renderCollapsibleTitle(header, headerRole) {
    return (
      <h4 className={this.prefixClass('title')} role="presentation">
        {this.renderAnchor(header, headerRole)}
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
