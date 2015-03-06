import React from 'react';
import classSet from 'classnames';
import BootstrapMixin from './BootstrapMixin';

const Label = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps() {
    return {
      bsClass: 'label',
      bsStyle: 'default'
    };
  },

  render() {
    let classes = this.getBsClassSet();

    return (
      <span {...this.props} className={classSet(this.props.className, classes)}>
        {this.props.children}
      </span>
    );
  }
});

export default Label;
