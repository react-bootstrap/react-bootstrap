import React from 'react';
import cn from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

import { prefix, bsClass, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  componentClass: elementType,

  bsRole: React.PropTypes.string,
};

const defaultProps = {
  bsRole: 'heading',
  componentClass: 'div',
};

const contextTypes = {
  $bs_panel: React.PropTypes.shape({
    getIds: React.PropTypes.func,
    bsClass: React.PropTypes.string
  })
};

class PanelHeading extends React.Component {

  render() {
    const { children, className, componentClass: Component, ...props } = this.props;
    const { getIds, bsClass: _bsClass } = this.context.$bs_panel || {};

    const [bsProps, elementProps] = splitBsProps(props);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (getIds) {
      elementProps.role = elementProps.role || 'tab';
      elementProps.id = getIds().headingId;
    }

    return (
      <Component
        {...elementProps}
        className={cn(className, prefix(bsProps, 'heading'))}
      >
        {children}
      </Component>
    );
  }
}

PanelHeading.propTypes = propTypes;
PanelHeading.defaultProps = defaultProps;
PanelHeading.contextTypes = contextTypes;

export default bsClass('panel', PanelHeading);
