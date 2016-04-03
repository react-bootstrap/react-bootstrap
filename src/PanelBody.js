import React, { PropTypes } from 'react';
import cn from 'classnames';
import { prefix, splitBsProps, bsClass } from './utils/bootstrapUtils';

let PanelBody = React.createClass({
  contextTypes: {
    $bs_panel: PropTypes.shape({
      bsClass: PropTypes.string
    })
  },

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
});

export default bsClass('panel', PanelBody);
