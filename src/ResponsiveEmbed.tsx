import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps } from './helpers';

export type AspectRadio = '21by9' | '16by9' | '4by3' | '1by1';

export interface ResponsiveEmbedProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactChild;
  aspectRatio?: AspectRadio;
}

const propTypes = {
  /**
   * @default 'embed-responsive'
   */
  bsPrefix: PropTypes.string,

  /**
   * This component requires a single child element
   */
  children: PropTypes.element.isRequired,

  /**
   * Set the aspect ration of the embed
   */
  aspectRatio: PropTypes.oneOf<AspectRadio>(['21by9', '16by9', '4by3', '1by1']),
};

const defaultProps = {
  aspectRatio: '1by1' as const,
};

const ResponsiveEmbed = React.forwardRef<HTMLDivElement, ResponsiveEmbedProps>(
  ({ bsPrefix, className, children, aspectRatio, ...props }, ref) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'embed-responsive');
    const child = React.Children.only(children);
    return (
      <div
        ref={ref}
        {...props}
        className={classNames(
          decoratedBsPrefix,
          className,
          aspectRatio && `${decoratedBsPrefix}-${aspectRatio}`,
        )}
      >
        {React.cloneElement(child as any, {
          className: classNames(
            (child as any).props.className,
            `${decoratedBsPrefix}-item`,
          ),
        })}
      </div>
    );
  },
);

ResponsiveEmbed.propTypes = propTypes;
ResponsiveEmbed.defaultProps = defaultProps;

export default ResponsiveEmbed;
