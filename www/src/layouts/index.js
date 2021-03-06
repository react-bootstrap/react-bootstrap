import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import * as React from 'react';

import { css } from 'astroturf';
import NavMain from '../components/NavMain';
import Heading from '../components/Heading';
import CodeBlock from '../components/CodeBlock';
import LinkedHeading from '../components/LinkedHeading';
import DocsAlert from '../components/DocsAlert';
import SEO from '../seo';

const styles = css`
  .gray > :not(:first-child) {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
  }
`;

const getMode = (className = '') => {
  const [, mode] = className.match(/language-(\w+)/) || [];
  return mode;
};

const components = {
  wrapper: (props) => <React.Fragment {...props} />,
  h1: (props) => <Heading h="1" {...props} />,
  h2: (props) => <LinkedHeading h="2" {...props} />,
  h3: (props) => <LinkedHeading h="3" {...props} />,
  h4: (props) => <LinkedHeading h="4" {...props} />,
  h5: (props) => <LinkedHeading h="5" {...props} />,
  pre: (props) =>
    React.isValidElement(props.children) ? (
      <CodeBlock
        codeText={props.children.props.children}
        mode={getMode(props.children.props.className)}
      />
    ) : (
      <pre {...props} />
    ),
};

const propTypes = {
  location: PropTypes.object.isRequired,
};

function DefaultLayout({ children, location, grayscale = true }) {
  return (
    <div className={grayscale ? styles.gray : undefined}>
      <SEO pathname={location.pathname} />
      <NavMain activePage={location.pathname} />
      <DocsAlert />
      <MDXProvider components={components}>{children}</MDXProvider>
    </div>
  );
}

DefaultLayout.propTypes = propTypes;

export default DefaultLayout;
