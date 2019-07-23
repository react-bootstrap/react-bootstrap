import { useContext } from 'react';
import SelectableContext from './SelectableContext';
import AccordionContext from './AccordionContext';

export default (eventKey, onClick) => {
  const contextEventKey = useContext(AccordionContext);
  const onSelect = useContext(SelectableContext);

  return e => {
    /* 
      Compare the event key in context with the given event key.
      If they are the same, then collapse the component.
    */
    let eventKeyPassed = eventKey === contextEventKey ? null : eventKey;

    onSelect(eventKeyPassed, e);
    if (onClick) onClick(e);
  };
};
