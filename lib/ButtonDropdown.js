/** @jsx React.DOM */

var React          = require('react/addons');
var Button         = require('./Button');

var Option = React.createClass({displayName: 'Option',
  handleClick: function (e) {
    this.props.onClick(this.props.key);

    return false;
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

var ButtonDropdown = React.createClass({displayName: 'ButtonDropdown',
  getInitialState: function () {
    return {
      open: false
    }
  },

  getDefaultProps: function () {
    return {
      options: []
    }
  },

  toggle: function (open) {
    var newState = (open === undefined) ?
          !this.state.open : open;

    if (newState) {
      this.bindCloseHandlers();
    } else {
      this.unbindCloseHandlers();
    }

    this.setState({
      open: newState
    });
  },

  handleClick: function (e) {
    this.toggle();
  },

  handleOptionClick: function (key) {
    this.toggle();
    this.props.onClick(key);
  },

  handleKeyUp: function (e) {
    if (e.keyCode === 27) {
      this.toggle(false);
    }
  },

  handleClickOutside: function (e) {
    this.toggle(false);
  },

  bindCloseHandlers: function () {
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keyup', this.handleKeyUp);
  },

  unbindCloseHandlers: function () {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keyup', this.handleKeyUp);
  },

  componentWillUnmount: function () {
    this.unbindCloseHandlers();
  },

  render: function () {
    var groupClassName = React.addons.classSet({
      "btn-group": true,
      "open": this.state.open
    });

    var className = {
      "dropdown-toggle": true
    };

    var options = Object.keys(this.props.options).map(function (key) {
      return Option({
        onClick: this.handleOptionClick,
        key: key,
        title: this.props.options[key]
      });
    }.bind(this));

    return (
      React.DOM.div( {className:groupClassName}, 
          Button(
            {default:this.props.default,
            primary:this.props.primary,
            success:this.props.success,
            info:this.props.info,
            warning:this.props.warning,
            danger:this.props.danger,
            className:className,
            onClick:this.handleClick}, 
            this.props.title,' ',React.DOM.span( {className:"caret"} )
          ),
          React.DOM.ul( {className:"dropdown-menu", role:"menu"}, 
            options
          )
      )
    );
  }
});

module.exports = ButtonDropdown;