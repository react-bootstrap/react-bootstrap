import React from 'react';
import classNames from 'classnames';

import ensureDomProps from './utils/ensureDomProps';

const Table = React.createClass({
  propTypes: {
    striped: React.PropTypes.bool,
    bordered: React.PropTypes.bool,
    condensed: React.PropTypes.bool,
    hover: React.PropTypes.bool,
    responsive: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bordered: false,
      condensed: false,
      hover: false,
      responsive: false,
      striped: false
    };
  },

  render() {
    let classes = {
      'table': true,
      'table-striped': this.props.striped,
      'table-bordered': this.props.bordered,
      'table-condensed': this.props.condensed,
      'table-hover': this.props.hover
    };
    const domProps = ensureDomProps(this.props, 'table');
    let table = (
      <table {...domProps} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </table>
    );

    return this.props.responsive ? (
      <div className="table-responsive">
        {table}
      </div>
    ) : table;
  }
});

export default Table;
