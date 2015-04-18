/* eslint react/prop-types: [1, {ignore: ["children", "className", "bsStyle"]}]*/
/* BootstrapMixin contains `bsStyle` type validation */
import React, { cloneElement } from 'react';
import classNames from 'classnames';

import BootstrapMixin from './BootstrapMixin';
import ValidComponentChildren from './utils/ValidComponentChildren';

const PanelGroup = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    collapsable: React.PropTypes.bool,
    accordion: React.PropTypes.bool,
    activeKey: React.PropTypes.any,
    defaultActiveKey: React.PropTypes.any,
    onSelect: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      bsClass: 'panel-group'
    };
  },

  getInitialState() {
    let defaultActiveKey = this.props.defaultActiveKey;

    return {
      activeKey: defaultActiveKey
    };
  },

  render() {
    let classes = this.getBsClassSet();
    return (
      <div {...this.props} className={classNames(this.props.className, classes)} onSelect={null}>
        {ValidComponentChildren.map(this.props.children, this.renderPanel)}
      </div>
    );
  },

  renderPanel(child, index) {
    let activeKey =
      this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

    let props = {
      bsStyle: child.props.bsStyle || this.props.bsStyle,
      key: child.key ? child.key : index,
      ref: child.ref
    };

    if (this.props.accordion) {
      props.collapsable = true;
      props.expanded = (child.props.eventKey === activeKey);
      props.onSelect = this.handleSelect;
    }

    return cloneElement(
      child,
      props
    );
  },

  shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect(e, key) {
    e.preventDefault();

    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(key);
      this._isChanging = false;
    }

    if (this.state.activeKey === key) {
      key = null;
    }

    this.setState({
      activeKey: key
    });
  }
});

export default PanelGroup;
