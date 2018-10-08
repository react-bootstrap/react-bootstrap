import { MDXProvider } from '@mdx-js/tag';
import PropTypes from 'prop-types';
import React from 'react';

import NavMain from '../components/NavMain';
import Heading from '../components/Heading';
import CodeBlock from '../components/CodeBlock';
import LinkedHeading from '../components/LinkedHeading';

const getMode = (className = '') => {
  const [, mode] = className.match(/language-(\w+)/) || [];
  return mode;
};

const components = {
  wrapper: props => <React.Fragment {...props} />,
  h1: props => <Heading h="1" {...props} />,
  h2: props => <LinkedHeading h="2" {...props} />,
  h3: props => <LinkedHeading h="3" {...props} />,
  h4: props => <LinkedHeading h="4" {...props} />,
  h5: props => <LinkedHeading h="5" {...props} />,
  pre: props =>
    React.isValidElement(props.children) ? (
      <CodeBlock
        codeText={props.children.props.children}
        mode={getMode(props.children.props.props.className)} // omg
      />
    ) : (
      <pre {...props} />
    ),
};

const propTypes = {
  location: PropTypes.object.isRequired,
};

function DefaultLayout({ children, location }) {
  return (
    <div>
      <NavMain activePage={location.pathname} />
      <MDXProvider components={components}>{children}</MDXProvider>
    </div>
  );
}

DefaultLayout.propTypes = propTypes;

export default DefaultLayout;
