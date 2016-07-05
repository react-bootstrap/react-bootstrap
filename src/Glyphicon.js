import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet, omitBsProps, prefix}
  from './utils/bootstrapUtils';

const propTypes = {
  /**
   * An icon name. See e.g. http://getbootstrap.com/components/#glyphicons
   */
  glyph: React.PropTypes.string.isRequired,
};

class Glyphicon extends React.Component {
  render() {
    const { glyph, className, ...props } = this.props;

    const classes = {
      ...getClassSet(props),
      [prefix(props, glyph)]: true,
    };

    return (
      <span
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      />
    );
  }
}

Glyphicon.propTypes = propTypes;

export default bsClass('glyphicon', Glyphicon);
