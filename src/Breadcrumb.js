import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import BreadcrumbItem from './BreadcrumbItem';

const propTypes = {
  /**
   * @default 'breadcrumb'
   */
  bsPrefix: PropTypes.string,
  /**
   * ARIA label for the nav element
   * https://www.w3.org/TR/wai-aria-practices/#breadcrumb
   */
  label: PropTypes.string,
  /**
   * Additional props passed as-is to the underlying `<ul>` element
   */
  listProps: PropTypes.object,

  as: PropTypes.elementType,
};

const defaultProps = {
  label: 'breadcrumb',
  listProps: {},
  as: 'nav',
};

const Breadcrumb = React.forwardRef(
  (
    {
      bsPrefix,
      className,
      listProps,
      children,
      label,
      as: Component,
      ...props
    },
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb');

    return (
      <Component aria-label={label} className={className} ref={ref} {...props}>
        <ol {...listProps} className={classNames(prefix, listProps.className)}>
          {children}
        </ol>
      </Component>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
