import classNames from 'classnames';
import * as React from 'react';
import { useBootstrapPrefix } from './ThemeProvider';
import AbstractModalHeader, {
  type AbstractModalHeaderProps,
} from './AbstractModalHeader';

export interface OffcanvasHeaderProps extends AbstractModalHeaderProps {
  /**
   * @default 'offcanvas-header'
   */
  bsPrefix?: string | undefined;
}

const OffcanvasHeader = React.forwardRef<HTMLDivElement, OffcanvasHeaderProps>(
  (
    {
      bsPrefix,
      className,
      closeLabel = 'Close',
      closeButton = false,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-header');
    return (
      <AbstractModalHeader
        ref={ref}
        {...props}
        className={classNames(className, bsPrefix)}
        closeLabel={closeLabel}
        closeButton={closeButton}
      />
    );
  },
);

OffcanvasHeader.displayName = 'OffcanvasHeader';

export default OffcanvasHeader;
