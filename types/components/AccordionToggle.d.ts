import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface AccordionToggleProps {
  eventKey: string;
  onClick?: (event?: React.SyntheticEvent) => void;
}

export function useAccordionToggle(
  eventKey: string,
  onClick: (event?: React.SyntheticEvent) => void,
): (event?: React.SyntheticEvent) => void;

declare class AccordionToggle<
  As extends React.ElementType = 'button'
> extends BsPrefixComponent<As, AccordionToggleProps> {}

export default AccordionToggle;
