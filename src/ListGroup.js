import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { uncontrollable } from 'uncontrollable';

import { createBootstrapComponent } from './ThemeProvider';
import AbstractNav from './AbstractNav';
import ListGroupItem from './ListGroupItem';

class ListGroup extends React.Component {
  static propTypes = {
    /**
     * @default 'list-group'
     */
    bsPrefix: PropTypes.string.isRequired,

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

  static defaultProps = {
    variant: null,
  };

  render() {
    const { className, bsPrefix, variant, as = 'div', ...props } = this.props;

    return (
      <AbstractNav
        {...props}
        as={as}
        className={classNames(
          className,
          bsPrefix,
          variant && `${bsPrefix}-${variant}`,
        )}
      />
    );
  }
}

const DecoratedListGroup = uncontrollable(
  createBootstrapComponent(ListGroup, 'list-group'),
  {
    activeKey: 'onSelect',
  },
);
DecoratedListGroup.Item = ListGroupItem;

export default DecoratedListGroup;
