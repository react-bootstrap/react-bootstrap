import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /** @default 'popover-header' */
  bsPrefix: PropTypes.string,
};

const PopoverTitle = React.forwardRef(
  ({ bsPrefix, className, children, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-header h3');

    return (
      <div ref={ref} {...props} className={classNames(className, bsPrefix)}>
        {children}
      </div>
    );
  },
);

PopoverTitle.propTypes = propTypes;

export default PopoverTitle;
