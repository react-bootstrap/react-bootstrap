import * as React from 'react';
import { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AccordionContext from './AccordionContext';
import AccordionItemContext from './AccordionItemContext';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { useBootstrapPrefix } from './ThemeProvider';

type EventHandler = React.EventHandler<React.SyntheticEvent>;

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

export function useAccordionButton(
  eventKey: string,
  onClick?: EventHandler,
): EventHandler {
  const { activeEventKey, onSelect } = useContext(AccordionContext);

  return (e) => {
    /*
      Compare the event key in context with the given event key.
      If they are the same, then collapse the component.
    */
    const eventKeyPassed = eventKey === activeEventKey ? null : eventKey;

    if (onSelect) onSelect(eventKeyPassed, e);
    if (onClick) onClick(e);
  };
}

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
        aria-expanded={eventKey === activeEventKey}
        className={classNames(
          className,
          bsPrefix,
          eventKey !== activeEventKey && 'collapsed',
        )}
      />
    );
  },
);

AccordionButton.propTypes = propTypes;
AccordionButton.displayName = 'AccordionButton';

export default AccordionButton;
