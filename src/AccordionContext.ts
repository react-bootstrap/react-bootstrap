import * as React from 'react';

export type AccordionEventKey = string | string[] | null | undefined;

export declare type AccordionSelectCallback = (
  eventKey: AccordionEventKey,
  e: React.SyntheticEvent<unknown>,
  currentEventKey: AccordionEventKey,
  isExpanded?: boolean,
) => void;

export declare type AccordionCompleteCallback = (
  eventKey: AccordionEventKey,
  currentEventKey: AccordionEventKey,
  isExpanded?: boolean,
) => void;

export interface AccordionContextValue {
  activeEventKey?: AccordionEventKey;
  onSelect?: AccordionSelectCallback;
  alwaysOpen?: boolean;
  onComplete?: AccordionCompleteCallback;
}

export function isAccordionItemSelected(
  activeEventKey: AccordionEventKey,
  eventKey: string,
): boolean {
  return Array.isArray(activeEventKey)
    ? activeEventKey.includes(eventKey)
    : activeEventKey === eventKey;
}

const context = React.createContext<AccordionContextValue>({});
context.displayName = 'AccordionContext';

export default context;
