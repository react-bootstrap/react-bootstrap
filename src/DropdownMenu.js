import classNames from 'classnames';
import keycode from 'keycode';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';

import { bsClass, getClassSet, prefix, splitBsPropsAndOmit }
  from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';
import ValidComponentChildren from './utils/ValidComponentChildren';

const propTypes = {
  open: PropTypes.bool,
  pullRight: PropTypes.bool,
  onClose: PropTypes.func,
  labelledBy: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  onSelect: PropTypes.func,
  rootCloseEvent: PropTypes.oneOf(['click', 'mousedown']),
};

const defaultProps = {
  bsRole: 'menu',
  pullRight: false,
};

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleRootClose = this.handleRootClose.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleRootClose(event) {
    this.props.onClose(event, { source: 'rootClose' });
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case keycode.codes.down:
        this.focusNext();
        event.preventDefault();
        break;
      case keycode.codes.up:
        this.focusPrevious();
        event.preventDefault();
        break;
      case keycode.codes.esc:
      case keycode.codes.tab:
        this.props.onClose(event, { source: 'keydown' });
        break;
      default:
    }
  }

  getItemsAndActiveIndex() {
    const items = this.getFocusableMenuItems();
    const activeIndex = items.indexOf(document.activeElement);

    return { items, activeIndex };
  }

  getFocusableMenuItems() {
    const node = ReactDOM.findDOMNode(this);
    if (!node) {
      return [];
    }

    return Array.from(node.querySelectorAll('[tabIndex="-1"]'));
  }

  focusNext() {
    const { items, activeIndex } = this.getItemsAndActiveIndex();
    if (items.length === 0) {
      return;
    }

    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    items[nextIndex].focus();
  }

  focusPrevious() {
    const { items, activeIndex } = this.getItemsAndActiveIndex();
    if (items.length === 0) {
      return;
    }

    const prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    items[prevIndex].focus();
  }

  render() {
    const {
      open,
      pullRight,
      labelledBy,
      onSelect,
      className,
      rootCloseEvent,
      children,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsPropsAndOmit(props, ['onClose']);

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, 'right')]: pullRight,
    };

    return (
      <RootCloseWrapper
        disabled={!open}
        onRootClose={this.handleRootClose}
        event={rootCloseEvent}
      >
        <ul
          {...elementProps}
          role="menu"
          className={classNames(className, classes)}
          aria-labelledby={labelledBy}
        >
          {ValidComponentChildren.map(children, child => (
            React.cloneElement(child, {
              onKeyDown: createChainedFunction(
                child.props.onKeyDown, this.handleKeyDown,
              ),
              onSelect: createChainedFunction(
                child.props.onSelect, onSelect,
              ),
            })
          ))}
        </ul>
      </RootCloseWrapper>
    );
  }
}

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default bsClass('dropdown-menu', DropdownMenu);
