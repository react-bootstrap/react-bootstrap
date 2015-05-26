import React from 'react';
import InputBase from './InputBase';
import FormControls from './FormControls';
import deprecationWarning from './utils/deprecationWarning';

class Input extends InputBase {
  render() {
    if (this.props.type === 'static') {
      deprecationWarning('Input type=static', 'StaticText');
      return <FormControls.Static {...this.props} />;
    }

    return super.render();
  }
}

export default Input;
