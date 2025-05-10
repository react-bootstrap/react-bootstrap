import classNames from 'classnames';
import * as React from 'react';
import { useBootstrapPrefix } from './ThemeProvider';
import AbstractModalHeader, {
  type AbstractModalHeaderProps,
} from './AbstractModalHeader';

export interface ModalHeaderProps extends AbstractModalHeaderProps {
  /**
   * @default 'modal-header'
   */
  bsPrefix?: string | undefined;
}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
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
    bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-header');
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

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
