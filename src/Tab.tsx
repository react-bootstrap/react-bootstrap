import * as React from 'react';
import TabContainer from './TabContainer';
import TabContent from './TabContent';
import TabPane, { type TabPaneProps } from './TabPane';

export interface TabProps extends Omit<TabPaneProps, 'title'> {
  /**
   * Content for the tab title.
   */
  title: React.ReactNode;

  /**
   * The disabled state of the tab.
   */
  disabled?: boolean | undefined;

  /**
   * Class to pass to the underlying nav link.
   */
  tabClassName?: string | undefined;

  /**
   * Object containing attributes to pass to underlying nav link.
   */
  tabAttrs?: Record<string, any> | undefined;
}

const Tab: React.FC<TabProps> = () => {
  throw new Error(
    'ReactBootstrap: The `Tab` component is not meant to be rendered! ' +
      "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " +
      'For custom tabs components use TabPane and TabsContainer directly',
  );
};

export default Object.assign(Tab, {
  Container: TabContainer,
  Content: TabContent,
  Pane: TabPane,
});
