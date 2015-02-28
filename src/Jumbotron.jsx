var React = require('react');
var classSet = require('classnames');

var Jumbotron = React.createClass({

  render: function () {
    return (
      <div {...this.props} className={classSet(this.props.className, 'jumbotron')}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Jumbotron;