import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import { bsClass, getClassSet, splitBsPropsAndOmit }
  from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';
import ValidComponentChildren from './utils/ValidComponentChildren';

const propTypes = {
  accordion: PropTypes.bool,
  activeKey: PropTypes.any,
  defaultActiveKey: PropTypes.any,
  onSelect: PropTypes.func,
  role: PropTypes.string,
};

const defaultProps = {
  accordion: false,
};

// TODO: Use uncontrollable.

class PanelGroup extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: props.defaultActiveKey,
    };
  }

  handleSelect(key, e) {
    e.preventDefault();

    if (this.props.onSelect) {
      this.props.onSelect(key, e);
    }

    if (this.state.activeKey === key) {
      key = null;
    }

    this.setState({ activeKey: key });
  }

  render() {
    const {
      accordion,
      activeKey: propsActiveKey,
      className,
      children,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsPropsAndOmit(props, [
      'defaultActiveKey', 'onSelect',
    ]);

    let activeKey;
    if (accordion) {
      activeKey = propsActiveKey != null ?
        propsActiveKey : this.state.activeKey;
      elementProps.role = elementProps.role || 'tablist';
    }

    const classes = getClassSet(bsProps);

    return (
      <div
        {...elementProps}
        className={classNames(className, classes)}
      >
        {ValidComponentChildren.map(children, child => {
          const childProps = {
            bsStyle: child.props.bsStyle || bsProps.bsStyle,
          };

          if (accordion) {
            Object.assign(childProps, {
              headerRole: 'tab',
              panelRole: 'tabpanel',
              collapsible: true,
              expanded: child.props.eventKey === activeKey,
              onSelect: createChainedFunction(
                this.handleSelect, child.props.onSelect
              )
            });
          }

          return cloneElement(child, childProps);
        })}
      </div>
    );
  }
}

PanelGroup.propTypes = propTypes;
PanelGroup.defaultProps = defaultProps;

export default bsClass('panel-group', PanelGroup);
