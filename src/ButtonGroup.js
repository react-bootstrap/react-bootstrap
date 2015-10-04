import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import all from 'react-prop-types/lib/all';

const ButtonGroup = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    vertical: React.PropTypes.bool,
    justified: React.PropTypes.bool,
    /**
     * Display block buttons, only useful when used with the "vertical" prop.
     * @type {bool}
     */
    block: all(
      React.PropTypes.bool,
      props => {
        if (props.block && !props.vertical) {
          return new Error('The block property requires the vertical property to be set to have any effect');
        }
      }
    )
  },

  getDefaultProps() {
    return {
      block: false,
      bsClass: 'button-group',
      justified: false,
      vertical: false
    };
  },

  render() {
    let classes = this.getBsClassSet();
    classes['btn-group'] = !this.props.vertical;
    classes['btn-group-vertical'] = this.props.vertical;
    classes['btn-group-justified'] = this.props.justified;
    classes['btn-block'] = this.props.block;

    return (
      <div
        {...this.props}
        className={classNames(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }
});

export default ButtonGroup;
