import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /** @default 'popover-body' */
  bsPrefix: PropTypes.string,
};

const PopoverContent = React.forwardRef(
  ({ bsPrefix, className, children, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, `${bsPrefix}-body`);

    return (
      <div ref={ref} {...props} className={classNames(className, bsPrefix)}>
        {children}
      </div>
    );
  },
);

PopoverContent.propTypes = propTypes;

export default PopoverContent;
