import React from 'react';
import Button from './Button';
import FormGroup from './FormGroup';
import InputBase from './InputBase';

function valueValidation({children, value}, propName, componentName) {
  if (children && value) {
    return new Error('Both value and children cannot be passed to ButtonInput');
  }
  return React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).call(null, {children, value}, propName, componentName);
}

class ButtonInput extends InputBase {
  renderFormGroup(children) {
    let {bsStyle, value, ...other} = this.props; // eslint-disable-line object-shorthand, no-unused-vars
    return <FormGroup {...other}>{children}</FormGroup>;
  }

  renderInput() {
    let {children, value, ...other} = this.props; // eslint-disable-line object-shorthand
    let val = children ? children : value;
    return <Button {...other} componentClass="input" ref="input" key="input" value={val} />;
  }
}

ButtonInput.defaultProps = {
  type: 'button'
};

ButtonInput.propTypes = {
  type: React.PropTypes.oneOf(['button', 'reset', 'submit']),
  bsStyle(props) {
    //defer to Button propTypes of bsStyle
    return null;
  },
  children: valueValidation,
  value: valueValidation
};

export default ButtonInput;
