import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface CardImgProps
  extends BsPrefixProps,
    React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: 'top' | 'bottom' | string;
}

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
  variant: PropTypes.oneOf(['top', 'bottom']),

  as: PropTypes.elementType,
};

const CardImg: BsPrefixRefForwardingComponent<'img', CardImgProps> =
  React.forwardRef(
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

export default CardImg;
