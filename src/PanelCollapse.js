import React from 'react';

import { prefix, splitBsProps, bsClass } from './utils/bootstrapUtils';
import Collapse from './Collapse';

const contextTypes = {
  $bs_panel: React.PropTypes.shape({
    getIds: React.PropTypes.func,
    bsClass: React.PropTypes.string,
    expanded: React.PropTypes.bool,
  })
};

class PanelCollapse extends React.Component {

  render() {
    const { children } = this.props;
    const { getIds, bsClass: _bsClass, expanded } = this.context.$bs_panel || {};

    const [bsProps, props] = splitBsProps(this.props);

    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (getIds) {
      let { headerId, collapseId } = getIds();
      props.id = collapseId;
      props.role = props.role || 'tabpanel';
      props['aria-labelledby'] = headerId;
    }

    return (
      <Collapse in={expanded} {...props}>
        <div className={prefix(bsProps, 'collapse')}>
          { children }
        </div>
      </Collapse>
    );
  }
}

PanelCollapse.propTypes = contextTypes;

export default bsClass('panel', PanelCollapse);
