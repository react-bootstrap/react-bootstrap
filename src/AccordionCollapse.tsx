import classNames from 'classnames';
import * as React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { useBootstrapPrefix } from './ThemeProvider';
import Collapse, { CollapseProps } from './Collapse';
import AccordionContext from './AccordionContext';
import { BsPrefixRefForwardingComponent, BsPrefixOnlyProps } from './helpers';

export interface AccordionCollapseProps
  extends BsPrefixOnlyProps,
    CollapseProps {
  eventKey: string;
}

const propTypes = {
  /**
   * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
   */
  eventKey: PropTypes.string.isRequired,

  /** Children prop should only contain a single child, and is enforced as such */
  children: PropTypes.element.isRequired,
};

const AccordionCollapse: BsPrefixRefForwardingComponent<
  'div',
  AccordionCollapseProps
> = React.forwardRef<Transition<any>, AccordionCollapseProps>(
  ({ bsPrefix, className, children, eventKey, ...props }, ref) => {
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
