import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import classNames from 'classnames';

import bootstrapUtils, { bsClass } from './utils/bootstrapUtils';
import ValidComponentChildren from './utils/ValidComponentChildren';

class PanelGroup extends React.Component {
  static propTypes = {
    accordion: PropTypes.bool,
    activeKey: PropTypes.any,
    className: PropTypes.string,
    children: PropTypes.node,
    defaultActiveKey: PropTypes.any,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    accordion: false
  };

  constructor(props) {
    super(props);
    let defaultActiveKey = props.defaultActiveKey;

    this.state = {
      activeKey: defaultActiveKey
    };
  }

  render() {
    let classes = bootstrapUtils.getClassSet(this.props);
    let {className, ...props} = this.props;
    if (this.props.accordion) { props.role = 'tablist'; }
    return (
      <div {...props} className={classNames(className, classes)} onSelect={null}>
        {ValidComponentChildren.map(props.children, this.renderPanel)}
      </div>
    );
  }

  renderPanel = (child, index) => {
    let activeKey =
      this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

    let props = {
      bsStyle: child.props.bsStyle || this.props.bsStyle,
      key: child.key ? child.key : index,
      ref: child.ref
    };

    if (this.props.accordion) {
      props.headerRole = 'tab';
      props.panelRole = 'tabpanel';
      props.collapsible = true;
      props.expanded = (child.props.eventKey === activeKey);
      props.onSelect = this.handleSelect;
    }

    return cloneElement(
      child,
      props
    );
  };

  shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  }

  handleSelect = (e, key) => {
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
  };
}

export default bsClass('panel-group', PanelGroup);
