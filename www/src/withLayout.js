import React from 'react';

import ComponentsLayout from './layouts/components';
import LayoutLayout from './layouts/layout';
import UtilitiesLayout from './layouts/utilities';
import GettingStartedLayout from './layouts/getting-started';
import DefaultLayout from './layouts';

export default function withLayout(Component) {
  return props => {
    let Layout = DefaultLayout;
    if (props.location.pathname.startsWith('/getting-started')) {
      Layout = GettingStartedLayout;
    } else if (props.location.pathname.startsWith('/layout')) {
      Layout = LayoutLayout;
    } else if (props.location.pathname.startsWith('/components')) {
      Layout = ComponentsLayout;
    } else if (props.location.pathname.startsWith('/utilities')) {
      Layout = UtilitiesLayout;
    }

    return (
      <Layout location={props.location}>
        <Component {...props} />
      </Layout>
    );
  };
}
