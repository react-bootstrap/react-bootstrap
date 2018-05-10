import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import Collapse from './Collapse';
import classNames from 'classnames';
import deprecationWarning from './utils/deprecationWarning';

import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';

class CollapsibleNav extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func,
    activeHref: PropTypes.string,
    activeKey: PropTypes.any,
    collapsible: PropTypes.bool,
    expanded: PropTypes.bool,
    eventKey: PropTypes.any
  };

  static defaultProps = {
    collapsible: false,
    expanded: false
  };

  render() {
    /*
     * this.props.collapsible is set in NavBar when an eventKey is supplied.
     */
    const classes = this.props.collapsible ? 'navbar-collapse' : null;
    const renderChildren = this.props.collapsible ? this.renderCollapsibleNavChildren : this.renderChildren;

    let nav = (
      <div eventKey={this.props.eventKey} className={classNames(this.props.className, classes)} >
        {ValidComponentChildren.map(this.props.children, renderChildren)}
      </div>
    );

    if ( this.props.collapsible ) {
      return (
        <Collapse in={this.props.expanded}>
          { nav }
        </Collapse>
      );
    }
    return nav;
  }

  getChildActiveProp = (child) => {
    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey === this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  };

  renderChildren = (child, index) => {
    let key = child.key ? child.key : index;
    return cloneElement(
      child,
      {
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        ref: 'nocollapse_' + key,
        key,
        navItem: true
      }
    );
  };

  renderCollapsibleNavChildren = (child, index) => {
    let key = child.key ? child.key : index;
    return cloneElement(
      child,
      {
        active: this.getChildActiveProp(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: 'collapsible_' + key,
        key,
        navItem: true
      }
    );
  };
}

export default deprecationWarning.wrapper(CollapsibleNav,
  'CollapsibleNav', 'Navbar.Collapse',
  'http://react-bootstrap.github.io/components.html#navbars'
);
