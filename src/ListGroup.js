import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import uncontrollable from 'uncontrollable';

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
    as: elementType,
  };

  static defaultProps = {
    as: 'div',
    variant: null,
  };

  render() {
    const { className, bsPrefix, variant, ...props } = this.props;

    return (
      <AbstractNav
        {...props}
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
