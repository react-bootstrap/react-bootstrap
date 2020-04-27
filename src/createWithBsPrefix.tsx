import classNames from 'classnames';
import camelize from 'dom-helpers/camelize';
import React from 'react';
import { useBootstrapPrefix } from './ThemeProvider';

const pascalCase = (str) => str[0].toUpperCase() + camelize(str).slice(1);

export default function createWithBsPrefix(
  prefix,
  { displayName = pascalCase(prefix), Component = 'div', defaultProps } = {},
) {
  const BsComponent = React.forwardRef(
    // eslint-disable-next-line react/prop-types
    ({ className, bsPrefix, as: Tag = Component, ...props }, ref) => {
      const resolvedPrefix = useBootstrapPrefix(bsPrefix, prefix);
      return (
        <Tag
          ref={ref}
          className={classNames(className, resolvedPrefix)}
          {...props}
        />
      );
    },
  );
  BsComponent.defaultProps = defaultProps;
  BsComponent.displayName = displayName;
  return BsComponent;
}
