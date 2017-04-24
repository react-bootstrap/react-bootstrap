import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import uncontrollable from 'uncontrollable';

import { bsStyles, bsClass, getClassSet, splitBsPropsAndOmit }
  from './utils/bootstrapUtils';
import { State, Style } from './utils/StyleConfig';
import Body from './PanelBody';
import Heading from './PanelHeading';
import Title from './PanelTitle';
import Footer from './PanelFooter';
import Toggle from './PanelToggle';
import Collapse from './PanelCollapse';

const defaultGetId = (id, type) => id ? `${id}--${type}` : null;

const propTypes = {
  /**
   * Controls the collapsed/expanded state ofthe Panel. Requires a `Panel.Collapse` or `<Panel.Body collapsible>` child component
   * in order to actually animate out or in,
   *
   * @controllable onToggle
   */
  expanded: PropTypes.bool,
  /**
   * A callback fired when the collapse state changes.
   *
   * @controllable expanded
   */
  onToggle: PropTypes.func,
  eventKey: PropTypes.any,

  /**
   * An HTML `id` attribute uniquely identifying the Panel component.
   */
  id: PropTypes.string,
};

const contextTypes = {
  $bs_panelGroup: PropTypes.shape({
    getId: PropTypes.func,
    activeKey: PropTypes.any,
    onToggle: PropTypes.func,
  })
};


const childContextTypes = {
  $bs_panel: PropTypes.shape({
    getIds: PropTypes.func,
    bsClass: PropTypes.string,
    onToggle: PropTypes.func,
    expanded: PropTypes.bool,
  })
};

class Panel extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleToggle = this.handleToggle.bind(this);
  }

  getChildContext() {
    const { eventKey, id } = this.props;
    const { getId = defaultGetId } = this.context.$bs_panelGroup || {};

    let getIds = null;
    if (getId || id) {
      getIds = () => ({
        headingId: getId(eventKey || id, 'HEADING'),
        collapseId: getId(eventKey || id, 'COLLAPSE')
      });
    }

    return {
      $bs_panel: {
        getIds,
        bsClass: this.props.bsClass,
        expanded: this.getExpanded(),
        onToggle: this.handleToggle,
      }
    };
  }

  handleToggle(e) {
    const { onToggle } = this.context.$bs_panelGroup || {};
    const expanded = !this.getExpanded();

    this.props.onToggle(expanded, e);
    if (onToggle) {
      onToggle(this.props.eventKey, expanded, e);
    }
  }

  getExpanded() {
    const { eventKey } = this.props;
    const { activeKey } = this.context.$bs_panelGroup || {};

    return this.props.expanded != null || activeKey === undefined ?
      this.props.expanded :
      activeKey === eventKey;
  }

  render() {
    let { className, children } = this.props;
    const [bsProps, props] = splitBsPropsAndOmit(this.props,
      ['onToggle', 'eventKey', 'expanded']
    );

    return (
      <div
        {...props}
        className={classNames(
          className,
          getClassSet(bsProps)
        )}
      >
        {children}
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

Object.assign(Panel, { Heading, Title, Body, Footer, Toggle, Collapse });

export default Panel;
