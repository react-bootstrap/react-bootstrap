import React from 'react';
import InputBase from './InputBase';
import ButtonInput from './ButtonInput';
import deprecationWarning from './utils/deprecationWarning';

const buttonTypes = ['button', 'reset', 'submit'];

class Input extends InputBase {
  render() {
    if (buttonTypes.indexOf(this.props.type) > -1) {
      deprecationWarning(`Input type=${this.props.type}`, 'ButtonInput');
      return <ButtonInput {...this.props} />;
    }

    return super.render();
  }
}

export default Input;
