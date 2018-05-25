import PropTypes from 'prop-types';
import React from 'react';
import 'bootstrap/scss/bootstrap.scss';

import NavMain from '../components/NavMain';
import PageFooter from '../components/PageFooter';

import '../css/docs.css';
import '../css/style.less';
import '../css/examples.less';

const propTypes = {
  location: PropTypes.object.isRequired
};

function DefaultLayout({ children, location }) {
  return (
    <div>
      <NavMain activePage={location.pathname} />

      {children}

      <PageFooter />
    </div>
  );
}

DefaultLayout.propTypes = propTypes;

export default DefaultLayout;
