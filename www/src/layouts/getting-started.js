import PropTypes from 'prop-types';
import React from 'react';

import PageHeader from '../components/PageHeader';
import Main from '../components/Main';
import Default from './default';

const propTypes = {
  location: PropTypes.object.isRequired
};

function DocPage({ children, ...props }) {
  return (
    <Default {...props}>
      <PageHeader title="Getting started" />
      <Main location={props.location}>{children}</Main>
    </Default>
  );
}

DocPage.propTypes = propTypes;

export default DocPage;
