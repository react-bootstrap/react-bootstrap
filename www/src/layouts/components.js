import PropTypes from 'prop-types';
import React from 'react';

import PageHeader from '../components/PageHeader';
import Main from '../components/Main';
import Default from './default';

const propTypes = {
  location: PropTypes.object.isRequired
};

function ComponentsLayout({ children, ...props }) {
  return (
    <Default {...props}>
      <PageHeader title="Components" />
      <Main location={props.location}>{children}</Main>
    </Default>
  );
}

ComponentsLayout.propTypes = propTypes;

export default ComponentsLayout;
