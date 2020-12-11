import classNames from 'classnames';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from './ThemeProvider';
import Collapse, { CollapseProps } from './Collapse';
import AccordionContext from './AccordionContext';
import {
  BsPrefixRefForwardingComponent,
  BsPrefixAndClassNameOnlyProps,
} from './helpers';

export interface AccordionCollapseProps
  extends BsPrefixAndClassNameOnlyProps,
    CollapseProps {
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
  (
    {
      bsPrefix,
      className,
      children,
      eventKey,
      ...props
    }: AccordionCollapseProps,
    ref,
  ) => {
    const { activeEventKey } = useContext(AccordionContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-collapse');

    return (
      <Collapse
        ref={ref}
        in={activeEventKey === eventKey}
        {...props}
        className={classNames(className, bsPrefix)}
      >
        <div>{React.Children.only(children)}</div>
      </Collapse>
    );
  },
) as any;

AccordionCollapse.propTypes = propTypes;
AccordionCollapse.displayName = 'AccordionCollapse';

export default AccordionCollapse;
