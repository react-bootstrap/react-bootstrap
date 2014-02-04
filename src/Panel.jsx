/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';
import utils          from './utils';

var Panel = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    //header: React.PropTypes.renderable,
    //footer: React.PropTypes.renderable,
    isCollapsable: React.PropTypes.bool,
    isOpen: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      bsClass: 'panel'
    };
  },

  getInitialState: function() {
    return {
      isOpen: this.props.defaultOpen != null ? this.props.defaultOpen : null
    };
  },

  handleSelect: function (e) {
    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(this.props.key);
      this._isChanging = false;
    }

    e.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  shouldComponentUpdate: function () {
    return !this._isChanging;
  },

  isOpen: function () {
    return (this.props.isOpen != null) ? this.props.isOpen : this.state.isOpen;
  },

  render: function () {
    var classes = this.getBsClassSet();
    classes['panel'] = true;

    return this.transferPropsTo(
      <div className={classSet(classes)} id={this.props.isCollapsable ? null : this.props.id}>
        {this.renderHeading()}
        {this.props.isCollapsable ? this.renderCollapsableBody() : this.renderBody()}
        {this.renderFooter()}
      </div>
    );
  },

  renderCollapsableBody: function () {
    var classes = {
      'panel-collapse': true,
      'collapse': true,
      'in': this.isOpen()
    };

    return (
      <div className={classSet(classes)} id={this.props.id}>
        {this.renderBody()}
      </div>
    );
  },

  renderBody: function () {
    return (
      <div className="panel-body">
        {this.props.children}
      </div>
    );
  },

  renderHeading: function () {
    var header = this.props.header;

    if (!header) {
      return null;
    }

    if (!React.isValidComponent(header) || Array.isArray(header)) {
      header = this.props.isCollapsable ?
        this.renderCollapsableTitle(header) : header;
    } else if (this.props.isCollapsable) {
      header = utils.cloneWithProps(header, {
        className: 'panel-title',
        children: this.renderAnchor(header.props.children)
      });
    } else {
      header = utils.cloneWithProps(header, {
        className: 'panel-title'
      });
    }

    return (
      <div className="panel-heading">
        {header}
      </div>
    );
  },

  renderAnchor: function (header) {
    return (
      <a
        href={'#' + (this.props.id || '')}
        className={this.isOpen() ? null : 'collapsed'}
        onClick={this.handleSelect}>
        {header}
      </a>
    );
  },

  renderCollapsableTitle: function (header) {
    return (
      <h4 className="panel-title">
        {this.renderAnchor(header)}
      </h4>
    );
  },

  renderFooter: function () {
    if (!this.props.footer) {
      return null;
    }

    return (
      <div className="panel-footer">
        {this.props.footer}
      </div>
    );
  }
});

export default = Panel;