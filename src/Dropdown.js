import classNames from 'classnames';
import matches from 'dom-helpers/query/matches';
import qsa from 'dom-helpers/query/querySelectorAll';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import mapContextToProps from 'react-context-toolbox/lib/mapContextToProps';
import elementType from 'prop-types-extra/lib/elementType';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import uncontrollable from 'uncontrollable';

import createPopper from './utils/createPopper';
import chain from './utils/createChainedFunction';
import { createBootstrapComponent } from './ThemeProvider';
import DropdownContext from './DropdownContext';
import DropdownMenu from './DropdownMenu';
import DropdownToggle from './DropdownToggle';
import DropdownItem from './DropdownItem';

import SelectableContext from './SelectableContext';
import NavbarContext from './NavbarContext';

const propTypes = {
  /** @default 'dropdown' */
  bsPrefix: PropTypes.string,
  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   */
  drop: PropTypes.oneOf(['up', 'left', 'right', 'down']),

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),

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
   *     source: 'select' | 'click' | 'rootCloose' | 'keydown'
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

/**
 * A convenience component for simple or general use dropdowns. Renders a `Button` toggle and all `children`
 * are passed directly to the default `Dropdown.Menu`.
 *
 * **All unknown props are passed through to the `Dropdown` component. Only
 * the button `variant`, `size` and `bsPrefix` props are passed to the toggle,
 * along with menu related props are passed to the `Dropdown.Menu`**
 */
class Dropdown extends React.Component {
  static getDerivedStateFromProps(
    { drop, alignRight, show, id: toggleId },
    prevState,
  ) {
    let placement = alignRight ? 'bottom-end' : 'bottom-start';
    if (drop === 'up') placement = alignRight ? 'top-end' : 'top-start';
    if (drop === 'right') placement = 'right-start';
    if (drop === 'left') placement = 'left-start';

    return {
      placement,
      lastShow: prevState.dropdownContext.show,
      dropdownContext: {
        ...prevState.dropdownContext,
        toggleId,
        alignRight,
        show,
      },
    };
  }

  constructor(props, context) {
    super(props, context);

    this._focusInDropdown = false;
    this.lastOpenEventType = null;
    this.popper = createPopper(this.handleUpdate);

    this.state = {
      dropdownContext: {
        popper: {},
        onToggle: this.handleClick,
        onClose: this.handleClose,
        setToggleElement: el => {
          this.toggle = ReactDOM.findDOMNode(el);
          if (this.toggle)
            this.setState(({ dropdownContext }) => ({
              dropdownContext: {
                ...dropdownContext,
                toggleId: this.toggle.id,
              },
            }));
          if (this.props.show) this.updatePosition();
        },
        setMenuElement: el => {
          this.menu = ReactDOM.findDOMNode(el);
          if (this.props.show) this.updatePosition();
        },
      },
    };
  }

  componentDidMount() {
    if (this.props.show) this.updatePosition();
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props;
    const prevOpen = prevProps.show;

    if (show && !prevOpen) {
      this.updatePosition();
      this.maybeFocusFirst();
    }
    if (!show && prevOpen) {
      // if focus hasn't already moved from the menu let's return it
      // to the toggle
      if (this._focusInDropdown) {
        this._focusInDropdown = false;
        this.focus();
      }
    }
  }

  componentWillUnmount() {
    if (this.popper) this.popper.destroy();
  }

  getNextFocusedChild(current, offset) {
    if (!this.menu) return null;

    const { bsPrefix } = this.props;
    let items = qsa(
      this.menu,
      `.${bsPrefix}-item:not(.disabled):not(:disabled)`, // same as upstream
    );

    let index = items.indexOf(current) + offset;
    index = Math.max(0, Math.min(index, items.length));

    return items[index];
  }

  hasMenuRole() {
    return this.menu && matches(this.menu, '[role=menu]');
  }

  focus() {
    if (this.toggle && this.toggle.focus) {
      this.toggle.focus();
    }
  }

