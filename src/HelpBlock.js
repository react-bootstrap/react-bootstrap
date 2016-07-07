import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet } from './utils/bootstrapUtils';

import ensureDomProps from './utils/ensureDomProps';

class HelpBlock extends React.Component {
  render() {
    const { className, ...props } = this.props;
    delete props.bsClass;

    const classes = getClassSet(this.props);

    const domProps = ensureDomProps(props, 'span');

    return (
      <span {...domProps} className={classNames(className, classes)} />
    );
  }
}

export default bsClass('help-block', HelpBlock);
