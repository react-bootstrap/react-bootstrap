import classNames from 'classnames';
import PropTypes from 'prop-types';

import React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /** @default 'form-text' */
  bsPrefix: PropTypes.string,

  /**
   * The FormText `ref` will be forwarded to the underlying element.
   * Unless the FormText is rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,

  /**
   * A convenience prop for add the `text-muted` class,
   * since it's so commonly used here.
   */
  muted: PropTypes.bool,
  as: PropTypes.elementType,
};

const defaultProps = {
  as: 'small',
};

const FormText = React.forwardRef(
  ({ bsPrefix, className, as: Component, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-text');
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(className, bsPrefix)}
      />
    );
  },
);

FormText.displayName = 'FormText';
FormText.propTypes = propTypes;
FormText.defaultProps = defaultProps;

export default FormText;
