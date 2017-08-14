import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import {
  bsClass,
  getClassSet,
  prefix,
  splitBsProps
} from './utils/bootstrapUtils';

const propTypes = {
  inverse: PropTypes.bool,
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  condensed: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool
};

const defaultProps = {
  inverse: false,
  bordered: false,
  condensed: false,
  hover: false,
  responsive: false,
  striped: false
};

class Table extends React.Component {
  render() {
    const {
      inverse,
      striped,
      bordered,
      condensed,
      hover,
      responsive,
      className,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, 'responsive')]: responsive,
      [prefix(bsProps, 'inverse')]: inverse,
      [prefix(bsProps, 'striped')]: striped,
      [prefix(bsProps, 'bordered')]: bordered,
      [prefix(bsProps, 'condensed')]: condensed,
      [prefix(bsProps, 'hover')]: hover
    };

    return (
      <table {...elementProps} className={classNames(className, classes)} />
    );
  }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default bsClass('table', Table);
