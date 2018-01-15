import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import uncontrollable from 'uncontrollable';
import warning from 'warning';

import {
  bsStyles,
  bsClass,
  getClassSet,
  splitBsPropsAndOmit
} from './utils/bootstrapUtils';
import { State, Style } from './utils/StyleConfig';
import Body from './PanelBody';
import Heading from './PanelHeading';
import Title from './PanelTitle';
import Footer from './PanelFooter';
import Toggle from './PanelToggle';
import Collapse from './PanelCollapse';

const has = Object.prototype.hasOwnProperty;

const defaultGetId = (id, type) => (id ? `${id}--${type}` : null);

const propTypes = {
  /**
   * Controls the collapsed/expanded state ofthe Panel. Requires
   * a `Panel.Collapse` or `<Panel.Body collapsible>` child component
   * in order to actually animate out or in.
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
  id: PropTypes.string
};

const contextTypes = {
  $bs_panelGroup: PropTypes.shape({
    getId: PropTypes.func,
    activeKey: PropTypes.any,
    onToggle: PropTypes.func
  })
};

const childContextTypes = {
  $bs_panel: PropTypes.shape({
    headingId: PropTypes.string,
    bodyId: PropTypes.string,
    bsClass: PropTypes.string,
    onToggle: PropTypes.func,
    expanded: PropTypes.bool
  })
};

class Panel extends React.Component {
  getChildContext() {
    const { eventKey, id } = this.props;
    const idKey = eventKey == null ? id : eventKey;

    let ids;

    if (idKey !== null) {
      const panelGroup = this.context.$bs_panelGroup;
      const getId = (panelGroup && panelGroup.getId) || defaultGetId;

      ids = {
        headingId: getId(idKey, 'heading'),
        bodyId: getId(idKey, 'body')
      };
    }

    return {
      $bs_panel: {
        ...ids,
        bsClass: this.props.bsClass,
        expanded: this.getExpanded(),
        onToggle: this.handleToggle
      }
    };
  }

  getExpanded() {
    const panelGroup = this.context.$bs_panelGroup;

    if (panelGroup && has.call(panelGroup, 'activeKey')) {
      warning(
        this.props.expanded == null,
        'Specifying `<Panel>` `expanded` in the context of an accordion ' +
          '`<PanelGroup>` is not supported. Set `activeKey` on the ' +
          '`<PanelGroup>` instead.'
      );

      return panelGroup.activeKey === this.props.eventKey;
    }

    return !!this.props.expanded;
  }

  handleToggle = e => {
    const panelGroup = this.context.$bs_panelGroup;
    const expanded = !this.getExpanded();

    if (panelGroup && panelGroup.onToggle) {
      panelGroup.onToggle(this.props.eventKey, expanded, e);
    } else {
      this.props.onToggle(expanded, e);
    }
  };

  render() {
    let { className, children } = this.props;
    const [bsProps, props] = splitBsPropsAndOmit(this.props, [
      'onToggle',
      'eventKey',
      'expanded'
    ]);

    return (
      <div {...props} className={classNames(className, getClassSet(bsProps))}>
        {children}
      </div>
    );
  }
}

Panel.propTypes = propTypes;

Panel.contextTypes = contextTypes;
Panel.childContextTypes = childContextTypes;

const UncontrolledPanel = uncontrollable(
  bsClass(
    'panel',
    bsStyles(
      [...Object.values(State), Style.DEFAULT, Style.PRIMARY],
      Style.DEFAULT,
      Panel
    )
  ),
  { expanded: 'onToggle' }
);

Object.assign(UncontrolledPanel, {
  Heading,
  Title,
  Body,
  Footer,
  Toggle,
  Collapse
});

export default UncontrolledPanel;
