import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import bootstrapUtils, { bsClass } from './utils/bootstrapUtils';
import all from 'react-prop-types/lib/all';
import Button from './Button';

class ButtonGroup extends React.Component {
  static propTypes = {
    vertical: PropTypes.bool,
    justified: PropTypes.bool,
    /**
     * Display block buttons, only useful when used with the "vertical" prop.
     * @type {bool}
     */
    block: all(
      PropTypes.bool,
      props => {
        if (props.block && !props.vertical) {
          return new Error('The block property requires the vertical property to be set to have any effect');
        }
      }
    )
  };

  static defaultProps = {
    block: false,
    justified: false,
    vertical: false
  };

  render() {
    let classes = bootstrapUtils.getClassSet(this.props);

    classes[bootstrapUtils.prefix(this.props)] = !this.props.vertical;
    classes[bootstrapUtils.prefix(this.props, 'vertical')] = this.props.vertical;
    classes[bootstrapUtils.prefix(this.props, 'justified')] = this.props.justified;

    // this is annoying, since the class is `btn-block` not `btn-group-block`
    classes[bootstrapUtils.prefix(Button.defaultProps, 'block')] = this.props.block;

    return (
      <div
        {...this.props}
        className={classNames(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }
}

export default bsClass('btn-group', ButtonGroup);
