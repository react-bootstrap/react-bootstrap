import * as React from 'react';

import AccordionCollapse from './AccordionCollapse';
import AccordionToggle from './AccordionToggle';

import { BsPrefixComponent } from './helpers';

export interface AccordionProps {
  activeKey?: string;
  defaultActiveKey?: string;
}

declare class Accordion extends BsPrefixComponent<'div', AccordionProps> {
  static Toggle: typeof AccordionToggle;
  static Collapse: typeof AccordionCollapse;
}

export default Accordion;
