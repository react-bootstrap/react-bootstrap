import React from 'react';
import classSet from 'classnames';
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
      <div {...this.props} className={classSet(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }
});

export default Well;
