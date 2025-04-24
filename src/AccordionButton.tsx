import * as React from 'react';
import { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AccordionContext, { isAccordionItemSelected } from './AccordionContext';
import AccordionItemContext from './AccordionItemContext';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { useBootstrapPrefix } from './ThemeProvider';
import useAccordionButton from './useAccordionButton';

export interface AccordionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BsPrefixProps {}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'accordion-button' */
  bsPrefix: PropTypes.string,

  /** A callback function for when this component is clicked */
  onClick: PropTypes.func,
};

const AccordionButton: BsPrefixRefForwardingComponent<
  'div',
  AccordionButtonProps
> = React.forwardRef<HTMLButtonElement, AccordionButtonProps>(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'button',
      bsPrefix,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-button');
    const { eventKey } = useContext(AccordionItemContext);
    const accordionOnClick = useAccordionButton(eventKey, onClick);
    const { activeEventKey } = useContext(AccordionContext);

    if (Component === 'button') {
      props.type = 'button';
    }

    return (
      <Component
        ref={ref}
        onClick={accordionOnClick}
        {...props}
        aria-expanded={
          Array.isArray(activeEventKey)
            ? activeEventKey.includes(eventKey)
            : eventKey === activeEventKey
        }
        className={classNames(
          className,
          bsPrefix,
          !isAccordionItemSelected(activeEventKey, eventKey) && 'collapsed',
        )}
      />
    );
  },
) as typeof AccordionButton;

AccordionButton.propTypes = propTypes;
AccordionButton.displayName = 'AccordionButton';

export default AccordionButton;
