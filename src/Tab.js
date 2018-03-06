import TabContainer from './TabContainer';
import TabContent from './TabContent';
import TabPane from './TabPane';

function Tab() {
  throw new Error(
    'ReactBootstrap: The `Tab` component is not meant to be rendered! ' +
      "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " +
      'For custom tabs components use TabPane and TabsContainer directly'
  );
}

Tab.Container = TabContainer;
Tab.Content = TabContent;
Tab.Pane = TabPane;

export default Tab;
