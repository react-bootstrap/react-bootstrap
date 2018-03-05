import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';

import { createBootstrapComponent } from './ThemeProvider';
import mapContextToProps from './utils/mapContextToProps';
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

    componentClass: elementType,

    /** @private */
    menuRef: PropTypes.any
  };

  static defaultProps = {
    alignRight: false,
    componentClass: 'div'
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
      componentClass: Component,
      ...props
    } = this.props;

    const menuProps = {
      ...props,
      ref: menuRef,
      className: classNames(
        className,
        bsPrefix,
        show && 'show',
        alignRight && `${bsPrefix}-right`
      )
    };
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
  createBootstrapComponent(DropdownMenu, 'dropdown-menu'),
  DropdownContext.Consumer,
  (
    { toggleId, show, alignRight, setMenuElement, onClose, popper: { styles } },
    props
  ) => ({
    onClose,
    style: styles,
    menuRef: setMenuElement,
    'aria-labelledby': toggleId,
    show: show == null ? props.show : show,
    alignRight: alignRight == null ? props.alignRight : alignRight
  })
);
