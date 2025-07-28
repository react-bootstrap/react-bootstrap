import clsx from 'clsx';
import * as React from 'react';
import { useBootstrapPrefix } from './ThemeProvider.js';
import AbstractModalHeader, {
  type AbstractModalHeaderProps,
} from './AbstractModalHeader.js';

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
        className={clsx(className, bsPrefix)}
        closeLabel={closeLabel}
        closeButton={closeButton}
      />
    );
  },
);

OffcanvasHeader.displayName = 'OffcanvasHeader';

export default OffcanvasHeader;
