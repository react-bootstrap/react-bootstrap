import React from 'react';
import classNames from 'classnames';
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
      <span {...this.props} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </span>
    );
  }
});

export default Label;
