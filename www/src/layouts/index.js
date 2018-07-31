import PropTypes from 'prop-types';
import React from 'react';

import NavMain from '../components/NavMain';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function DefaultLayout({ children, location }) {
  return (
    <div>
      <NavMain activePage={location.pathname} />

      {children}

      {/* <PageFooter /> */}
    </div>
  );
}

DefaultLayout.propTypes = propTypes;

export default DefaultLayout;
