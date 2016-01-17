import React, { PropTypes } from 'react';
import uncontrollable from 'uncontrollable';

let idPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);


let TabContainer = React.createClass({

  propTypes: {
    /**
     * HTML id attribute, required if no `generateChildId` prop
     * is specified.
     */
    id(props, ...args) {
      let error = null;

      if (!props.generateChildId) {
        error = idPropType(props, ...args);

        if (!error && !props.id) {
          error = new Error('You must provide an either an `id` or a `generateChildId` prop to TabContainer');
        }
      }

      return error;
    },

    /**
     * A function that takes an eventKey and type and returns a
     * unique id for child tab NavItems and TabPanes. The function _must_ be a pure function,
     * meaning it should always return the _same_ id for the same set of inputs.
     *
     * The `type` argument will either be `"tab"` or `"pane"`.
     *
     * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
     */
    generateChildId: PropTypes.func,

    /**
     * A callback fired when a tab is selected.
     *
     * @controllable activeKey
     */
    onSelect: PropTypes.func,

    /**
     * The `eventKey` of the currently active tab.
     *
     * @controllable onSelect
     */
    activeKey: PropTypes.any
  },

  childContextTypes: {
    $bs_tabcontainer: React.PropTypes.shape({
      activeKey: PropTypes.any,
      onSelect: PropTypes.func,
      getId: PropTypes.func
    })
  },

  getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  getChildContext() {
    return {
      $bs_tabcontainer: {
        activeKey: this.props.activeKey,
        onSelect: this.props.onSelect,
        getId: this.props.generateChildId
          || ((key, type) => this.props.id ? `${this.props.id}-${type}-${key}` : null)
      },
    };
  },

  render() {
    let { children, ...props } = this.props;

    return React.cloneElement(React.Children.only(children), props);
  }
});

export default uncontrollable(TabContainer, { activeKey: 'onSelect' });
