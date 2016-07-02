import classNames from 'classnames';
import React from 'react';

import { bsClass, prefix } from './utils/bootstrapUtils';

import ensureDomProps from './utils/ensureDomProps';

class ModalFooter extends React.Component {
  render() {
    const domProps = ensureDomProps(this.props, 'div');
    return (
      <div
        {...domProps}
        className={classNames(this.props.className, prefix(this.props, 'footer'))}
      >
        {this.props.children}
      </div>
    );
  }
}

ModalFooter.propTypes = {
  /**
   * A css class applied to the Component
   */
  bsClass: React.PropTypes.string
};

ModalFooter.defaultProps = {
  bsClass: 'modal'
};

export default bsClass('modal', ModalFooter);
