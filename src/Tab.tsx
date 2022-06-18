import PropTypes from 'prop-types';
import * as React from 'react';
import TabContainer from './TabContainer';
import TabContent from './TabContent';
import TabPane, { TabPaneProps } from './TabPane';

export interface TabProps extends Omit<TabPaneProps, 'title'> {
  title: React.ReactNode;
  disabled?: boolean;
  tabClassName?: string;
  tabAttrs?: Record<string, any>;
}

/* eslint-disable react/no-unused-prop-types */
const propTypes = {
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Content for the tab title.
   */
  title: PropTypes.node.isRequired,

  /**
   * The disabled state of the tab.
   */
  disabled: PropTypes.bool,

  /**
   * Class to pass to the underlying nav link.
   */
  tabClassName: PropTypes.string,

  /**
   * Object containing attributes to pass to underlying nav link.
   */
  tabAttrs: PropTypes.object,
};

const Tab: React.FC<TabProps> = () => {
  throw new Error(
    'ReactBootstrap: The `Tab` component is not meant to be rendered! ' +
      "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " +
      'For custom tabs components use TabPane and TabsContainer directly',
  );
  // Needed otherwise docs error out.
  return <></>;
};

Tab.propTypes = propTypes;

export default Object.assign(Tab, {
  Container: TabContainer,
  Content: TabContent,
  Pane: TabPane,
});
