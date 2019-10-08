import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';

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

const defaultProps = {
  aspectRatio: '1by1',
};

const ResponsiveEmbed = React.forwardRef(
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
        {React.cloneElement(child, {
          className: classNames(
            child.props.className,
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
