import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'tab-content'
   */
  bsPrefix: PropTypes.string,

  as: PropTypes.elementType,
};

const TabContent = React.forwardRef(
  (
    {
      bsPrefix,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      className,
      ...props
    },
    ref,
  ) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'tab-content');
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(className, decoratedBsPrefix)}
      />
    );
  },
);

TabContent.propTypes = propTypes;

export default TabContent;
