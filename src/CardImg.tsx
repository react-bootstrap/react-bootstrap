import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface CardImgProps extends BsPrefixProps {
  variant?: 'top' | 'bottom' | null;
}

type CardImg = BsPrefixRefForwardingComponent<'img', CardImgProps>;

const propTypes = {
  /**
   * @default 'card-img'
   */
  bsPrefix: PropTypes.string,

  /**
   * Defines image position inside
   * the card.
   *
   * @type {('top'|'bottom')}
   */
  variant: PropTypes.oneOf(['top', 'bottom', null]),

  as: PropTypes.elementType,
};

const defaultProps = {
  variant: null,
};

const CardImg: CardImg = React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  (
    {
      bsPrefix,
      className,
      variant,
      as: Component = 'img',
      ...props
    }: CardImgProps,
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'card-img');
    const classNames = useClassNameMapper();

    return (
      <Component
        ref={ref}
        className={classNames(
          variant ? `${prefix}-${variant}` : prefix,
          className,
        )}
        {...props}
      />
    );
  },
);
CardImg.displayName = 'CardImg';
CardImg.propTypes = propTypes;
CardImg.defaultProps = defaultProps;

export default CardImg;
