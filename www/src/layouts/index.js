import { MDXProvider } from '@mdx-js/tag';
import PropTypes from 'prop-types';
import React from 'react';

import NavMain from '../components/NavMain';
import Anchor from '../components/Anchor';

const components = {
  h1: props => <Anchor as="h1" {...props} />,
  h2: props => <Anchor as="h2" {...props} />,
  h3: props => <Anchor as="h3" {...props} />,
  h4: props => <Anchor as="h4" {...props} />,
  h5: props => <Anchor as="h5" {...props} />,
};
const propTypes = {
  location: PropTypes.object.isRequired,
};

function DefaultLayout({ children, location }) {
  return (
    <div>
      <NavMain activePage={location.pathname} />
      <MDXProvider components={components}>{children}</MDXProvider>

      {/* <PageFooter /> */}
    </div>
  );
}

DefaultLayout.propTypes = propTypes;

export default DefaultLayout;
