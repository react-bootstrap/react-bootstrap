import React from 'react';
import classNames from 'classnames';
import bootstrapUtils from './utils/bootstrapUtils';
import Button from './Button';

class ButtonToolbar extends React.Component {
  static propTypes = {
    bsSize: Button.propTypes.bsSize
  };

  static defaultProps = {
    bsClass: 'btn-toolbar'
  };

  render() {
    let classes = bootstrapUtils.getClassSet(this.props);

    return (
      <div
        {...this.props}
        role="toolbar"
        className={classNames(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }
}

export default ButtonToolbar;
