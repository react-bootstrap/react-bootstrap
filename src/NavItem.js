import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { bsClass, prefix, splitBsProps } from './utils/bootstrapUtils';

class NavItem extends React.Component {
  static propTypes = {
    /**
     * The active state of the NavItem item. **The is _passed through_ to
     * the `NavItem`'s child, assuming it's a `NavLink`.**
     */
    active: PropTypes.bool,
    /**
     * The disabled state of the NavItem item. **The is _passed through_ to
     * the `NavItem`'s child, assuming it's a `NavLink`**
     */
    disabled: PropTypes.bool,

    /** The ARIA role of the component */
    role: PropTypes.string,

    /**
     * A callback fired when the NavItem is selected. **The is _passed through_ to
     * the `NavItem`'s child, assuming it's a `NavLink`**
     *
     * ```
     * (eventKey?: any) => void
     * ```
     */
    onSelect: PropTypes.func,

    /**
     * Uniquely idenifies the `NavItem` amoungst its siblings,
     * used to determine and control the active state ofthe parent `Nav`
     */
    eventKey: PropTypes.any,

    componentClass: elementType
  };

  static defaultProps = {
    active: false,
    disabled: false,
    role: 'presentaton',
    componentClass: 'li'
  };

  render() {
    const {
      active,
      disabled,
      className,
      children,
      onSelect,
      componentClass: Component,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    delete elementProps.eventKey;
    console.log(Component);
    return (
      <Component
        {...elementProps}
        className={classNames(className, prefix(bsProps, 'item'))}
      >
        {/* {React.cloneElement(children, {
          active,
          disabled,
          onSelect
        })} */}
      </Component>
    );
  }
}

export default bsClass('nav', NavItem);
