import React from 'react';

import * as FormControls from './FormControls';
import InputBase from './InputBase';
import deprecationWarning from './utils/deprecationWarning';

class Input extends InputBase {
  render() {
    if (this.props.type === 'static') {
      deprecationWarning('Input type=static', 'FormControls.Static');
      return <FormControls.Static {...this.props} />;
    }

    return super.render();
  }
}

Input.propTypes = {
  type: React.PropTypes.string
};

export default deprecationWarning.wrapper(Input,
  '`<Input>`',
  '`<FormControl>`, `<Checkbox>`, or `<Radio>`, with `<FormGroup>` and/or ' +
  '`<InputGroup>` as needed'
);
