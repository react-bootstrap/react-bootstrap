/** @jsx React.DOM */

var React = require('react/addons');

var Table = React.createClass({
  propTypes: {
    striped: React.PropTypes.bool,
    bordered: React.PropTypes.bool,
    condensed: React.PropTypes.bool,
    hover: React.PropTypes.bool,
    responsive: React.PropTypes.bool
  },

  render: function () {
    var classes = {
      'table': true,
      'table-striped': this.props.striped,
      'table-bordered': this.props.bordered,
      'table-condensed': this.props.condensed,
      'table-hover': this.props.hover
    };
    var table = this.transferPropsTo(
      <table className={React.addons.classSet(classes)}>
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

module.exports = Table;
