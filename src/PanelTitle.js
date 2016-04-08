import React, { PropTypes } from 'react';
import cn from 'classnames';
import elementType from 'react-prop-types/lib/elementType';
import tbsUtils, { bsClass } from './utils/bootstrapUtils';
import Toggle from './PanelToggle';

let PanelTitle = React.createClass({
  propTypes: {
    componentClass: elementType,
    toggle: PropTypes.bool,
  },

  contextTypes: {
    $bs_panel: PropTypes.shape({
      bsClass: PropTypes.string
    })
  },

  getDefaultProps() {
    return { componentClass: 'div' };
  },

  render() {
    let { children, className, toggle, componentClass, ...props } = this.props;
    let Component = 'div';

    if (toggle) {
      children = <Toggle>{children}</Toggle>;
    }

    children = (
      <Component
        {...props}
        className={cn(
          className,
          tbsUtils.prefix(props, this.context.$bs_panel, 'title')
        )}
      >
        { children }
      </Component>
    );

    return children;
  }
});

export default bsClass('panel', PanelTitle);
