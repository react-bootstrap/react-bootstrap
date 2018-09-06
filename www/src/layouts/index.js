import PropTypes from 'prop-types';
import React from 'react';
import 'bootstrap/less/bootstrap.less';

import GettingStarted from './getting-started';
import Layout from './layout';
import Default from './default';
import Utilities from './utilities';
import Components from './components';

import '../css/docs.css';
import '../css/style.less';

const propTypes = {
  location: PropTypes.object.isRequired
};

function DefaultLayout(props) {
  const { location } = props;
  if (location.pathname.startsWith('/getting-started')) {
    return <GettingStarted {...props} />;
  }
  if (location.pathname.startsWith('/layout')) {
    return <Layout {...props} />;
  }
  if (location.pathname.startsWith('/components')) {
    return <Components {...props} />;
  }
  if (location.pathname.startsWith('/utilities')) {
    return <Utilities {...props} />;
  }
  return <Default {...props} />;
}

DefaultLayout.propTypes = propTypes;

export default DefaultLayout;
