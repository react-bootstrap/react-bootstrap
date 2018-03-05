import classNames from 'classnames';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import React from 'react';

import Button from './Button';
import { createBootstrapComponent } from './ThemeProvider';
import DropdownContext from './DropdownContext';

class DropdownToggle extends React.Component {
  static propTypes = {
    /**
     * @default 'dropdown-toggle'
     */
    bsPrefix: PropTypes.string,
    title: PropTypes.string,

    split: PropTypes.bool,
    componentClass: elementType,

    /**
     * to passthrough to the underlying button or whatever from DropdownButton
     * @private
     */
    childBsPrefix: PropTypes.string
  };

  static defaultProps = {
    componentClass: Button
  };

  render() {
    const {
      bsPrefix,
      split,
      className,
      children,
      childBsPrefix,
      componentClass: Component,
      ...props
    } = this.props;

    // This intentionally forwards bsSize and bsStyle (if set) to the
    // underlying component, to allow it to render size and style variants.
    return (
      <DropdownContext.Consumer>
        {({ toggleId, setToggleElement, onToggle }) => (
          <Component
            aria-haspopup
            id={toggleId}
            bsPrefix={childBsPrefix}
            onClick={onToggle}
            ref={setToggleElement}
            className={classNames(
              className,
              bsPrefix,
              split && `${bsPrefix}-split`
            )}
            {...props}
          >
            {children}
          </Component>
        )}
      </DropdownContext.Consumer>
    );
  }
}

export default createBootstrapComponent(DropdownToggle, 'dropdown-toggle');
