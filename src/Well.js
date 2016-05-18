import classNames from 'classnames';
import React from 'react';

import { Sizes } from './styleMaps';
import { bsSizes, bsClass, getClassSet } from './utils/bootstrapUtils';

@bsClass('well')
@bsSizes([Sizes.LARGE, Sizes.SMALL])
class Well extends React.Component {
  render() {
    let classes = getClassSet(this.props);

    return (
      <div {...this.props} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }
}

export default Well;
