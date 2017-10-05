import React from 'react';
import 'bootstrap/less/bootstrap.less';

import '../css/docs.css';
import '../css/style.less';

import DefaultLayout from './default';
import GettingStartedLayout from './getting-started';
import ComponentsLayout from './components';
import LayoutLayout from './layout';
import UtilitiesLayout from './utilities';

function getLayout(pathname) {
  if (pathname.startsWith('/getting-started')) {
    return GettingStartedLayout;
  } else if (pathname.startsWith('/layout')) {
    return LayoutLayout;
  } else if (pathname.startsWith('/components')) {
    return ComponentsLayout;
  } else if (pathname.startsWith('/utilities')) {
    return UtilitiesLayout;
  }

  return DefaultLayout;
}

module.exports = function Layout({ location, ...props }) {
  let Component = getLayout(location.pathname);
  return <Component {...props} location={location} />;
};
