import React from 'react';
import InputBase from './InputBase';
import ButtonInput from './ButtonInput';
import FormControls from './FormControls';
import deprecationWarning from './utils/deprecationWarning';

class Input extends InputBase {
  render() {
    if (ButtonInput.types.indexOf(this.props.type) > -1) {
      deprecationWarning(`Input type=${this.props.type}`, 'ButtonInput');
      return <ButtonInput {...this.props} />;
    } else if (this.props.type === 'static') {
      deprecationWarning('Input type=static', 'StaticText');
      return <FormControls.Static {...this.props} />;
    }

    return super.render();
  }
}

Input.propTypes = {
  type: React.PropTypes.string
};

export default Input;
