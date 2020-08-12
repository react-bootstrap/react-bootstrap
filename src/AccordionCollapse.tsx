import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Collapse, { CollapseProps } from './Collapse';
import AccordionContext from './AccordionContext';
import SelectableContext from './SelectableContext';
import { BsPrefixRefForwardingComponent } from './helpers';

export interface AccordionCollapseProps
  extends React.PropsWithChildren<CollapseProps> {
  eventKey: string;
}

type AccordionCollapse = BsPrefixRefForwardingComponent<
  'div',
  AccordionCollapseProps
>;

const propTypes = {
  /**
   * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
   */
  eventKey: PropTypes.string.isRequired,

  /** Children prop should only contain a single child, and is enforced as such */
  children: PropTypes.element.isRequired,
};

const AccordionCollapse: AccordionCollapse = React.forwardRef<typeof Collapse>(
  ({ children, eventKey, ...props }: AccordionCollapseProps, ref) => {
    const contextEventKey = useContext(AccordionContext);

    // Empty SelectableContext is to prevent elements in the collapse
    // from collapsing the accordion when clicked.
    return (
      <SelectableContext.Provider value={null}>
        <Collapse ref={ref} in={contextEventKey === eventKey} {...props}>
          <div>{React.Children.only(children)}</div>
        </Collapse>
      </SelectableContext.Provider>
    );
  },
) as any;

AccordionCollapse.propTypes = propTypes;
AccordionCollapse.displayName = 'AccordionCollapse';

export default AccordionCollapse;
