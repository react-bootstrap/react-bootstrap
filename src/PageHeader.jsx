var React = require('react');
var classSet = require('classnames');

var PageHeader = React.createClass({

  render: function () {
    return (
      <div {...this.props} className={classSet(this.props.className, 'page-header')}>
        <h1>{this.props.children}</h1>
      </div>
    );
  }
});

module.exports = PageHeader;