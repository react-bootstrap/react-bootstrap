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

  handleSelect: function () {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.key);
    }
  },

  render: function () {
    var classes = this.getBsClassSet();
    classes['panel'] = true;
    classes['panel-collapse'] = this.props.isCollapsable;
    classes['collapse'] = this.props.isCollapsable;
    classes['in'] = this.props.isOpen;

    return this.transferPropsTo(
      <div className={classSet(classes)}>
        {this.renderHeading()}
        <div className="panel-body">
          {this.props.children}
        </div>
        {this.renderFooter()}
      </div>
    );
  },

  renderHeading: function () {
    var header = this.props.header;

    if (!header) {
      return null;
    }

    if (!React.isValidComponent(header) || Array.isArray(header)) {
      header = (
        <h4 className="panel-title">{header}</h4>
      );
    } else {
      header = utils.cloneWithProps(header, {
        className: 'panel-title'
      });
    }

    return (
      <div className="panel-heading" onClick={this.handleSelect}>
        {header}
      </div>
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