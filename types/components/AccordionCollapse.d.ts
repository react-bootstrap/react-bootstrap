import * as React from 'react';

import { CollapseProps } from './Collapse';

import { BsPrefixRefForwardingComponent } from './helpers';

export interface AccordionCollapseProps
  extends CollapseProps,
    React.HTMLAttributes<HTMLDivElement> {
  eventKey: string;
}

declare interface AccordionCollapse
  extends BsPrefixRefForwardingComponent<'div', AccordionCollapseProps> {}
declare const AccordionCollapse: AccordionCollapse;

export default AccordionCollapse;
