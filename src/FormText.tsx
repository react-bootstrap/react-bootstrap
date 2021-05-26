import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';

import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface FormTextProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  muted?: boolean;
}

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

const FormText: BsPrefixRefForwardingComponent<'small', FormTextProps> =
  React.forwardRef<HTMLElement, FormTextProps>(
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    (
      { bsPrefix, className, as: Component = 'small', muted, ...props },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'form-text');

      return (
        <Component
          {...props}
          ref={ref}
          className={classNames(className, bsPrefix, muted && 'text-muted')}
        />
      );
    },
  );

FormText.displayName = 'FormText';
FormText.propTypes = propTypes;

export default FormText;
