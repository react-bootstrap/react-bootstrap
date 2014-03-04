/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';
import utils          from './utils';


var Nav = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    bsStyle: React.PropTypes.oneOf(['tabs','pills']).isRequired,
    bsVariation: React.PropTypes.oneOf(['stacked','justified']),
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      bsClass: 'nav'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return this.transferPropsTo(
      <nav>
        <ul className={classSet(classes)}>
          {utils.modifyChildren(this.props.children, this.renderNavItem)}
        </ul>
      </nav>
    );
  },

  renderNavItem: function (child) {
    return utils.cloneWithProps(
      child,
      {
        isActive: this.props.activeKey != null ? child.props.key === this.props.activeKey : null,
        onSelect: utils.createChainedFunction(child.onSelect, this.props.onSelect),
        ref: child.props.ref,
        key: child.props.key
      }
    );
  }
});

export default = Nav;