import * as React from 'react';

import AccordionCollapse from './AccordionCollapse';
import AccordionToggle from './AccordionToggle';

import { BsPrefixRefForwardingComponent } from './helpers';

export interface AccordionProps {
  activeKey?: string;
  defaultActiveKey?: string;
}

declare interface Accordion
  extends BsPrefixRefForwardingComponent<'div', AccordionProps> {
  Toggle: typeof AccordionToggle;
  Collapse: typeof AccordionCollapse;
}
declare const Accordion: Accordion;
export default Accordion;
