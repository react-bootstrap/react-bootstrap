import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import mapContextToProps from 'react-context-toolbox/lib/mapContextToProps';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';

import { createBootstrapComponent } from './ThemeProvider';
import chain from './utils/createChainedFunction';
import DropdownContext from './DropdownContext';

class DropdownMenu extends React.Component {
  static propTypes = {
    /**
     * @default 'dropdown-menu'
     */
    bsPrefix: PropTypes.string,

    /** Controls the visibility of the Dropdown menu  */
    show: PropTypes.bool,

    /** Aligns the Dropdown menu to the right of it's container. */
    alignRight: PropTypes.bool,

    onClose: PropTypes.func,

    onSelect: PropTypes.func,

    /**
     * Which event when fired outside the component will cause it to be closed
     *
     * *Note: For custom dropdown components, you will have to pass the
     * `rootCloseEvent` to `<RootCloseWrapper>` in your custom dropdown menu
     * component ([similarly to how it is implemented in `<Dropdown.Menu>`](https://github.com/react-bootstrap/react-bootstrap/blob/v0.31.5/src/DropdownMenu.js#L115-L119)).*
     */
    rootCloseEvent: PropTypes.oneOf(['click', 'mousedown']),

    /**
     * Control the rendering of the DropdownMenu. All non-menu props
     * (listed here) are passed through to the `as` Component.
     *
     * If providing a custom, non DOM, component. the `show` and `alignRight` props
     * are also injected and should be handled appropriatedly.
     */
    as: elementType,

    /** @private */
    menuRef: PropTypes.any,
  };

  static defaultProps = {
    alignRight: false,
    as: 'div',
  };

  handleRootClose = event => {
    this.props.onClose(event, { source: 'rootClose' });
  };

  render() {
    const {
      show,
      bsPrefix,
      menuRef,
      alignRight,
      className,
      rootCloseEvent,
      as: Component,
      ...props
    } = this.props;

    const menuProps = {
      ...props,
      ref: menuRef,
      className: classNames(
        className,
        bsPrefix,
        show && 'show',
        alignRight && `${bsPrefix}-right`,
      ),
    };

    // For custom components provide additional, non-DOM, props;
    if (typeof Component !== 'string') {
      menuProps.show = show;
      menuProps.alignRight = alignRight;
    }

    return (
      <RootCloseWrapper
        disabled={!show}
        onRootClose={this.handleRootClose}
        event={rootCloseEvent}
      >
        <Component {...menuProps} />
      </RootCloseWrapper>
    );
  }
}

export default mapContextToProps(
  DropdownContext.Consumer,
  (
    { toggleId, show, alignRight, setMenuElement, onClose, popper: { styles } },
    props,
  ) => ({
    style: styles,
    menuRef: setMenuElement,
    'aria-labelledby': toggleId,
    show: show == null ? props.show : show,
    onClose: chain(props.onClose, onClose),
    alignRight: alignRight == null ? props.alignRight : alignRight,
  }),
  createBootstrapComponent(DropdownMenu, 'dropdown-menu'),
);
