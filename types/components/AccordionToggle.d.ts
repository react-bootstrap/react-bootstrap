import * as React from 'react';
import Button from './Button';
import { BsPrefixComponent } from './helpers';

export interface AccordionToggleProps {
  eventKey: string;
  onClick?: (event?: React.SyntheticEvent) => void;
}

declare class AccordionToggle<
  As extends React.ReactType = 'button'
  > extends BsPrefixComponent<As, AccordionToggleProps> { }

export default AccordionToggle;
