/** @jsx React.DOM */

var React          = require('react/addons');

var MenuItem = React.createClass({displayName: 'MenuItem',
  handleClick: function (e) {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(this.props.key);
    }
  },

  render: function () {
    return (
      React.DOM.li( {key:this.props.key}, 
        React.DOM.a( {onClick:this.handleClick, href:"#"}, 
          this.props.title
        )
      )
    );
  }
});

module.exports = MenuItem;