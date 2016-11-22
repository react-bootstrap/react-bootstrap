import React, { PropTypes } from 'react';
import cn from 'classnames';
import { prefix, splitBsProps, bsClass } from './utils/bootstrapUtils';

const propTypes = {
  bsRole: PropTypes.string,
};

const defaultProps = {
  bsRole: 'panel-body',
};

const contextTypes = {
  $bs_panel: PropTypes.shape({
    bsClass: PropTypes.string
  })
};

class PanelBody extends React.Component {
  render() {
    const { children, className } = this.props;
    const { bsClass: _bsClass } = this.context.$bs_panel || {};

    const [bsProps, elementProps] = splitBsProps(this.props);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    return (
      <div
        {...elementProps}
        className={cn(className, prefix(bsProps, 'body'))}
      >
        { children }
      </div>
    );
  }
}

PanelBody.propTypes = propTypes;
PanelBody.defaultProps = defaultProps;
PanelBody.contextTypes = contextTypes;

export default bsClass('panel', PanelBody);
