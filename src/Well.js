import classNames from 'classnames';
import React from 'react';

import { Sizes } from './styleMaps';
import { bsSizes, bsClass, getClassSet } from './utils/bootstrapUtils';

import ensureDomProps from './utils/ensureDomProps';

@bsClass('well')
@bsSizes([Sizes.LARGE, Sizes.SMALL])
class Well extends React.Component {
  render() {
    let classes = getClassSet(this.props);
    const domProps = ensureDomProps(this.props, 'div');
    return (
      <div {...domProps} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }
}

export default Well;
