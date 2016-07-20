import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

// TODO: `pullRight` doesn't belong here. There's no special handling here.

const propTypes = {
  pullRight: React.PropTypes.bool,
};

const defaultProps = {
  pullRight: false,
};

class Badge extends React.Component {
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
    const { pullRight, className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      'pull-right': pullRight,

      // Hack for collapsing on IE8.
      hidden: !this.hasContent(children),
    };

    return (
      <span
        {...elementProps}
        className={classNames(className, classes)}
      >
        {children}
      </span>
    );
  }
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default bsClass('badge', Badge);
