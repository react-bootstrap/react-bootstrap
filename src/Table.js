import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet, omitBsProps, prefix }
  from './utils/bootstrapUtils';

const propTypes = {
  striped: React.PropTypes.bool,
  bordered: React.PropTypes.bool,
  condensed: React.PropTypes.bool,
  hover: React.PropTypes.bool,
  responsive: React.PropTypes.bool,
};

const defaultProps = {
  bordered: false,
  condensed: false,
  hover: false,
  responsive: false,
  striped: false,
};

class Table extends React.Component {
  render() {
    const {
      striped, bordered, condensed, hover, responsive, className, ...props,
    } = this.props;

    const classes = {
      ...getClassSet(props),
      [prefix(props, 'striped')]: striped,
      [prefix(props, 'bordered')]: bordered,
      [prefix(props, 'condensed')]: condensed,
      [prefix(props, 'hover')]: hover,
    };

    const table = (
      <table
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      />
    );

    if (responsive) {
      return (
        <div className={prefix(props, 'responsive')}>
          {table}
        </div>
      );
    }

    return table;
  }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default bsClass('table', Table);
