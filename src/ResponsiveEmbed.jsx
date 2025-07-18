import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import {
  bsClass,
  getClassSet,
  prefix,
  splitBsProps
} from './utils/bootstrapUtils';

// TODO: This should probably take a single `aspectRatio` prop.

const propTypes = {
  /**
   * This component requires a single child element
   */
  children: PropTypes.element.isRequired,
  /**
   * 16by9 aspect ratio
   */
  a16by9: PropTypes.bool,
  /**
   * 4by3 aspect ratio
   */
  a4by3: PropTypes.bool
};

const defaultProps = {
  a16by9: false,
  a4by3: false
};

class ResponsiveEmbed extends React.Component {
  render() {
    const { a16by9, a4by3, className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    warning(a16by9 || a4by3, 'Either `a16by9` or `a4by3` must be set.');
    warning(!(a16by9 && a4by3), 'Only one of `a16by9` or `a4by3` can be set.');

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, '16by9')]: a16by9,
      [prefix(bsProps, '4by3')]: a4by3
    };

    return (
      <div className={classNames(classes)}>
        {cloneElement(children, {
          ...elementProps,
          className: classNames(className, prefix(bsProps, 'item'))
        })}
      </div>
    );
  }
}

ResponsiveEmbed.propTypes = propTypes;
ResponsiveEmbed.defaultProps = defaultProps;

export default bsClass('embed-responsive', ResponsiveEmbed);
