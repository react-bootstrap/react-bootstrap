import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';

const Well = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps() {
    return {
      bsClass: 'well'
    };
  },

  render() {
    let classes = this.getBsClassSet();

    return (
      <div {...this.props} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }
});

export default Well;
