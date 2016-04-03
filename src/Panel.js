import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import uncontrollable from 'uncontrollable';

import { bsStyles, bsClass, getClassSet, splitBsPropsAndOmit }
  from './utils/bootstrapUtils';
import { State, Style } from './utils/StyleConfig';

import Body from './PanelBody';
import Heading from './PanelHeading';
import Footer from './PanelFooter';
import Toggle from './PanelToggle';
import Collapse from './PanelCollapse';

const propTypes = {
  onToggle: PropTypes.func,
  expanded: PropTypes.bool,
  eventKey: PropTypes.any
};

const contextTypes = {
  $bs_panelGroup: PropTypes.shape({
    getId: PropTypes.func
  })
};


const childContextTypes = {
  $bs_panel: PropTypes.shape({
    getHeaderId: PropTypes.func,
    getCollapseId: PropTypes.func,
    bsClass: PropTypes.string,
    onToggle: PropTypes.func,
    expanded: PropTypes.bool,
  })
};

class Panel extends React.Component {

  getChildContext() {
    let { getId } = this.context.$bs_panel_group || {};
    let getIds = null;

    if (getId) {
      getIds = () => ({
        headerId: getId(this.props.eventKey, 'HEADER'),
        collapseId: getId(this.props.eventKey, 'COLLAPSE')
      });
    }

    return {
      $bs_panel: {
        getIds,
        bsClass: this.props.bsClass,
        onToggle: this.handleToggle,
        expanded: this.props.expanded
      }
    };
  }

  handleToggle(e) {
    this.props.onToggle(!this.props.expanded, e);
  }

  render() {
    let { className, children } = this.props;
    const [bsProps, props] = splitBsPropsAndOmit(this.props, ['onToggle', 'eventKey', 'expanded']);

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
        { children }
      </div>
    );
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

Object.assign(Panel, { Heading, Body, Footer, Toggle, Collapse });

export default Panel;
