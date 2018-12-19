import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import mapContextToProps from 'react-context-toolbox/mapContextToProps';
import { elementType } from 'prop-types-extra';
import BaseDropdown from 'react-overlays/Dropdown';

import chain from './utils/createChainedFunction';
import { createBootstrapComponent } from './ThemeProvider';
import DropdownMenu from './DropdownMenu';
import DropdownToggle from './DropdownToggle';
import DropdownItem from './DropdownItem';
import SelectableContext from './SelectableContext';
import createWithBsPrefix from './utils/createWithBsPrefix';

const propTypes = {
  /** @default 'dropdown' */
  bsPrefix: PropTypes.string,
  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   */
  drop: PropTypes.oneOf(['up', 'left', 'right', 'down']),

  as: elementType,

  /**
   * Align the menu to the right side of the Dropdown toggle
   */
  alignRight: PropTypes.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  show: PropTypes.bool,

  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled).
   *
   */
  flip: PropTypes.bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(
   *   isOpen: boolean,
   *   event: SyntheticEvent,
   *   metadata: {
   *     source: 'select' | 'click' | 'rootClose' | 'keydown'
   *   }
   * ): void
   * ```
   *
   * @controllable show
   */
  onToggle: PropTypes.func,

  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: PropTypes.func,

  /** @private */
  navbar: PropTypes.bool,
};

const defaultProps = {
  as: 'div',
  navbar: false,
};

class Dropdown extends React.Component {
  handleSelect = (key, event) => {
    if (this.props.onSelect) this.props.onSelect(key, event);

    this.handleToggle(false, event, 'select');
  };

  handleToggle = (show, event, source = event.type) => {
    if (event.currentTarget === document) source = 'rootClose';

    this.props.onToggle(show, event, { source });
  };

  render() {
    const {
      bsPrefix,
      drop,
      show,
      className,
      as: Component,
      alignRight,
      onSelect: _1,
      onToggle: _3,
      navbar: _4,
      ...props
    } = this.props;

    delete props.onToggle;

    return (
      <SelectableContext.Provider value={this.handleSelect}>
        <BaseDropdown.ControlledComponent
          drop={drop}
          show={show}
          alignEnd={alignRight}
          onToggle={this.handleToggle}
          itemSelector={`.${bsPrefix}-item:not(.disabled):not(:disabled)`}
        >
          {({ props: dropdownProps }) => (
            <Component
              {...props}
              {...dropdownProps}
              className={classNames(
                className,
                show && 'show',
                (!drop || drop === 'down') && bsPrefix,
                drop === 'up' && 'dropup',
                drop === 'right' && 'dropright',
                drop === 'left' && 'dropleft',
              )}
            />
          )}
        </BaseDropdown.ControlledComponent>
      </SelectableContext.Provider>
    );
  }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

const UncontrolledDropdown = createBootstrapComponent(
  BaseDropdown.deferControlTo(Dropdown),
  'dropdown',
);

const DecoratedDropdown = mapContextToProps(
  SelectableContext,
  (onSelect, props) => ({
    onSelect: chain(props.onSelect, onSelect),
  }),
  UncontrolledDropdown,
);

DecoratedDropdown.Toggle = DropdownToggle;
DecoratedDropdown.Menu = DropdownMenu;
DecoratedDropdown.Item = DropdownItem;

DecoratedDropdown.Header = createWithBsPrefix('dropdown-header', {
  defaultProps: { role: 'heading' },
});
DecoratedDropdown.Divider = createWithBsPrefix('dropdown-divider', {
  defaultProps: { role: 'separator' },
});

export default DecoratedDropdown;
