import React from 'react';
import classSet from 'classnames';
import BootstrapMixin from './BootstrapMixin';

const ButtonToolbar = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps() {
    return {
      bsClass: 'button-toolbar'
    };
  },

  render() {
    let classes = this.getBsClassSet();

    return (
      <div
        {...this.props}
        role="toolbar"
        className={classSet(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }
});

export default ButtonToolbar;
