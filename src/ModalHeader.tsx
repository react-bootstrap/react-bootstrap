import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';

import { useBootstrapPrefix } from './ThemeProvider';
import CloseButton, { CloseButtonVariant } from './CloseButton';
import ModalContext from './ModalContext';
import { BsPrefixOnlyProps } from './helpers';

export interface ModalHeaderProps
  extends BsPrefixOnlyProps,
    React.HTMLAttributes<HTMLDivElement> {
  closeLabel?: string;
  closeVariant?: CloseButtonVariant;
  closeButton?: boolean;
  onHide?: () => void;
}

const propTypes = {
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
   * a Modal component, the onHide will automatically be propagated up to the
   * parent Modal `onHide`.
   */
  onHide: PropTypes.func,
};

const defaultProps = {
  closeLabel: 'Close',
  closeButton: false,
};

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  (
    {
      bsPrefix,
      closeLabel,
      closeVariant,
      closeButton,
      onHide,
      className,
      children,
      ...props
    }: ModalHeaderProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-header');

    const context = useContext(ModalContext);

    const handleClick = useEventCallback(() => {
      context?.onHide();
      onHide?.();
    });

    return (
      <div ref={ref} {...props} className={classNames(className, bsPrefix)}>
        {children}

        {closeButton && (
          <CloseButton
            aria-label={closeLabel}
            variant={closeVariant}
            onClick={handleClick}
          />
        )}
      </div>
    );
  },
);

ModalHeader.displayName = 'ModalHeader';
ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;

export default ModalHeader;
