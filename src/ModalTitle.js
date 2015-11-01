import React from 'react';
import classNames from 'classnames';
import tbsUtils from './utils/bootstrapUtils';

class ModalTitle extends React.Component {
  render() {
    return (
      <h4
        {...this.props}
        className={classNames(this.props.className, tbsUtils.prefix(this.props, 'title'))}>
        { this.props.children }
      </h4>
    );
  }
}

ModalTitle.propTypes = {
  bsClass: React.PropTypes.string
};

ModalTitle.defaultProps = {
  bsClass: 'modal'
};

export default ModalTitle;