  maybeFocusFirst() {
    if (!this.hasMenuRole()) return;

    const { bsPrefix } = this.props;
    let first = this.menu.querySelector(`.${bsPrefix}-item:not(.disabled)`);
    if (first && first.focus) first.focus();
  }

  handleSelect = (key, event) => {
    if (this.props.onSelect) this.props.onSelect(key, event);

    this.handleClose(event, { source: 'select' });
  };

  handleClick = event => {
    this.toggleOpen(event, { source: 'click' });
  };

  handleClose = (event, eventDetails) => {
    if (!this.props.show) return;
    this.toggleOpen(event, eventDetails);
  };

  handleKeyDown = event => {
    const { key, target } = event;
    const isInput = /input|textarea/i.test(target.tagName);
    // Second only to https://github.com/twbs/bootstrap/blob/8cfbf6933b8a0146ac3fbc369f19e520bd1ebdac/js/src/dropdown.js#L400
    // in inscrutability
    if (
      isInput &&
      (key === ' ' || (key !== 'Escape' && this.menu.contains(target)))
    ) {
      return;
    }

    switch (key) {
      case 'ArrowUp': {
        let next = this.getNextFocusedChild(target, -1);
        if (next && next.focus) next.focus();
        event.preventDefault();

        return;
      }
      case 'ArrowDown':
        event.preventDefault();
        if (!this.props.show) {
          this.toggleOpen(event, { source: 'keydown' });
        } else {
          let next = this.getNextFocusedChild(target, 1);
          if (next && next.focus) next.focus();
        }
        return;
      case 'Escape':
      case 'Tab':
        this.handleClose(event, { source: 'keydown' });
        break;
      default:
    }
  };

  handleUpdate = popper => {
    this.setState({ popper });
  };

  updatePosition() {
    if (!this.toggle || !this.menu || this.props.navbar) return;

    this.popper.update({
      element: this.menu,
      target: this.toggle,
      placement: this.state.placement,
      modifiers: {
        flip: { enabled: !!this.props.flip },
      },
    });
  }

  toggleOpen(event, eventDetails) {
    let show = !this.props.show;

    if (show) {
      this.lastOpenEventType = eventDetails.source;
    }

    this.props.onToggle(show, event, eventDetails);
  }

  render() {
    const {
      bsPrefix,
      drop,
      show,
      className,
      as: Component,
      alignRight: _0,
      onSelect: _1,
      id: _2,
      onToggle: _3,
      navbar: _4,
      ...props
    } = this.props;

    delete props.onToggle;

    if (this.state.lastShow && !this.props.show) {
      this._focusInDropdown = this.menu.contains(document.activeElement);
    }
    // TODO Remove this when next release comes out
    const { dropdownContext, popper = {} } = this.state;
    dropdownContext.popper = popper;

    return (
      <DropdownContext.Provider value={dropdownContext}>
        <SelectableContext.Provider value={this.handleSelect}>
          <Component
            {...props}
            onKeyDown={this.handleKeyDown}
            className={classNames(
              className,
              show && 'show',
              (!drop || drop === 'down') && bsPrefix,
              drop === 'up' && 'dropup',
              drop === 'right' && 'dropright',
              drop === 'left' && 'dropleft',
            )}
          />
        </SelectableContext.Provider>
      </DropdownContext.Provider>
    );
  }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

const UncontrolledDropdown = uncontrollable(
  createBootstrapComponent(Dropdown, 'dropdown'),
  { show: 'onToggle' },
);

const DecoratedDropdown = mapContextToProps(
  [SelectableContext, NavbarContext],
  (onSelect, navbarContext, props) => ({
    navbar: !!navbarContext,
    onSelect: chain(props.onSelect, onSelect),
  }),
  UncontrolledDropdown,
);

DecoratedDropdown.Toggle = DropdownToggle;
DecoratedDropdown.Menu = DropdownMenu;
DecoratedDropdown.Item = DropdownItem;

export default DecoratedDropdown;
