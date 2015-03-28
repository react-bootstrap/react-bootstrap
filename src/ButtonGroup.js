import React from 'react';
import classSet from 'classnames';
import BootstrapMixin from './BootstrapMixin';

const ButtonGroup = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    vertical:  React.PropTypes.bool,
    justified: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bsClass: 'button-group'
    };
  },

  render() {
    let classes = this.getBsClassSet();
    classes['btn-group'] = !this.props.vertical;
    classes['btn-group-vertical'] = this.props.vertical;
    classes['btn-group-justified'] = this.props.justified;

    return (
      <div
        {...this.props}
        className={classSet(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }
});

export default ButtonGroup;
