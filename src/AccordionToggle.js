import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SelectableContext from './SelectableContext';
import AccordionContext from './AccordionContext';

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /**
   * A key that corresponds to the collapse component that gets triggered
   * when this has been clicked.
   */
  eventKey: PropTypes.string.isRequired,

  /** A callback function for when this component is clicked */
  onClick: PropTypes.func,

  /** Children prop should only contain a single child, and  is enforced as such */
  children: PropTypes.element,
};

export function useAccordionToggle(eventKey, onClick) {
  const contextEventKey = useContext(AccordionContext);
  const onSelect = useContext(SelectableContext);

  return (e) => {
    /*
      Compare the event key in context with the given event key.
      If they are the same, then collapse the component.
    */
    let eventKeyPassed = eventKey === contextEventKey ? null : eventKey;

    onSelect(eventKeyPassed, e);
    if (onClick) onClick(e);
  };
}

const AccordionToggle = React.forwardRef(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'button',
      children,
      eventKey,
      onClick,
      ...props
    },
    ref,
  ) => {
    const accordionOnClick = useAccordionToggle(eventKey, onClick);

    if (Component === 'button') {
      props.type = 'button';
    }

    return (
      <Component ref={ref} onClick={accordionOnClick} {...props}>
        {children}
      </Component>
    );
  },
);

AccordionToggle.propTypes = propTypes;

export default AccordionToggle;
