import React from 'react';
import Tabs from './Tabs';
import TabPane from './TabPane';
import ValidComponentChildren from './utils/ValidComponentChildren';
import deprecationWarning from './utils/deprecationWarning';

const TabbedArea = React.createClass({
  componentDidMount() {
    deprecationWarning('TabbedArea', 'Tabs', 'https://github.com/react-bootstrap/react-bootstrap/pull/1091');
  },
  render() {
    let {children, ...props} = this.props;
    let tabTitles = [];

    tabTitles = ValidComponentChildren.map(function(child) {
      let {tab, ...others} = child.props;
      tabTitles.push(<TabPane title={tab} {...others}/>);
    });

    return (
      <Tabs {...props} >{tabTitles}</Tabs>
    );
  }
});

export default TabbedArea;
