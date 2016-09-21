import classNames from 'classnames';
import React from 'react';
import uncontrollable from 'uncontrollable';
import warning from 'warning';

import { bsStyles, bsClass, getClassSet, splitBsPropsAndOmit }
  from './utils/bootstrapUtils';
import { State, Style } from './utils/StyleConfig';

import Body from './PanelBody';
import Heading from './PanelHeading';
import Title from './PanelTitle';
import Footer from './PanelFooter';
import Toggle from './PanelToggle';
import Collapse from './PanelCollapse';

const propTypes = {
  onToggle: React.PropTypes.func,
  expanded: React.PropTypes.bool,
  eventKey: React.PropTypes.any,
  collapsible: React.PropTypes.bool,
};

const contextTypes = {
  $bs_panelGroup: React.PropTypes.shape({
    getId: React.PropTypes.func
  })
};

const childContextTypes = {
  $bs_panel: React.PropTypes.shape({
    getIds: React.PropTypes.func,
    bsClass: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    expanded: React.PropTypes.bool,
  })
};

class Panel extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleToggle = this.handleToggle.bind(this);
  }

  getChildContext() {
    const { expanded, eventKey } = this.props;
    let { getId } = this.context.$bs_panelGroup || {};
    let getIds = null;

    if (getId) {
      getIds = () => ({
        headingId: getId(eventKey, 'HEADING'),
        collapseId: getId(eventKey, 'COLLAPSE')
      });
    }

    return {
      $bs_panel: {
        getIds,
        expanded,
        bsClass: this.props.bsClass,
        onToggle: this.handleToggle,
      }
    };
  }

  handleToggle(e) {
    this.props.onToggle(!this.props.expanded, e);
  }

  render() {
    let { className, children } = this.props;
    const [bsProps, props] = splitBsPropsAndOmit(this.props,
      ['onToggle', 'eventKey', 'expanded', 'collapsible']
    );

    if (typeof children === 'string' || typeof children === 'number') {
      children = (
        <Body>{children}</Body>
      );
    }

    return (
      <div
        {...props}
        className={classNames(
          className,
          getClassSet(bsProps)
        )}
      >
        { this.extractChildren(children) }
      </div>
    );
  }

  extractChildren(children) {
    let headers = [];
    let footers = [];
    let body = [];
    let pendingBody = [];
    let i = 0;

    function addChild(array, child) {
      array.push(
        React.isValidElement(child)
          ? React.cloneElement(child, { key: ++i })
          : child
      );
    }

    function maybeWrapPanelBody() {
      if (pendingBody.length === 0) {
        return;
      }
      addChild(body, <Body>{pendingBody}</Body>);
      pendingBody = [];
    }

    React.Children.forEach(children, child => {
      if (child == null) { return; }

      let role = React.isValidElement(child)
        ? child.props.bsRole
        : '';

      switch (role) {
        case 'heading':
          addChild(headers, child);
          break;
        case 'footer':
          addChild(footers, child);
          break;
        case 'body':
          maybeWrapPanelBody();
          addChild(body, child);
          break;
        case 'panel-collapse':
          warning(!this.props.collapsible,
            'You are nesting a `<Panel.Collapse>` inside of a Panel with a `collapsible` prop ' +
            'set to true. Either let the Panel wrap your panel body for you or remove the `collapsible` prop.'
          );
          addChild(body, child);
          break;
        default:
          addChild(pendingBody, child);
          break;
      }
    });

    maybeWrapPanelBody();

    if (this.props.collapsible) {
      body = <Collapse key={++i}>{body}</Collapse>;
    }

    return [...headers, ...body, ...footers];
  }
}

Panel.propTypes = propTypes;

Panel.contextTypes = contextTypes;
Panel.childContextTypes = childContextTypes;

Panel = uncontrollable(
  bsClass('panel',
    bsStyles(
      [...Object.values(State), Style.DEFAULT, Style.PRIMARY],
      Style.DEFAULT,
      Panel
    )
  ),
  { expanded: 'onToggle' }
);

Object.assign(Panel, { Heading, Title, Body, Footer, Toggle, Collapse });

export default Panel;
