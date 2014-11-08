var React = require('react');
var joinClasses = require('./utils/joinClasses');

var Jumbotron = React.createClass({

  render: function () {
    return (
      <div {...this.props} className={joinClasses(this.props.className, 'jumbotron')}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Jumbotron;