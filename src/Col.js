import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';

import { createBootstrapComponent } from './ThemeProvider';

const DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs'];
const colSize = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.number,
  PropTypes.string,
  PropTypes.oneOf(['auto']),
]);

const stringOrNumber = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

const column = PropTypes.oneOfType([
  colSize,
  PropTypes.shape({
    size: colSize,
    order: stringOrNumber,
    offset: stringOrNumber,
  }),
]);

class Col extends React.Component {
  static propTypes = {
    /**
     * @default 'col'
     */
    bsPrefix: PropTypes.string,

    as: elementType,

    /**
     * The number of columns to span on sxtra small devices (<576px)
     *
     * @type {(true|"auto"|number|{ span: true|"auto"|number, offset: number, order: number })}
     */
    xs: column,

    /**
     * The number of columns to span on small devices (≥576px)
     *
     * @type {(true|"auto"|number|{ span: true|"auto"|number, offset: number, order: number })}
     */
    sm: column,

    /**
     * The number of columns to span on medium devices (≥768px)
     *
     * @type {(true|"auto"|number|{ span: true|"auto"|number, offset: number, order: number })}
     */
    md: column,

    /**
     * The number of columns to span on large devices (≥992px)
     *
     * @type {(true|"auto"|number|{ span: true|"auto"|number, offset: number, order: number })}
     */
    lg: column,

    /**
     * The number of columns to span on extra large devices (≥1200px)
     *
     * @type {(true|"auto"|number|{ span: true|"auto"|number, offset: number, order: number })}
     */
    xl: column,
  };

  static defaultProps = {
    as: 'div',
  };

  render() {
    const { bsPrefix, className, as: Component, ...props } = this.props;

    const spans = [];
    const classes = [];

    DEVICE_SIZES.forEach(brkPoint => {
      let propValue = props[brkPoint];
      delete props[brkPoint];

      let span, offset, order;
      if (propValue != null && typeof propValue === 'object') {
        ({ span = true, offset, order } = propValue);
      } else {
        span = propValue;
      }

      let infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';

      if (span != null)
        spans.push(
          span === true ? `${bsPrefix}${infix}` : `${bsPrefix}${infix}-${span}`,
        );

      if (order != null) classes.push(`order${infix}-${order}`);
      if (offset != null) classes.push(`offset${infix}-${offset}`);
    });
    if (!spans.length) {
      spans.push(bsPrefix); // plain 'col'
    }

    return (
      <Component
        {...props}
        className={classNames(className, ...spans, ...classes)}
      />
    );
  }
}

export default createBootstrapComponent(Col, 'col');
