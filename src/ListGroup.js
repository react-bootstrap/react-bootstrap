import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import { useUncontrolled } from 'uncontrollable';

import { useBootstrapPrefix } from './ThemeProvider';
import AbstractNav from './AbstractNav';
import ListGroupItem from './ListGroupItem';

const propTypes = {
  /**
   * @default 'list-group'
   */
  bsPrefix: PropTypes.string,

  /**
   * Adds a variant to the list-group
   *
   * @type {('flush')}
   */
  variant: PropTypes.oneOf(['flush', null]),

  /**
   * Changes the flow of the list group items from vertical to horizontal.
   * A value of `null` (the default) sets it to vertical for all breakpoints;
   * Just including the prop sets it for all breakpoints, while `{sm|md|lg|xl}`
   * makes the list group horizontal starting at that breakpoint’s `min-width`.
   * @type {(true|'sm'|'md'|'lg'|'xl')}
   */
  horizontal: PropTypes.oneOf([true, 'sm', 'md', 'lg', 'xl', null]),

  /**
   * You can use a custom element type for this component.
   */
  as: PropTypes.elementType,
};

const defaultProps = {
  variant: null,
  horizontal: null,
};

const ListGroup = React.forwardRef((props, ref) => {
  let {
    className,
    bsPrefix,
    variant,
    horizontal,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as = 'div',
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect',
  });

  bsPrefix = useBootstrapPrefix(bsPrefix, 'list-group');

  let horizontalVariant;
  if (horizontal) {
    horizontalVariant =
      horizontal === true ? 'horizontal' : `horizontal-${horizontal}`;
  } else {
    horizontalVariant = null;
  }

  warning(
    !(horizontal && variant === 'flush'),
    '`variant="flush"` and `horizontal` should not be used together.',
  );

  return (
    <AbstractNav
      ref={ref}
      {...controlledProps}
      as={as}
      className={classNames(
        className,
        bsPrefix,
        variant && `${bsPrefix}-${variant}`,
        horizontalVariant && `${bsPrefix}-${horizontalVariant}`,
      )}
    />
  );
});

ListGroup.propTypes = propTypes;
ListGroup.defaultProps = defaultProps;
ListGroup.displayName = 'ListGroup';

ListGroup.Item = ListGroupItem;

export default ListGroup;
