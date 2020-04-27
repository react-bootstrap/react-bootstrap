import PropTypes from 'prop-types';
import React from 'react';

import TabContainer from './TabContainer';
import TabContent from './TabContent';
import TabPane from './TabPane';
import { BsPrefixComponent } from './helpers';

export interface TabProps extends React.ComponentPropsWithRef<typeof TabPane> {
  eventKey?: unknown;
  title: React.ReactNode;
  disabled?: boolean;
  tabClassName?: string;
}

declare class Tab<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, TabProps> {
  static Container: typeof TabContainer;
  static Content: typeof TabContent;
  static Pane: typeof TabPane;
}

/* eslint-disable react/require-render-return, react/no-unused-prop-types */
class Tab extends React.Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
  };

  render() {
    throw new Error(
      'ReactBootstrap: The `Tab` component is not meant to be rendered! ' +
        "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " +
        'For custom tabs components use TabPane and TabsContainer directly',
    );
  }
}

Tab.Container = TabContainer;
Tab.Content = TabContent;
Tab.Pane = TabPane;

export default Tab;
