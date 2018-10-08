import classNames from 'classnames';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import React from 'react';

import { createBootstrapComponent } from './ThemeProvider';

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
  innerRef: PropTypes.any,

  /**
   * A convenience prop for add the `text-muted` class,
   * since it's so commonly used here.
   */
  muted: PropTypes.bool,
  as: elementType,
};

const defaultProps = {
  as: 'small',
};

function FormText({ bsPrefix, className, innerRef, as: Component, ...props }) {
  return (
    <Component
      {...props}
      ref={innerRef}
      className={classNames(className, bsPrefix)}
    />
  );
}

FormText.propTypes = propTypes;
FormText.defaultProps = defaultProps;

export default createBootstrapComponent(FormText, 'form-text');
