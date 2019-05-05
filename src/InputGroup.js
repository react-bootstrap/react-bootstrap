import classNames from 'classnames';
import PropTypes from 'prop-types';

import React from 'react';

import createWithBsPrefix from './utils/createWithBsPrefix';
import { createBootstrapComponent } from './ThemeProvider';

/**
 *
 * @property {InputGroupAppend} Append
 * @property {InputGroupPrepend} Prepend
 * @property {InputGroupText} Text
 * @property {InputGroupRadio} Radio
 * @property {InputGroupCheckbox} Checkbox
 */
class InputGroup extends React.Component {
  static propTypes = {
    /** @default 'input-group' */
    bsPrefix: PropTypes.string.isRequired,

    /**
     * Control the size of buttons and form elements from the top-level .
     *
     * @type {('sm'|'lg')}
     */
    size: PropTypes.string,

    as: PropTypes.elementType,
  };

  render() {
    const {
      bsPrefix,
      size,
      className,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      ...props
    } = this.props;

    return (
      <Component
        {...props}
        className={classNames(
          className,
          bsPrefix,
          size && `${bsPrefix}-${size}`,
        )}
      />
    );
  }
}

const InputGroupAppend = createWithBsPrefix('input-group-append');

const InputGroupPrepend = createWithBsPrefix('input-group-prepend');

const InputGroupText = createWithBsPrefix('input-group-text', {
  Component: 'span',
});

const InputGroupCheckbox = props => (
  <InputGroupText>
    <input type="checkbox" {...props} />
  </InputGroupText>
);

const InputGroupRadio = props => (
  <InputGroupText>
    <input type="radio" {...props} />
  </InputGroupText>
);

const DecoratedInputGroup = createBootstrapComponent(InputGroup, 'input-group');

DecoratedInputGroup.Text = InputGroupText;
DecoratedInputGroup.Radio = InputGroupRadio;
DecoratedInputGroup.Checkbox = InputGroupCheckbox;
DecoratedInputGroup.Append = InputGroupAppend;
DecoratedInputGroup.Prepend = InputGroupPrepend;

export default DecoratedInputGroup;
