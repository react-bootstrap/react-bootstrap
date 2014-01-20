/** @jsx React.DOM */

var React = require('react/addons');

var Tab = React.createClass({displayName: 'Tab',
  handleClick: function () {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(this.props.id);
    }
  },

  render: function () {
    var className = React.addons.classSet({
      'nav': true,
      'nav-tab': true,
      'active': this.props.isActive
    });

    return this.transferPropsTo(
      React.DOM.li( {className:className}, 
        React.DOM.a(
          {ref:"button",
          href:this.props.id ? '#' + this.props.id : null,
          onClick:this.handleClick}, 
            this.props.children
          )
      )
    );
  }
});

module.exports = Tab;