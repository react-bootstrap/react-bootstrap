import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';

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

const CardImg = React.forwardRef(
  ({ bsPrefix, className, variant, as: Component = 'img', ...props }, ref) => {
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
CardImg.defaultProps = defaultProps;

export default CardImg;
