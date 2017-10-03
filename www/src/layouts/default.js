import React from 'react';
import NavMain from '../components/NavMain';
import PageFooter from '../components/PageFooter';

module.exports = function Template({ children, location }) {
  return (
    <div>
      <NavMain activePage={location.pathname} />

      {typeof children === 'function' ? children() : children}

      <PageFooter />
    </div>
  );
};
