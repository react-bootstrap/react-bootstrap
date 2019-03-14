import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import createWithBsPrefix from './utils/createWithBsPrefix';
import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'media'
   */
  bsPrefix: PropTypes.string,

  as: PropTypes.elementType,
};

const defaultProps = {
  as: 'div',
};

const Media = React.forwardRef(
  ({ bsPrefix, className, as: Component, ...props }, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'media');
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(className, prefix)}
      />
    );
  },
);

Media.displayName = 'Media';
Media.propTypes = propTypes;
Media.defaultProps = defaultProps;

Media.Body = createWithBsPrefix('media-body');

export default Media;
