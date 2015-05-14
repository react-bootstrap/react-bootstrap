import React from 'react';
import classNames from 'classnames';
import InputBase from '../InputBase';
import childrenValueValidation from '../utils/childrenValueInputValidation';

class Static extends InputBase {
  getValue() {
    const {children, value} = this.props;
    return children ? children : value;
  }

  renderInput() {
    return (
      <p {...this.props} className={classNames(this.props.className, 'form-control-static')} ref="input" key="input">
        {this.getValue()}
      </p>
    );
  }
}

Static.propTypes = {
  value: childrenValueValidation,
  children: childrenValueValidation
};

export default Static;
