import Collapse, { CollapseProps } from '../types/Collapse';
import NavbarCollapse from '../types/NavbarCollapse';
import Tabs, { TabsProps } from '../types/Tabs';

// Check the emitted declarations as a consumer with exactOptionalPropertyTypes.
export const optionalProps = (
  <>
    <Collapse>
      <div />
    </Collapse>
    <Collapse className="collapse">
      <div />
    </Collapse>
    <Collapse className={undefined}>
      <div />
    </Collapse>
    <NavbarCollapse />
    <NavbarCollapse className="navbar-collapse" />
    <NavbarCollapse className={undefined} />
    <Tabs />
    <Tabs id="tabs" />
    <Tabs id={undefined} />
  </>
);

// Keep invalid values rejected while accepting explicitly undefined props.
export const invalidCollapseProps: CollapseProps = {
  children: <div />,
  // @ts-expect-error className must be a string when provided.
  className: 123,
};

export const invalidTabsProps: TabsProps = {
  // @ts-expect-error id must be a string when provided.
  id: 123,
};
