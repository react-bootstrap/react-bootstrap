import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

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
   * You can use a custom element type for this component.
   */
  as: PropTypes.elementType,
};

const defaultProps = {
  variant: null,
};

const ListGroup = React.forwardRef((props, ref) => {
  let {
    className,
    bsPrefix,
    variant,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as = 'div',
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect',
  });

  bsPrefix = useBootstrapPrefix(bsPrefix, 'list-group');

  return (
    <AbstractNav
      ref={ref}
      {...controlledProps}
      as={as}
      className={classNames(
        className,
        bsPrefix,
        variant && `${bsPrefix}-${variant}`,
      )}
    />
  );
});

ListGroup.propTypes = propTypes;
ListGroup.defaultProps = defaultProps;
ListGroup.displayName = 'ListGroup';

ListGroup.Item = ListGroupItem;

export default ListGroup;
