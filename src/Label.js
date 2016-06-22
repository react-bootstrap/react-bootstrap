import classNames from 'classnames';
import React from 'react';

import { State, DEFAULT, PRIMARY } from './styleMaps';
import { bsStyles, bsClass, getClassSet } from './utils/bootstrapUtils';

@bsClass('label')
@bsStyles(State.values().concat(DEFAULT, PRIMARY), DEFAULT)
class Label extends React.Component {

  render() {
    let classes = getClassSet(this.props);

    return (
      <span
        {...this.props}
        className={classNames(this.props.className, classes)}
      >
        {this.props.children}
      </span>
    );
  }
}

export default Label;
