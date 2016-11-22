import React from 'react';

import { prefix, splitBsProps, bsClass } from './utils/bootstrapUtils';
import Collapse from './Collapse';


const propTypes = {
  bsRole: React.PropTypes.string,
  /**
   * Callback fired before the component expands
   */
  onEnter: React.PropTypes.func,
  /**
   * Callback fired after the component starts to expand
   */
  onEntering: React.PropTypes.func,
  /**
   * Callback fired after the component has expanded
   */
  onEntered: React.PropTypes.func,
  /**
   * Callback fired before the component collapses
   */
  onExit: React.PropTypes.func,
  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: React.PropTypes.func,
  /**
   * Callback fired after the component has collapsed
   */
  onExited: React.PropTypes.func,
};

const defaultProps = {
  bsRole: 'panel-collapse',
};

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
      let { headingId, collapseId } = getIds();
      props.id = collapseId;
      props.role = props.role || 'tabpanel';
      props['aria-labelledby'] = headingId;
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

PanelCollapse.propTypes = propTypes;
PanelCollapse.defaultProps = defaultProps;
PanelCollapse.contextTypes = contextTypes;

export default bsClass('panel', PanelCollapse);
