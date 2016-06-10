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
          error = new Error(
            'In order to properly initialize Tabs in a way that is accessible to assistive technologies ' +
            '(such as screen readers) an `id` or a `generateChildId` prop to TabContainer is required');
        }
      }
      return error;
    },

    /**
     * A function that takes an eventKey and type and returns a
     * unique id for child tab NavItems and TabPanes. The function _must_ be a pure function,
     * meaning it should always return the _same_ id for the same set of inputs. The default
     * value requires that an `id` to be set for the TabContainer.
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

  getChildContext() {
    const { activeKey, generateChildId, id } = this.props;

    return {
      $bs_tabcontainer: {
        activeKey,
        onSelect: this.handleSelect,
        getId:
          generateChildId ||
          ((key, type) => (id ? `${id}-${type}-${key}` : null))
      },
    };
  },

  componentWillUnmount() {
    // isMounted() isn't `true` at this point;
    this.unmounting = true;
  },

  handleSelect(key) {
    if (!this.unmounting) {
      this.props.onSelect(key);
    }
  },

  render() {
    const { children, ...props } = this.props;
    delete props.generateChildId;
    delete props.onSelect;
    delete props.activeKey;

    return React.cloneElement(React.Children.only(children), props);
  }
});

export default uncontrollable(TabContainer, { activeKey: 'onSelect' });
