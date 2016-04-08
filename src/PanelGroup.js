import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import uncontrollable from 'uncontrollable';


import { bsClass, getClassSet, splitBsPropsAndOmit }
  from './utils/bootstrapUtils';
import ValidComponentChildren from './utils/ValidComponentChildren';

const idPropType = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.number
]);

const propTypes = {
  accordion: React.PropTypes.bool,
  activeKey: React.PropTypes.any,
  onSelect: React.PropTypes.func,
  role: React.PropTypes.string,

  /**
   * A function that takes an eventKey and type and returns a
   * unique id for each Panel heading and Panel Collapse. The function _must_ be a pure function,
   * meaning it should always return the _same_ id for the same set of inputs. The default
   * value requires that an `id` to be set for the PanelGroup.
   *
   * The `type` argument will either be `"tab"` or `"pane"`.
   *
   * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
   */
  generateChildId: PropTypes.func,

  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   */
  id(props, ...args) {
    let error = null;

    if (!props.generateChildId) {
      error = idPropType(props, ...args);

      if (!error && !props.id) {
        error = new Error(
          'In order to properly initialize the PanelGroup in a way that is accessible to assistive technologies ' +
          '(such as screen readers) an `id` or a `generateChildId` prop to PanelGroup is required');
      }
    }
    return error;
  },
};

const defaultProps = {
  accordion: false,
};

const childContextTypes = {
  $bs_panelGroup: React.PropTypes.shape({
    getId: React.PropTypes.func
  })
};

class PanelGroup extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
  }

  getChildContext() {
    const { accordion, generateChildId, id } = this.props;
    let getId = null;

    if (accordion) {
      getId = generateChildId
        || ((key, type) => id ? `${id}-${type}-${key}` : null);
    }

    return {
      $bs_panelGroup: { getId },
    };
  }

  handleSelect(key, expanded, e) {
    if (expanded) {
      this.props.onSelect(key, e);
    }
  }

  render() {
    const {
      accordion,
      activeKey: propsActiveKey,
      className,
      children,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsPropsAndOmit(props, ['onSelect']);

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
        {ValidComponentChildren.map(children, (child, index) => {
          const childProps = {
            bsStyle: child.props.bsStyle || bsProps.bsStyle,
            key: child.key ? child.key : index,
          };

          if (accordion) {
            Object.assign(childProps, {
              headerRole: 'tab',
              panelRole: 'tabpanel',
              collapsible: true,
              expanded: (child.props.eventKey === activeKey),
              onToggle: this.handleSelect.bind(null, child.props.eventKey),
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
PanelGroup.childContextTypes = childContextTypes;

export default uncontrollable(
  bsClass('panel-group', PanelGroup),
  {
    activeKey: 'onSelect'
  }
);
