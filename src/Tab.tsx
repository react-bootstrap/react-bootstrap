import PropTypes from 'prop-types';
import React from 'react';

import TabContainer from './TabContainer';
import TabContent from './TabContent';
import TabPane from './TabPane';

export interface TabProps extends React.ComponentPropsWithRef<typeof TabPane> {
  eventKey?: string;
  title: React.ReactNode;
  disabled?: boolean;
  tabClassName?: string;
}

/* eslint-disable react/require-render-return, react/no-unused-prop-types */
class Tab extends React.Component<TabProps> {
  static propTypes = {
    title: PropTypes.node.isRequired,
  };

  public static Container = TabContainer;

  public static Content = TabContent;

  public static Pane = TabPane;

  render() {
    throw new Error(
      'ReactBootstrap: The `Tab` component is not meant to be rendered! ' +
        "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " +
        'For custom tabs components use TabPane and TabsContainer directly',
    );
    return null;
  }
}

export default Tab;
