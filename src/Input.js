import React from 'react';
import InputBase from './InputBase';
import * as FormControls from './FormControls';
import deprecationWarning from './utils/deprecationWarning';

class Input extends InputBase {
  render() {
    if (this.props.type === 'static') {
      deprecationWarning('Input type=static', 'StaticText');
      return <FormControls.Static {...this.props} />;
    } else if (this.props.type === 'radio') {
      deprecationWarning('Input type=radio', 'FormControls.RadioButton and FormControls.RadioGroup');
      return <FormControls.RadioButton {...this.props} />;
    }

    return super.render();
  }
}

Input.propTypes = {
  type: React.PropTypes.string
};

export default Input;
