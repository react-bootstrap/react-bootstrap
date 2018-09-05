import PropTypes from 'prop-types';
import React from 'react';

import PageHeader from '../components/PageHeader';
import Main from '../components/Main';
import Default from './default';

const propTypes = {
  location: PropTypes.object.isRequired
};

function LayoutLayout({ children, ...props }) {
  return (
    <Default {...props}>
      <PageHeader
        title="Layout"
        subTitle="Options for structuring your pages with Bootstrap, including global styles, required scaffolding, grid system, and more."
      />
      <Main location={props.location}>{children}</Main>
    </Default>
  );
}

LayoutLayout.propTypes = propTypes;

export default LayoutLayout;
