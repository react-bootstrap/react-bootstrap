import classNames from 'classnames';
import React from 'react';

import camelize from 'dom-helpers/util/camelize';
import { createBootstrapComponent } from '../ThemeProvider';

const pascalCase = str => str[0].toUpperCase() + camelize(str).slice(1);

export default function createWithBsPrefix(
  prefix,
  { displayName = pascalCase(prefix), Component = 'div' } = {},
) {
  return createBootstrapComponent(
    class extends React.Component {
      static displayName = displayName;
      static propTypes = { bsPrefix: () => {}, as: () => {} };
      render() {
        const {
          className,
          bsPrefix,
          as: Tag = Component,
          ...props
        } = this.props;

        return <Tag {...props} className={classNames(className, bsPrefix)} />;
      }
    },
    prefix,
  );
}
