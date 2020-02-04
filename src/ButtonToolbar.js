import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'btn-toolbar'
   */
  bsPrefix: PropTypes.string,

  /**
   * The ARIA role describing the button toolbar. Generally the default
   * "toolbar" role is correct. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role: PropTypes.string,
};

const defaultProps = {
  role: 'toolbar',
};

const ButtonToolbar = React.forwardRef(
  ({ bsPrefix, className, ...props }, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'btn-toolbar');

    return (
      <div {...props} ref={ref} className={classNames(className, prefix)} />
    );
  },
);

ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.propTypes = propTypes;
ButtonToolbar.defaultProps = defaultProps;
export default ButtonToolbar;
