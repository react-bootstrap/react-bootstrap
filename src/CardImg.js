import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { createBootstrapComponent } from './ThemeProvider';

class CardImg extends React.Component {
  static propTypes = {
    /**
     * @default 'card-img'
     */
    bsPrefix: PropTypes.string.isRequired,

    /**
     * Defines image position inside
     * the card.
     *
     * @type {('top'|'bottom')}
     */
    variant: PropTypes.oneOf(['top', 'bottom', null]),

    as: PropTypes.elementType,
  };

  static defaultProps = {
    as: 'img',
    variant: null,
  };

  render() {
    const {
      bsPrefix,
      className,
      variant,
      as: Component,
      ...props
    } = this.props;

    const baseClass = variant ? `${bsPrefix}-${variant}` : bsPrefix;
    return (
      <Component className={classNames(baseClass, className)} {...props} />
    );
  }
}

export default createBootstrapComponent(CardImg, 'card-img');
