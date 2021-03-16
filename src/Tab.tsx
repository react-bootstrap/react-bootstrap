import PropTypes from 'prop-types';
import * as React from 'react';

import TabContainer from './TabContainer';
import TabContent from './TabContent';
import TabPane, { TabPaneProps } from './TabPane';

export interface TabProps extends Omit<TabPaneProps, 'title'> {
  eventKey?: string;
  title: React.ReactNode;
  disabled?: boolean;
  tabClassName?: string;
}

const propTypes = {
  title: PropTypes.node.isRequired,
};

const Tab: React.FC<TabProps> = () => {
  throw new Error(
    'ReactBootstrap: The `Tab` component is not meant to be rendered! ' +
      "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " +
      'For custom tabs components use TabPane and TabsContainer directly',
  );
};

Tab.propTypes = propTypes;

export default Object.assign(Tab, {
  Container: TabContainer,
  Content: TabContent,
  Pane: TabPane,
});
