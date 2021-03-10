import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps } from './helpers';

export type AspectRatio = '1x1' | '4x3' | '16x9' | '21x9';

export interface RatioProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactChild;
  aspectRatio?: AspectRatio;
}

const propTypes = {
  /**
   * @default 'ratio'
   */
  bsPrefix: PropTypes.string,

  /**
   * This component requires a single child element
   */
  children: PropTypes.element.isRequired,

  /**
   * Set the aspect ration of the embed
   */
  aspectRatio: PropTypes.oneOf<AspectRatio>(['1x1', '4x3', '16x9', '21x9']),
};

const defaultProps = {
  aspectRatio: '1x1' as const,
};

const Ratio = React.forwardRef<HTMLDivElement, RatioProps>(
  ({ bsPrefix, className, children, aspectRatio, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'ratio');
    return (
      <div
        ref={ref}
        {...props}
        className={classNames(
          bsPrefix,
          className,
          aspectRatio && `${bsPrefix}-${aspectRatio}`,
        )}
      >
        {React.Children.only(children)}
      </div>
    );
  },
);

Ratio.propTypes = propTypes;
Ratio.defaultProps = defaultProps;

export default Ratio;
