var React = require('react');
var joinClasses = require('react/lib/joinClasses');
var BootstrapMixin = require('./BootstrapMixin');
var classSet = require('react/lib/cx');
var cloneWithProps = require('react/lib/cloneWithProps');

var ValidComponentChildren = require('./utils/ValidComponentChildren');

var ListGroupItem = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    bsStyle: React.PropTypes.oneOf(['danger','info','success','warning']),
    active: React.PropTypes.any,
    disabled: React.PropTypes.any,
    header: React.PropTypes.node,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      bsClass: 'list-group-item'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    classes['active'] = this.props.active;
    classes['disabled'] = this.props.disabled;

    if (this.props.href || this.props.onClick) {
      return this.renderAnchor(classes);
    } else {
      return this.renderSpan(classes);
    }
  },

  renderSpan: function (classes) {
    return (
      <span {...this.props} className={joinClasses(this.props.className, classSet(classes))}>
        {this.props.header ? this.renderStructuredContent() : this.props.children}
      </span>
    );
  },

  renderAnchor: function (classes) {
    return (
      <a
        {...this.props}
        className={joinClasses(this.props.className, classSet(classes))}
        onClick={this.handleClick}>
        {this.props.header ? this.renderStructuredContent() : this.props.children}
      </a>
    );
  },

  renderStructuredContent: function () {
    var header;
    if (React.isValidElement(this.props.header)) {
      header = cloneWithProps(this.props.header, {
        className: 'list-group-item-heading'
      });
    } else {
      header = (
        <h4 className="list-group-item-heading">
          {this.props.header}
        </h4>
      );
    }

    var content = (
      <p className="list-group-item-text">
        {this.props.children}
      </p>
    );

    return {
      header: header,
      content: content
    };
  },

  handleClick: function (e) {
    if (this.props.onClick) {
      e.preventDefault();
      this.props.onClick(this._currentElement.key, this.props.href);
    }
  }
});

module.exports = ListGroupItem;
