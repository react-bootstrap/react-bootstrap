import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface ResponsiveEmbedProps extends BsPrefixPropsWithChildren {
  children: React.ReactChild;
  aspectRatio?: '21by9' | '16by9' | '4by3' | '1by1';
}

type ResponsiveEmbed = BsPrefixRefForwardingComponent<
  'div',
  ResponsiveEmbedProps
>;

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
  aspectRatio: PropTypes.oneOf(['21by9', '16by9', '4by3', '1by1']),
};

const ResponsiveEmbed: ResponsiveEmbed = React.forwardRef<
  HTMLDivElement,
  ResponsiveEmbedProps
>(
  (
    {
      bsPrefix,
      className,
      children,
      aspectRatio = '1by1',
      ...props
    }: ResponsiveEmbedProps,
    ref,
  ) => {
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

export default ResponsiveEmbed;
