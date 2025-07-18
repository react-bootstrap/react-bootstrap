import classNames from 'classnames';
import React from 'react';

import {
  bsClass,
  bsStyles,
  getClassSet,
  splitBsProps
} from './utils/bootstrapUtils';
import { State, Style } from './utils/StyleConfig';

class Label extends React.Component {
  hasContent(children) {
    let result = false;

    React.Children.forEach(children, child => {
      if (result) {
        return;
      }

      if (child || child === 0) {
        result = true;
      }
    });

    return result;
  }

  render() {
    const { className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),

      // Hack for collapsing on IE8.
      hidden: !this.hasContent(children)
    };

    return (
      <span {...elementProps} className={classNames(className, classes)}>
        {children}
      </span>
    );
  }
}

export default bsClass(
  'label',
  bsStyles(
    [...Object.values(State), Style.DEFAULT, Style.PRIMARY],
    Style.DEFAULT,
    Label
  )
);
