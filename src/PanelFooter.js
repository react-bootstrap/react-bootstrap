import React, { PropTypes } from 'react';
import cn from 'classnames';
import { prefix, bsClass, splitBsProps } from './utils/bootstrapUtils';

let PanelFooter = React.createClass({
  contextTypes: {
    $bs_panel: PropTypes.shape({
      bsClass: PropTypes.string
    })
  },

  render() {
    let { children, className } = this.props;
    let { bsClass: _bsClass } = this.context.$bs_panel || {};

    const [bsProps, elementProps] = splitBsProps(this.props);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    return (
      <div
        {...elementProps}
        className={cn(
          className,
          prefix(bsProps, 'footer')
        )}
      >
        { children }
      </div>
    );
  }
});

export default bsClass('panel', PanelFooter);
