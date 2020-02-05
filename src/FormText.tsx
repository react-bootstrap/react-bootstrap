import PropTypes from 'prop-types';

import React from 'react';

import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';

import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface FormTextProps extends BsPrefixProps {
  muted?: boolean;
}

type FormText = BsPrefixRefForwardingComponent<'small', FormTextProps>;

const propTypes = {
  /** @default 'form-text' */
  bsPrefix: PropTypes.string,

  /**
   * ClassName mapping
   */
  classNameMap: PropTypes.object,

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

const FormText: FormText = React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  (
    {
      bsPrefix,
      classNameMap,
      className,
      as: Component = 'small',
      muted,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-text');
    const classNames = useClassNameMapper(classNameMap);

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
