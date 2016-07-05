import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet, omitBsProps } from './utils/bootstrapUtils';

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

      if (child != null && child !== false) {
        result = true;
      }
    });

    return result;
  }

  render() {
    const { pullRight, className, children, ...props } = this.props;

    const classes = {
      ...getClassSet(props),
      'pull-right': pullRight,

      // Hack for collapsing on IE8.
      hidden: !this.hasContent(children),
    };

    return (
      <span
        {...omitBsProps(props)}
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
