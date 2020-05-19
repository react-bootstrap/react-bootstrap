import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import createWithBsPrefix from './createWithBsPrefix';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

const MediaBody = createWithBsPrefix('media-body');
type MediaProps = BsPrefixProps;
type Media = BsPrefixRefForwardingComponent<'div', MediaProps> & {
  Body: typeof MediaBody;
};

const propTypes = {
  /**
   * @default 'media'
   */
  bsPrefix: PropTypes.string,

  as: PropTypes.elementType,
};

const Media: Media = (React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  (
    { bsPrefix, className, as: Component = 'div', ...props }: MediaProps,
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'media');

    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(className, prefix)}
      />
    );
  },
) as unknown) as Media;

Media.displayName = 'Media';
Media.propTypes = propTypes;
Media.Body = MediaBody;

export default Media;
