import React from 'react';
import classNames from 'classnames';

const Table = React.createClass({
  propTypes: {
    striped: React.PropTypes.bool,
    bordered: React.PropTypes.bool,
    condensed: React.PropTypes.bool,
    hover: React.PropTypes.bool,
    responsive: React.PropTypes.bool,
    headers: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  getDefaultProps() {
    return {
      bordered: false,
      condensed: false,
      hover: false,
      responsive: false,
      striped: false,
      headers: []
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

    let table;

    if (this.props.headers) {
      const headerCols = this.props.headers.map((header, index) => <th key={index}>{header}</th>);
      table = (
        <table {...this.props} className={classNames(this.props.className, classes)}>
          <thead>
            <tr>
              {headerCols}
            </tr>
          </thead>
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      );
    } else {
      table = (
        <table {...this.props} className={classNames(this.props.className, classes)}>
          {this.props.children}
        </table>
      );
    }


    return this.props.responsive ? (
      <div className="table-responsive">
        {table}
      </div>
    ) : table;
  }
});

export default Table;
