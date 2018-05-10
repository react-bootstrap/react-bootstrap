import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

class Table extends React.Component {
  static propTypes = {
    striped: PropTypes.bool,
    bordered: PropTypes.bool,
    condensed: PropTypes.bool,
    hover: PropTypes.bool,
    responsive: PropTypes.bool
  };

  static defaultProps = {
    bordered: false,
    condensed: false,
    hover: false,
    responsive: false,
    striped: false
  };

  render() {
    let classes = {
      'table': true,
      'table-striped': this.props.striped,
      'table-bordered': this.props.bordered,
      'table-condensed': this.props.condensed,
      'table-hover': this.props.hover
    };
    let table = (
      <table {...this.props} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </table>
    );

    return this.props.responsive ? (
      <div className="table-responsive">
        {table}
      </div>
    ) : table;
  }
}

export default Table;
