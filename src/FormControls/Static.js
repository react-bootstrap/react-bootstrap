import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import InputBase from '../InputBase';
import childrenValueValidation from '../utils/childrenValueInputValidation';
import deprecationWarning from '../utils/deprecationWarning';

class Static extends InputBase {
  getValue() {
    const {children, value} = this.props;
    return children ? children : value;
  }

  renderInput() {
    const {componentClass: ComponentClass, ...props} = this.props;
    return (
      <ComponentClass {...props} className={classNames(props.className, 'form-control-static')} ref="input" key="input">
        {this.getValue()}
      </ComponentClass>
    );
  }
}

Static.propTypes = {
  value: childrenValueValidation,
  /**
   * You can override the default 'p' with a custom element
   */
  componentClass: elementType,
  children: childrenValueValidation
};

Static.defaultProps = {
  componentClass: 'p'
};

export default deprecationWarning.wrapper(Static,
  '`<FormControls.Static>`',
  '`<FormControl.Static>`'
);
