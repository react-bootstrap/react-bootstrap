import * as React from 'react';
import { useContext } from 'react';
import AccordionContext, { type AccordionEventKey } from './AccordionContext';

type EventHandler = React.EventHandler<React.SyntheticEvent>;

export default function useAccordionButton(
  eventKey: string,
  onClick?: EventHandler,
): EventHandler {
  const { activeEventKey, onSelect, alwaysOpen } = useContext(AccordionContext);

  return (e) => {
    /*
      Compare the event key in context with the given event key.
      If they are the same, then collapse the component.
    */
    let eventKeyPassed: AccordionEventKey =
      eventKey === activeEventKey ? null : eventKey;
    if (alwaysOpen) {
      if (Array.isArray(activeEventKey)) {
        if (activeEventKey.includes(eventKey)) {
          eventKeyPassed = activeEventKey.filter((k) => k !== eventKey);
        } else {
          eventKeyPassed = [...activeEventKey, eventKey];
        }
      } else {
        // activeEventKey is undefined.
        eventKeyPassed = [eventKey];
      }
    }

    onSelect?.(eventKeyPassed, e);
    onClick?.(e);
  };
}
