import React, { PropTypes, cloneElement } from 'react';
import cn from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

import { prefix, bsClass, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  componentClass: elementType,

  bsRole: PropTypes.string,
};

const defaultProps = {
  bsRole: 'heading',
};

const contextTypes = {
  $bs_panel: PropTypes.shape({
    getIds: React.PropTypes.func,
    bsClass: PropTypes.string
  })
};

class PanelHeading extends React.Component {

  render() {
    let { children, className, ...props } = this.props;
    const { getIds, bsClass: _bsClass } = this.context.$bs_panel || {};

    const [bsProps, elementProps] = splitBsProps(props);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (getIds) {
      elementProps.role = elementProps.role || 'tab';
      elementProps.id = getIds().headingId;
    }

    return (
      <div
        {...elementProps}
        className={cn(className, prefix(bsProps, 'heading'))}
      >
        {children}
      </div>
    );
  }
}

PanelHeading.propTypes = propTypes;
PanelHeading.defaultProps = defaultProps;
PanelHeading.contextTypes = contextTypes;

export default bsClass('panel', PanelHeading);
