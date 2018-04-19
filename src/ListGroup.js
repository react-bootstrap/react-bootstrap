import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';
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
    as: 'ul',
    variant: null,
  };

  render() {
    const {
      className,
      bsPrefix,
      variant,
      as: Component,
      ...props
    } = this.props;

    const classes = classNames(className, bsPrefix, `${bsPrefix}-${variant}`);

    return <Component {...props} className={classes} />;
  }
}

const DecoratedListGroup = createBootstrapComponent(ListGroup, 'list-group');
DecoratedListGroup.Item = ListGroupItem;

export default DecoratedListGroup;
