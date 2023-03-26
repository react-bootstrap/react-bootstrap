import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useBootstrapPrefix } from './ThemeProvider';
import { CloseButtonVariant } from './CloseButton';
import AbstractModalHeader, {
  AbstractModalHeaderProps,
} from './AbstractModalHeader';
import { BsPrefixOnlyProps } from './helpers';

export interface OffcanvasHeaderProps
  extends AbstractModalHeaderProps,
    BsPrefixOnlyProps {}

const propTypes = {
  /**
   * @default 'offcanvas-header'
   */
  bsPrefix: PropTypes.string,

  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: PropTypes.string,

  /**
   * Sets the variant for close button.
   */
  closeVariant: PropTypes.oneOf<CloseButtonVariant>(['white']),

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: PropTypes.bool,

  /**
   * A Callback fired when the close button is clicked. If used directly inside
   * a Offcanvas component, the onHide will automatically be propagated up to the
   * parent Offcanvas `onHide`.
   */
  onHide: PropTypes.func,
};

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
OffcanvasHeader.propTypes = propTypes;

export default OffcanvasHeader;
